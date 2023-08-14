//========================================================//
//Copyright © 2023 Hamza Ben Khlifa - All rights reserved.//
//========================================================//
const myDatabase = require('../database/connection');
const userModel = require('../models/user-model').UserModel;

exports.verifyCodeForgetController = async (req,res,next) => {
    const body = req.body;
    let status;
    let message;
    let data;
    try {
        await myDatabase.myConnection();
        const user = await userModel.findOne({ userEmail : body.userEmail });
        if(user.userVerifCode == body.userVerifCode){
            status = "success";
            message = "verifCode is correct";
            data = {};
        }else{
            status = "failure";
            message = "invalid verifCode";
            data = {};
        }
    } catch (error) {
        status = "failure";
        message = "unknown error";
        data = {};
        console.error("Error on verifyCodeForgetController : " + error.message);
    }finally{
        await myDatabase.myDisconnect();
        res.json({
            "status": status,
            "message": message,
            "data": data
        });
    }
}