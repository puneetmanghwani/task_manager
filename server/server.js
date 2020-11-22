const path = require('path');
const mongoose = require('mongoose');
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors')

const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())
app.use(cookieParser());

const userRoutes = require('./routes/userRoutes');

app.use('/users', userRoutes);

mongoose
  .connect(
    'mongodb+srv://puneet:puneet@cluster0-adp1h.mongodb.net/task_manager?retryWrites=true&w=majority',{useNewUrlParser: true,useUnifiedTopology: true,useCreateIndex:true,useFindAndModify:false}
  )
  .then(result => {
    app.listen(process.env.PORT || 8000);
  })
  .catch(err => {
    console.log(err);
  });