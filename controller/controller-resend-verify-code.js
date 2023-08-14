//========================================================//
//Copyright © 2023 Hamza Ben Khlifa - All rights reserved.//
//========================================================//
const userModel = require('../models/user-model').UserModel;
const myDatabase = require('../database/connection');
const sendEmail = require('../functions/send_mail');
exports.resendVerifyCodeController = async (req,res,next)=>{
    const body = req.body;
    let message;
    let status;
    let data;
    try {
        await myDatabase.myConnection();
        const verifCode = Math.floor(Math.random() * (99999 - 10000 + 1)) + 10000;
        const updateVerifCode = await userModel.updateOne({userEmail : body.userEmail},{userVerifCode : verifCode});
        if(updateVerifCode.modifiedCount > 0){
            sendEmail.sendMail("benkhlifahamza@gmail.com",body.userEmail,verifCode);
            status = "success";
            message = "verifCode updated successfully";
            data = {};
        }else{
            status = "failure";
            message = "verifCode not updated";
            data = {};
        }
    } catch (error) {
        status = "failure";
            message = "unknown error";
            data = {};
            console.error("Error on resendVerifyCodeController : " + error.message);
    }finally{
        await myDatabase.myDisconnect();
        res.json({
            "status": status,
            "message": message,
            "data": data
        });
    }
}