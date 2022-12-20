const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const userController = require('../controllers/auth.controller');
const db = require('../config/db');
const User = require('../models').User;
const middlewareAuth = require('../middleware/middleware.auth');

router.post('/signup', userController.signup);
router.post ('/login',  userController.login);
router.put('/:id', middlewareAuth, userController.modifyUser);
router.delete('/:id', middlewareAuth, userController.deleteUser);
router.get('/:id', userController.getOneUser);
router.get('/', middlewareAuth, userController.getAllUsers);

   


module.exports = router;
