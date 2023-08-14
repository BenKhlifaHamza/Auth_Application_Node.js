//========================================================//
//Copyright © 2023 Hamza Ben Khlifa - All rights reserved.//
//========================================================//
const signUpRouter           = require('./routes/router-sign-up');
const verifyCodeRouter       = require('./routes/router-verify-code');
const resendVerifyCodeRouter = require('./routes/router-resend-verify-code');
const loginRouter            = require('./routes/router-login');
const resetPasswordRouter    = require('./routes/router-reset-password');
const forgetPasswordRouter   = require('./routes/router-forget-password');
const verifyCodeForgetRouter = require('./routes/router-verify-code-forget');
const express                = require('express');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((req,res,next)=>{
    res.setHeader("Access-Control-Allow-Origin","*");
    res.setHeader("Access-Control-Allow-Headers","*");
    res.setHeader("Access-Control-Allow-Methods","*");
    next();    
});

app.use('/signup',signUpRouter);
app.use('/verifycode',verifyCodeRouter);
app.use('/resendverifycode',resendVerifyCodeRouter);
app.use('/login',loginRouter);
app.use('/resetpassword',resetPasswordRouter);
app.use('/forgetpassword',forgetPasswordRouter);
app.use('/verifycodeforget',verifyCodeForgetRouter);

app.listen(process.env.PORT,()=>{
    console.log(`My server listening on port ${process.env.PORT}...`);
});