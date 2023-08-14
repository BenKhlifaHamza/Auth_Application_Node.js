//========================================================//
//Copyright © 2023 Hamza Ben Khlifa - All rights reserved.//
//========================================================//
const router = require('express').Router();
const verifyCodeForget = require('../controller/controller-verify-code-forget');

router.post('/',verifyCodeForget.verifyCodeForgetController);

module.exports = router ;