const Evenement = require('../models').Evenement;
const { sequelize } = require('../models');
const User = require('../models').User 
const UserInEvenement = require('../models').UserInEvenement;
const Post = require('../models').Post;

exports.createEvenement = (req, res, next) => {
 
    const evenement = new Evenement({
        evenementName : req.body.evenementName,
        evenementImageUrl : req.file ? `${req.protocol}://${req.get('host')}/images/${req.file.filename}` : null,

    });
    evenement.save()
        .then(() => res.status(201).json({ message: 'Evenement created!' }))
        .catch(error => res.status(400).json({ error }));
}



exports.getAllEvenement = (req, res, next) => {
    Evenement.findAll()
        .then(evenements => res.status(200).json(evenements))
        .catch(error => res.status(400).json({ error }));
};

exports.getOneEvenement = (req, res, next) => {

    Evenement.findOne({ where: { id: req.params.id },
        include: [
            {
                model: UserInEvenement
            },
            {
                model: Post

            }
        ]
     })
        .then(evenement => res.status(200).json(evenement))
        .catch(error => res.status(404).json({ error }));
}

exports.modifyEvenement = (req, res, next) => {
    Evenement.update(
        {
            evenementName: req.body.evenementName,
        },
        { where: { id: req.params.id } }
    )
        .then((result) => {
        res.status(200).json({
            message: "Evenement updated!",
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

exports.deleteEvenement = (req, res, next) => {
    Evenement.destroy({ where: { id: req.params.id } })
        .then((result) => {
        res.status(200).json({
            message: "Evenement deleted!",
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

exports.joinEvenement = (req, res, next) => {
    const userInEvenement = new UserInEvenement({
        userId: req.body.userId,
        evenementId: req.params.id
    });
    userInEvenement.save()
        .then(() => res.status(201).json({ message: 'User added to evenement!' }))
        .catch(error => res.status(400).json({ error }));
}



// get user in evenement by id
exports.getUserOneEvenement = (req, res, next) => {
    // select * from userinevenements where userId = req.params.id
// sequelize.query(`SELECT * FROM userinevenements WHERE userId =  ${req.params.id} `)
// .then((result) => {
//     res.status(200).json({
//         message: "User in evenement found!",
//         result: result,
//     });
//     }
// )
// .catch((err) => {
//     res.status(500).json({
//         error: err,
//     });
//     }
// );
UserInEvenement.findAll({ 
    where: { userId: req.params.id },
    include: [
        {
            model : Evenement,
            include : {
                model : Post,
                include : {
                    model : User
                }

                
            
                
            }
       
        },
       

    ]


 

})
.then((result) => {
    res.status(200).json({
        message: "User in evenement found!",
        result: result,
    });
    }
)
.catch((err) => {
    res.status(500).json({
        error: err,
    });
    }
);


}

