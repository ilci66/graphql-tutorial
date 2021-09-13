const graphql = require('graphql');
const { assign } = require('lodash');
// making use of the find method
const _ = require('lodash');

// get the types I will be using 
const { 
    GraphQLObjectType, 
    GraphQLString, 
    GraphQLSchema,
    // no need id to be a string anymore in queries, it will appear as string when it's querying
    GraphQLID,
    // for integers
    GraphQLInt 
} = graphql;


// dummy data
var books = [
    { name: 'Name of the Wind', genre: 'Fantasy', id: '1' },
    { name: 'The Final Empire', genre: 'Fantasy', id: '2' },
    { name: 'The Long Earth', genre: 'Sci-Fi', id: '3' },
];
var authors = [
    { name: 'Patrick Rothfuss', age: 44, id: '1' },
    { name: 'Brandon Sanderson', age: 42, id: '2' },
    { name: 'Terry Pratchett', age: 66, id: '3' }
];

// create the schemas
const BookType = new GraphQLObjectType({
    name: 'Book',
    fields: () => ({
        id: {type:GraphQLID},
        name: {type:GraphQLString},
        genre: {type:GraphQLString}
    })
})
const AuthorType = new GraphQLObjectType({
    name: 'Author',
    fields: () => ({
        id: {type:GraphQLID},
        name: {type:GraphQLString},
        age: {type: GraphQLInt}
    })
})

// this jumps into the database and get's the particular thing I want 
const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        // first I wanna query for a book and the name matters
        // I d
        book: {
            type: BookType,
            // these are the expected arguments for the query
            args: { id: { type: GraphQLID } },
            // args used right down below, as "args.id" for example
            resolve(parent, args){
                // code to get data from db or other source 
                // using find method: "_.find(collection, predicate, fromIndex)"
                return _.find(books, { id: args.id });
            }
        },
        author: {
            type: AuthorType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args){
                return _.find(authors, { id: args.id});
            }
        }
    }

})

// query example
// book(id:"2"){
//     name
//     genre
// }



module.exports = new GraphQLSchema({
    query: RootQuery
});
