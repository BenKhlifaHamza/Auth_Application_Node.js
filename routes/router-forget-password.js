//========================================================//
//Copyright © 2023 Hamza Ben Khlifa - All rights reserved.//
//========================================================//
const router = require('express').Router();
const forgetPassword = require('../controller/controller-forget-password');

router.patch('/',forgetPassword.forgetPasswordControler);

module.exports = router ;


