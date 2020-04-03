const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const dbConfig = require('./database/db');

const commentRoutes = require('./routes/userComments');
const recipeRoutes = require('./routes/recipes.routes');
const authRoutes = require('./routes/auth.routes');

const searchRoutes = require('./routes/search.routes');

const userRoutes = require('./routes/users.routes');
const cookingRoutes = require('./routes/cooking-list.routes');
const profileRoutes = require('./routes/profile.routes');
const ratingRoutes = require('./routes/rating.routes');

const app = express();

app.use(
  bodyParser.urlencoded({
    extended: false
  })
); // x-wwww-urlencoded <form> - only for forms
app.use(bodyParser.json());
app.use(cors());

// add your routes here
app.use('/userComments', commentRoutes);
app.use('/search', searchRoutes);
app.use('/api', authRoutes);
app.use('/api', userRoutes);
app.use('/recipe', recipeRoutes);
app.use('/cookinglist', cookingRoutes);
app.use('/profile', profileRoutes);
app.use('/rating', ratingRoutes);

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
