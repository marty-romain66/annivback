const express = require('express');
const router = express.Router();
const evenementController = require('../controllers/evenement.controller');

// getUserInEvenement

router.get('/:id', evenementController.getUserOneEvenement);





module.exports = router;