var express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv')
const { connectDb } = require('./config/db');

var { graphqlHTTP } = require('express-graphql');
var { buildSchema } = require('graphql');
const schema = require('./controller/graphql')

var app = express();
dotenv.config()

app.use('/tes', graphqlHTTP({
  schema: schema,
//   rootValue: root,
  graphiql: true,
}));
// app.listen(4000);
// console.log('Running a GraphQL API server at http://localhost:4000/graphql');
connectDb().then(async () => {
    var server = app.listen(process.env.PORT || 6500, function () { 
      var host = server.address().address  
      var port = server.address().port  
      console.log("Example app listening at http://%s:%s", host, port)  
    })  
  });