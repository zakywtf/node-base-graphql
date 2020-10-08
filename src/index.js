var express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv')
const { connectDb } = require('./config/db');

const bookController = require('./controller/bookController')
const authorController = require('./controller/authorController')

var app = express();
dotenv.config()

app.use('/book', bookController)
app.use('/author', authorController)


connectDb().then(async () => {
    var server = app.listen(process.env.PORT || 6500, function () { 
      var host = server.address().address  
      var port = server.address().port  
      console.log("Example app listening at http://%s:%s", host, port)  
    })  
  });