//========================================================//
//Copyright © 2023 Hamza Ben Khlifa - All rights reserved.//
//========================================================//
const router = require('express').Router();
const resetPassword = require('../controller/controller-reset-password');

router.patch('/',resetPassword.resetPasswordController);

module.exports = router;
