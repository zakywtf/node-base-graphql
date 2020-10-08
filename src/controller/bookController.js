var express = require('express');
var { graphqlHTTP } = require('express-graphql');
const caller = require('../clases/caller')

var app = express();

app.use('/', graphqlHTTP({
    schema: caller,
    graphiql: true,
}));

module.exports=app