//========================================================//
//Copyright © 2023 Hamza Ben Khlifa - All rights reserved.//
//========================================================//
const router = require('express').Router();
const resendVerifyCode = require('../controller/controller-resend-verify-code');

router.patch('/',resendVerifyCode.resendVerifyCodeController);

module.exports = router ;