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
const taskRoutes = require('./routes/taskRoutes');

app.use('/users', userRoutes);
app.use('/tasks', taskRoutes);

mongoose
  .connect(
    'mongodb+srv://puneet:puneet@cluster0-adp1h.mongodb.net/task?retryWrites=true&w=majority',{useNewUrlParser: true,useUnifiedTopology: true,useCreateIndex:true,useFindAndModify:false}
  )
  .then(result => {
    app.listen(process.env.PORT || 8000);
  })
  .catch(err => {
    console.log(err);
  });