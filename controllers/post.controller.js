const Post = require('../models').Post;
const User = require('../models').User;

exports.createPost = (req, res, next) => {
    console.log(req.file + "               okkkkkkkkkkkkk")
    const post = new Post({
        message : req.body.message,
        photo : req.file
        ? `${req.protocol}://${req.get("host")}/images/${req.file.filename}`
        : null,
        userId: req.body.userId,
        evenementId : req.body.evenementId
    });
    post.save()
        .then(() => res.status(201).json({ message: 'Post created!' }))
        .catch(error => res.status(400).json({ error }));
}

exports.getAllPost = (req, res, next) => {
    Post.findAll()
        .then(posts => res.status(200).json(posts))
        .catch(error => res.status(400).json({ error }));
}

exports.getOnePost = (req, res, next) => {
    console.log(req.params.id);
    Post.findOne({ where: { id: req.params.id } })
        .then(post => res.status(200).json(post))
        .catch(error => res.status(404).json({ error }));
}

exports.modifyPost = (req, res, next) => {
    Post.update(
        {
            message: req.body.message,
            photo: req.body.photo,
        },
        { where: { id: req.params.id } }
    )
        .then((result) => {
        res.status(200).json({
            message: "Post updated!",
            result: result,
        });
        })
        .catch((err) => {
        res.status(500).json({
            error: err,
        });
        }
    );
}

exports.deletePost = (req, res, next) => {
    Post.destroy({ where: { id: req.params.id } })
        .then((result) => {
        res.status(200).json({
            message: "Post deleted!",
            result: result,
        });
        })
        .catch((err) => {
        res.status(500).json({
            error: err,
        });
        }
    );
}


exports.getPostByEvenement = (req, res, next) => {
    console.log("okooooooooooooooooooooooooo" + req.params.id);
    Post.findAll({ where: { evenementId: req.params.id } })
        .then(posts => res.status(200).json(posts))
        .catch(error => res.status(404).json({ error }));
}

