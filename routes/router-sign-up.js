//========================================================//
//Copyright © 2023 Hamza Ben Khlifa - All rights reserved.//
//========================================================//
const router = require('express').Router();
const signUp = require('../controller/controller-sign-up');

router.post('/',signUp.signUpController);

module.exports = router ;