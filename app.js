const express = require('express');
const helmet = require('helmet');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require("cors");
const multer = require("multer");
const upload = multer({ dest: "uploads/" });
const db = require('./config/db')

// const userRoutes = require('./routes/user');
// const postRoutes = require('./routes/post');
const userRoutes = require('./routes/users');
const evenementRoutes = require('./routes/evenements');
const postRoutes = require('./routes/posts');
const testToken = require('./routes/testToken');
const evenUser = require('./routes/evenUser');
const app = express();


db.authenticate().then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  });

  app.use(cors(
    {
        origin: '*',
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
        allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept', 'Origin', 'Access-Control-Allow-Origin'],
        credentials: true,
      
      
    }
));

app.use(helmet({
  crossOriginEmbedderPolicy: false,
  // ...
}));

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*", "Authorization", "admin");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept", "Authorization, multipart/form-data"  );
  next();
});

app.use(bodyParser.json());


app.use('/images', express.static(path.join(__dirname, 'images')));
// app.use('/images', express.static(path.join(__dirname, 'images')));

app.use('/api/auth', userRoutes)
app.use('/api/evenements', evenementRoutes)
app.use('/api/posts', postRoutes)
app.use('/api/evenuser', evenUser)
app.use('/api/testToken', userRoutes)


module.exports = app;
