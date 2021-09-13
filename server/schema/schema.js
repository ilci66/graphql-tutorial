const graphql = require('graphql');
// making use of the find method
const _ = require('lodash');

// get the types I will be using 
const { 
    GraphQLObjectType, 
    GraphQLString, 
    GraphQLSchema,
    // no need id to be a string anymore in queries, it will appear as string when it's querying
    GraphQLID 
} = graphql;


// dummy data
var books = [
    { name: 'Name of the Wind', genre: 'Fantasy', id: '1' },
    { name: 'The Final Empire', genre: 'Fantasy', id: '2' },
    { name: 'The Long Earth', genre: 'Sci-Fi', id: '3' },
];


// create the schema
const BookType = new GraphQLObjectType({
    name: 'Book',
    fields: () => ({
        id: {type:GraphQLID},
        name: {type:GraphQLString},
        genre: {type:GraphQLString}
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
            args: { id: {type: GraphQLID}},
            // args used right down below, as "args.id" for example
            resolve(parent, args){
                // code to get data from db or other source 
                // using find method: "_.find(collection, predicate, fromIndex)"
                return _.find(books, { id: args.id });
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
