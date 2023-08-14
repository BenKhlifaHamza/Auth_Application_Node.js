//========================================================//
//Copyright © 2023 Hamza Ben Khlifa - All rights reserved.//
//========================================================//
const mongoose = require("mongoose");
const Joi = require('joi');

// Define the user schema validation
const schemaValidation = Joi.object({

    userName: Joi.string().regex(/^[a-zA-Z0-9\s]{3,30}$/).required(),

    userPassword: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),

    userAge: Joi.number().integer().min(18).max(75),

    userEmail: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),

    userPhone: Joi.number().required(),    
    });

// Define the user schema
const userSchema = mongoose.Schema({
    userName      : String,
    userAge       : Number,
    userAprv      : String,
    userEmail     : String,
    userPassword  : String,
    userPhone     : String,
    userVerifCode : String,
    userCreate    : String,
});

// Create the user model
const UserModel = mongoose.model("user", userSchema);

// Export the user model
exports.UserModel = UserModel;

// Export the user validator
exports.schemaValidation = schemaValidation;

