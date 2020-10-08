const graphql = require('graphql')
const {BookType} = require('../clases/objectTypeMaster')
const Book = require('../schema/book')
const { 
    GraphQLObjectType, GraphQLString, 
    GraphQLID, GraphQLInt,GraphQLSchema, 
    GraphQLList,GraphQLNonNull 
} = graphql;

const book = {
    type: BookType,
    args: { id: { type: GraphQLID } },
    resolve(parent, args) {
        return Book.findById(args.id);
    }
    
}

const books = {
    type: new GraphQLList(BookType),
    resolve(parent, args) {
        return Book.find({});
    }
}

const addBook = {
    type:BookType,
    args:{
        name: { type: new GraphQLNonNull(GraphQLString)},
        pages: { type: new GraphQLNonNull(GraphQLInt)},
        authorID: { type: new GraphQLNonNull(GraphQLID)}
    },
    resolve(parent,args){
        let book = new Book({
            name:args.name,
            pages:args.pages,
            authorID:args.authorID
        })
        return book.save()
    }
}

module.exports = {
    book,
    books,
    addBook
}