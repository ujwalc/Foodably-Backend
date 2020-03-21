const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const dbConfig = require('./database/db');

const recipeRoutes = require('./routes/recipes.routes');
const authRoutes = require('./routes/auth.routes');


const app = express();

app.use(
    bodyParser.urlencoded({
        extended: false
    })
); // x-wwww-urlencoded <form> - only for forms
app.use(bodyParser.json());
app.use(cors());

// add your routes here

app.use('/api', authRoutes);
app.use(recipeRoutes);

// global error handling login
app.use((error, req, res, next) => {
    console.log(error);
    const status = error.statusCode || 500;
    const message = error.message;
    const data = error.data;
    res.status(status).json({
        message: message,
        data: data
    });
});

mongoose
    .connect(dbConfig.db, {
        useUnifiedTopology: true,
        useNewUrlParser: true,
        useCreateIndex: true
    })
    .then(result => {
        app.listen(process.env.PORT || 4000);
    })
    .catch(err => {
        console.log(err);
    });