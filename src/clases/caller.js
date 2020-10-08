const graphql = require('graphql')
const { book, books, addBook } = require('../model/bookModel')
const { author, authors, addAuthor } = require('../model/authorModel')
const { GraphQLObjectType, GraphQLSchema } = graphql;

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        book,
        books,
        author,
        authors
    }
});

const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        addBook,
        addAuthor
    }
});

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation:Mutation
});