const graphql = require('graphql')
const Book = require('../schema/book')
const AuthorSchema = require('../schema/author')
const { 
    GraphQLObjectType, GraphQLString, 
    GraphQLID, GraphQLInt,GraphQLSchema, 
    GraphQLList,GraphQLNonNull 
} = graphql;

const BookType = new GraphQLObjectType({
    name: 'test_book',
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

const AuthorType = new GraphQLObjectType({
    name: 'test_author',
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

const author = {
    type: AuthorType,
    args: { id: { type: GraphQLID } },
    resolve(parent, args) {
        return AuthorSchema.findById(args.id);
    }
}

const authorss = {
    type: new GraphQLList(AuthorType),
    resolve(parent, args) {
        return AuthorSchema.find({});
    }
}

const addAuthor = {
    type: AuthorType,
    args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        age: { type: new GraphQLNonNull(GraphQLInt) }
    },
    resolve(parent, args) {
        let author = new AuthorSchema({
            name: args.name,
            age: args.age
        });
        return author.save();
    }
}

module.exports = {
    author,
    authorss,
    addAuthor
}