const express = require('express');
const router = express.Router();
const AuthController = require('../controller/Auth');

//Get
router.get('/login', AuthController.login);
router.get('/logout', AuthController.logout);

//Post
router.post('/login', AuthController.loginUser);

module.exports = router;
