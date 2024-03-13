const express = require('express');
const router = express.Router();
const AuthController = require('../controller/Auth');
const { checkLogged } = require('../middleware/helpers/auth');

//Get
router.get('/login', checkLogged, AuthController.login);
router.get('/logout', AuthController.logout);

//Post
router.post('/login', AuthController.loginUser);

module.exports = router;
