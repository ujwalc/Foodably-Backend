const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const recipeRoutes = require('./routes/recipes');

const app = express();

// app.use(bodyParser.urlencoded()); // x-wwww-urlencoded <form> - only for forms
app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, PUT, PATCH, DELETE'
  );
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

// add your routes here
app.use(recipeRoutes);

// global error handling login
// app.use((error, req, res, next) => {
//   console.log(error);
//   const status = error.statusCode || 500;
//   const message = error.message;
//   const data = error.data;
//   res.status(status).json({
//     message: message,
//     data: data
//   });
// });

mongoose
  .connect(
    'mongodb+srv://mherasimov:Gerasimov996@cluster0-zo6c5.mongodb.net/foodably?retryWrites=true&w=majority',
    { useUnifiedTopology: true, useNewUrlParser: true }
  )
  .then(result => {
    app.listen(8080);
  })
  .catch(err => {
    console.log(err);
  });
