const express = require('express');
const router = express.Router();
const evenementController = require('../controllers/evenement.controller');
const middlewareAuth = require('../middleware/middleware.auth');
const multer = require('../middleware/multer-config');
router.post('/',  multer, evenementController.createEvenement);
router.get('/', middlewareAuth, evenementController.getAllEvenement);
router.get('/:id', evenementController.getOneEvenement);
router.put('/:id', middlewareAuth, evenementController.modifyEvenement);
router.delete('/:id', middlewareAuth, evenementController.deleteEvenement);
router.post('/:id/joinevenement', evenementController.joinEvenement);





module.exports = router;
