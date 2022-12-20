const express = require('express');
const router = express.Router();

const userController = require('../controllers/auth.controller');

const middlewareAuth = require('../middleware/middleware.auth');

router.get('/', middlewareAuth);

module.exports = router;