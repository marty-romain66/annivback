const express = require('express');
const router = express.Router();
const postController = require('../controllers/post.controller');
const middlewareAuth = require('../middleware/middleware.auth');
const multer = require('../middleware/multer-config');

router.post('/', multer, postController.createPost);
router.get('/',  postController.getAllPost);
router.get('/:id', postController.getOnePost);  
router.put('/:id',  postController.modifyPost);
router.delete('/:id', postController.deletePost);
router.get('/post/:id', postController.getPostByEvenement);





module.exports = router;