const express = require('express');
const joi = require('../utils/joi');
const userController = require('../controller/user.controller');
const router = express.Router();

router.post('/signup',userController.signUp);

router.post('/verify',joi.contactValidate,userController.verify);

module.exports = router;