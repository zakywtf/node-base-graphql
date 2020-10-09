const graphql = require('graphql')
const Book = require('../schema/book')
const AuthorSchema = require('../schema/author')
const { 
    GraphQLObjectType, GraphQLString, 
    GraphQLID, GraphQLInt,GraphQLSchema, 
    GraphQLList,GraphQLNonNull 
} = graphql;

const BookType = new GraphQLObjectType({  // create book graphql object
    name: 'Book',
    fields: () => ({
        id: { type: GraphQLID  },
        name: { type: GraphQLString }, 
        pages: { type: GraphQLInt },
        author: {
        type: AuthorType,
        resolve(parent, args) {
            return AuthorSchema.findById(parent.authorID);
        }
    }
    })
});

const AuthorType = new GraphQLObjectType({  // create author graphql object
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

module.exports={
    BookType,
    AuthorType
}