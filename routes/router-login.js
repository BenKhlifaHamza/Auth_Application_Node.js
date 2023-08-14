//========================================================//
//Copyright © 2023 Hamza Ben Khlifa - All rights reserved.//
//========================================================//
const router = require('express').Router();
const login = require('../controller/controller-login');

router.post('/',login.loginController);

module.exports = router ;