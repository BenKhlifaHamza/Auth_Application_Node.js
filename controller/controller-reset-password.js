//========================================================//
//Copyright © 2023 Hamza Ben Khlifa - All rights reserved.//
//========================================================//
const userModel = require('../models/user-model').UserModel;
const myDatabase = require('../database/connection');
const bcrypt = require('bcrypt');

exports.resetPasswordController = async (req,res,next)=>{
    const body = req.body;
    let message;
    let status;
    let data;
    try {
        await myDatabase.myConnection();
        const passwordCrypte = await bcrypt.hash(body.userPassword, 9);
        const user = await userModel.updateOne({ userEmail: body.userEmail } , {
            userPassword : passwordCrypte
        });
        if (user.modifiedCount > 0) {

            status = "success";
            message = "password changed successfully";
            data = {};
        } else {
            status = "failure";
            message = "password not changed";
            data = {};
        }
    } catch (error) {
        status = "failure";
        message = "unknown error";
        data = {};
        console.error("Error on resetPasswordController : " + error.message);
    }finally{
        await myDatabase.myDisconnect();
        res.json({
            "status": status,
            "message": message,
            "data": data
        });
    }
}