//========================================================//
//Copyright © 2023 Hamza Ben Khlifa - All rights reserved.//
//========================================================//
const myDatabase= require('../database/connection');
const userModel = require('../models/user-model').UserModel;
const sendEmail = require('../functions/send_mail');
exports.forgetPasswordControler = async (req,res,next) => {
    const body = req.body;
    let status ;
    let message ;
    let data ;
    try {
        await myDatabase.myConnection();
        const user = await userModel.findOne({userEmail : body.userEmail});
        if(user){
            const newVerifCode = Math.floor(Math.random() * (99999 - 10000 + 1)) + 10000;
            const verifUpdate = await userModel.updateOne({userEmail : body.userEmail},{userVerifCode : newVerifCode});
            if (verifUpdate.modifiedCount > 0) {
                sendEmail.sendMail("benkhlifahamza@gmail.com",body.userEmail,newVerifCode);
                status = "success";
                message = "verifCode updated";
                data = {}
            } else {
                status = "failure";
                message = "verifCode not updated";
                data = {}
            }
        }else{
            status = "failure";
            message = "user not found";
            data = {}
        }
    } catch (error) {
        status = "failure";
        message = "unknown error";
        data = {};
        console.error("Error on forgetPasswordControler : " + error.message);
    }finally{
        await myDatabase.myDisconnect();
        res.json({
            "status": status,
            "message": message,
            "data": data
        });
    }
}


