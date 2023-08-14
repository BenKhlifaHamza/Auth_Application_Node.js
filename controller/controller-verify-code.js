//========================================================//
//Copyright © 2023 Hamza Ben Khlifa - All rights reserved.//
//========================================================//
const userModel = require('../models/user-model').UserModel;
const myDatabase = require('../database/connection');

exports.verifyCodeController = async (req , res , next)=>{
    const body = req.body;
    let message;
    let status;
    let data;
    try {
        await myDatabase.myConnection();
        const user = await userModel.findOne({$and:[{userEmail:body.userEmail},{userVerifCode:body.userVerifCode}]});
        if(user){
            const updateUserAprv = await userModel.updateOne({ userEmail: body.userEmail } , {
                userAprv : "1"
            });
            if (updateUserAprv.modifiedCount > 0) {
                status = "success";
                message = "user approved";
                data = {};
            } else {
                status = "failure";
                message = "update userAprv failed";
                data = {};
            }
        } else {
            status = "failure";
            message = "verify code or mail not valide";
            data = {};
        }
    } catch (error) {
            status = "failure";
            message = "unknown error";
            data = {};
            console.error("Error on verifyCodeController : " + error.message);
    }finally{
        await myDatabase.myDisconnect();
        res.json({
            "status": status,
            "message": message,
            "data": data
        });
    }
}