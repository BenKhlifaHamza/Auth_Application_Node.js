//========================================================//
//Copyright © 2023 Hamza Ben Khlifa - All rights reserved.//
//========================================================//
const nodemailer = require('nodemailer');
require('dotenv').config();
exports.sendMail = async (fromEmail , toEmail ,verifCode) => {
    const transporter = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: 587,
        secure: false,
        auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
        },
    });
    
    const msg = {
        from: fromEmail,
        to: toEmail,
        subject: 'Auth Application ✔',
        text: `Your Verify Code : ${verifCode}`,
    };
    
    try {
        const info = await transporter.sendMail(msg);
        console.log('Email sent To :', toEmail, " , Message id : ", info.messageId);    
    } catch (error) {
        console.error('Error sending email :', error);
    }
}