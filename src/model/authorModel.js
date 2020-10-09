const graphql = require('graphql')
const AuthorSchema = require('../schema/author')
const {AuthorType} = require('../clases/objectTypeMaster')
const { 
    GraphQLObjectType, GraphQLString, 
    GraphQLID, GraphQLInt,GraphQLSchema, 
    GraphQLList,GraphQLNonNull 
} = graphql;

const author = { // get author by id
    type: AuthorType,
    args: { id: { type: GraphQLID } },
    resolve(parent, args) {
        return AuthorSchema.findById(args.id);
    }
}

const authors = {  // get all authors
    type: new GraphQLList(AuthorType),
    resolve(parent, args) {
        return AuthorSchema.find({});
    }
}

const addAuthor = {  // add author in graphql and mongodb
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