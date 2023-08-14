//========================================================//
//Copyright © 2023 Hamza Ben Khlifa - All rights reserved.//
//========================================================//
const router = require('express').Router();
const verifyCode = require('../controller/controller-verify-code');

router.patch('/',verifyCode.verifyCodeController);

module.exports = router ;