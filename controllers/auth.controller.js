const User = require("../models").User;
const Evenement = require("../models").Evenement;
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


exports.signup = (req, res, next) => {
  bcrypt
    .hash(req.body.password, 10)
    .then((hash) => {
      const user = User.create({
        Nom: req.body.Nom,
        prenom: req.body.prenom,
        email: req.body.email,
        adress: req.body.adress,
        numero: req.body.numero,
        password: hash,
      });
    })
    .then((result) => {
      res.status(201).json({
        message: "User created!",
        result: result,
      });
    })
    .catch((err) => {
      res.status(500).json({
        error: err,
      });
    });
};
exports.login = (req, res) => {
  console.log(req.body);
    User.findOne({
      where: { email: req.body.email },
      include : [
        {
          model: Evenement
        }
      ]
    })
      .then((user) => {
        if (!user) {
          return res.status(401).json({ error: "Utilisateur non trouvé !" });
        }
        bcrypt
          .compare(req.body.password, user.password)
          .then((valid) => {
            if (!valid) {
              return res.status(401).json({ error: "Mot de passe incorrect !" });
            }
            res.status(200).json({
              user,
              token: jwt.sign(
                {
                  userId: user.id,
                  isAdmin: user.isAdmin,
                },
                "RANDOM_TOKEN_SECRET",
                {
                  expiresIn: "24h",
                }
              ),
            });
      
             
          }
            
          )
          .catch((error) => res.status(500).json({ error }));
      })
      .catch((error) => res.status(500).json({ error }));
  };
  

 exports.test = (req, res, next) => {
  User.findAll()
  .then((users) => {
  res.status(200).json(users);
  })
  .catch((err) => {
  res.status(500).json({
      error: err,
  });
  }
);
};




exports.modifyUser = (req, res, next) => {
    const user = User.update(
        {
        Nom: req.body.Nom,
        prenom: req.body.prenom,
        email: req.body.email,
        adress: req.body.adress,
        numero: req.body.numero,
        },
        { where: { id: req.params.id } }
    )
        .then((result) => {
        res.status(200).json({
            message: "User updated!",
            result: result,
        });
        })
        .catch((err) => {
        res.status(500).json({
            error: err,
        });
        }
    );
};

exports.deleteUser = (req, res, next) => {
    User.destroy({ where: { id: req.params.id } })
        .then((result) => {
        res.status(200).json({
            message: "User deleted!",
            result: result,
        });
        })
        .catch((err) => {
        res.status(500).json({
            error: err,
        });
        }
    );
};

exports.getAllUsers = (req, res, next) => {
    User.findAll()
        .then((users) => {
        res.status(200).json(users);
        })
        .catch((err) => {
        res.status(500).json({
            error: err,
        });
        }
    );
};

exports.getOneUser = (req, res, next) => {
    User.findOne( {
       where: { id: req.params.id },
        include: [
            {

                model: Evenement
            }
        ]

    },
   
    )
        .then((user) => {
        res.status(200).json(user);
        })
        .catch((err) => {
        res.status(500).json({
            error: err,
        });
        }
    );
}


