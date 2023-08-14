//========================================================//
//Copyright © 2023 Hamza Ben Khlifa - All rights reserved.//
//========================================================//
const schemaValidation = require('../models/user-model').schemaValidation;
const getDateNow = require('../functions/get-date-now').getDateNow;
const userModel = require('../models/user-model').UserModel;
const myDatabase = require('../database/connection');
const bcrypt = require('bcrypt');
const sendEmail = require('../functions/send_mail');

exports.signUpController = async (req, res, next) => {

    const body = req.body;
    let message;
    let status;
    let data;
    let validation;

    try {
        validation =  schemaValidation.validate(
            {
                userName     : body.userName,
                userAge      : body.userAge,
                userEmail    : body.userEmail,
                userPassword : body.userPassword,
                userPhone    : body.userPhone,
            });
        if (validation.error) {
            status = "failure";
            message = validation.error.details[0].message;
            data = {};
        } else {
            await myDatabase.myConnection();
            const verifUser = await userModel.findOne({$or:[{userEmail:body.userEmail},{userPhone:body.userPhone}]});
            if (verifUser) {
                status = "failure";
                message = "mail or phone exists";
                data = {};
            } else {
                const verifCode = Math.floor(Math.random() * (99999 - 10000 + 1)) + 10000;
                const passwordCrypte = await bcrypt.hash(body.userPassword, 9);
                const newUser = new userModel({
                    userName      : body.userName,
                    userAge       : body.userAge,
                    userEmail     : body.userEmail,
                    userPassword  : passwordCrypte,
                    userPhone     : body.userPhone,
                    userVerifCode : verifCode,
                    userAprv      : "0",
                    userCreate    : getDateNow()
                });
                const user = await newUser.save();
                sendEmail.sendMail("benkhlifahamza@gmail.com",body.userEmail,verifCode);
                status = "success";
                message = "user registered";
                data = user;
            }
        }
    } catch (error) {
        status = "failure";
        message = "unknown error";
        data = {};
        console.error("Error on signUpController : " + error.message);
    } finally {
        await myDatabase.myDisconnect();
        res.json({
            "status": status,
            "message": message,
            "data": data
        });
    }
}