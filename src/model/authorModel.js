const graphql = require('graphql')
const AuthorSchema = require('../schema/author')
const {AuthorType} = require('../clases/objectTypeMaster')
const { 
    GraphQLObjectType, GraphQLString, 
    GraphQLID, GraphQLInt,GraphQLSchema, 
    GraphQLList,GraphQLNonNull 
} = graphql;

const author = {
    type: AuthorType,
    args: { id: { type: GraphQLID } },
    resolve(parent, args) {
        return AuthorSchema.findById(args.id);
    }
}

const authors = {
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
    authors,
    addAuthor
}