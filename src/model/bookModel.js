const graphql = require('graphql')
const Book = require('../schema/book')
const Author = require('../schema/author')
const { 
    GraphQLObjectType, GraphQLString, 
    GraphQLID, GraphQLInt,GraphQLSchema, 
    GraphQLList,GraphQLNonNull 
} = graphql;

const BookType = new GraphQLObjectType({
    name: 'Book',
    fields: () => ({
        id: { type: GraphQLID  },
        name: { type: GraphQLString }, 
        pages: { type: GraphQLInt },
        author: {
        type: AuthorType,
        resolve(parent, args) {
            return Author.findById(parent.authorID);
        }
    }
    })
});

const AuthorType = new GraphQLObjectType({
    name: 'Author',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        age: { type: GraphQLInt },
        book:{
            type: new GraphQLList(BookType),
            resolve(parent,args){
                return Book.find({ authorID: parent.id });
            }
        }
    })
})

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