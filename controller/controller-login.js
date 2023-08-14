//========================================================//
//Copyright © 2023 Hamza Ben Khlifa - All rights reserved.//
//========================================================//
const userModel = require('../models/user-model').UserModel;
const myDatabase = require('../database/connection');
const bcrypt = require('bcrypt');

exports.loginController = async (req,res,next)=>{
    const body = req.body;
    let message;
    let status;
    let data;

    try {
        await myDatabase.myConnection();
        const user = await userModel.findOne({$and:[{userEmail:body.userEmail}/*,{userAprv:"1"}*/]});
        if(user){
            const verifPassword = await bcrypt.compare(body.userPassword, user.userPassword);
    if (verifPassword) {
        status = "success";
        message = "login successful";
        data = user ;
    } else {
        status = "failure";
        message = "email or password incorrect";
        data = {};
    }
        }else{
            status = "failure";
            message = "email or password incorrect";
            data = {};
        }
    } catch (error) {
        status = "failure";
        message = "unknown error";
        data = {};
        console.error("Error on loginController : " + error.message);
    }finally {
        await myDatabase.myDisconnect();
        res.json({
            "status": status,
            "message": message,
            "data": data
        });
    }
}