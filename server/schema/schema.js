const graphql = require('graphql');
const { assign } = require('lodash');
// making use of the find method
const _ = require('lodash');
const Book = require('../models/book');
const Author = require('../models/author');

// get the types I will be using 
const { 
    GraphQLObjectType, 
    GraphQLString, 
    GraphQLSchema,
    GraphQLID,
    GraphQLInt,
    GraphQLList
} = graphql;



// create the schemas
const AuthorType = new GraphQLObjectType({
    name: 'Author',
    // when fields is a fucntion didn't throw any 'undefined' errors so just keep it in mind
    // that fields is supposed to be a fucntion 
    fields: () => ({
        id: {type:GraphQLID},
        name: {type:GraphQLString},
        age: {type: GraphQLInt},
        book: {
            // as an author may have multiple books 'GraphQLList' should be used
            type: new GraphQLList(BookType),
            resolve(parent, args){
                // the parent here is author object and authorId is already present
                return _.filter(books, { authorId: parent.id})
            }
        }
    })
})
const BookType = new GraphQLObjectType({
    name: 'Book',
    fields: () => ({
        id: {type:GraphQLID},
        name: {type:GraphQLString},
        genre: {type:GraphQLString},
        // we can define the relations between shcmemas
        author: {
            // type of data I'm expecting
            type: AuthorType,
            // resolve is the method that actually looks for and serves the data
            // parent in this case is the book object
            resolve(parent, args){
                // console.log(parent)
                return _.find(authors, { id: parent.authorId})
                // {
                //     book(id:2){
                //       name
                //       genre
                //       author{
                //         name
                //       }
                //     }
                //   }
                // this kind of a query is now possible
            }
        }
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
        },
        // to get all without querying with and id, like this
        // {
        //     authors{
        //       name
        //         book{
        //             name
        //             genre
        //         }
        //     }
        //  }
        books: {
            type: new GraphQLList(BookType),
            resolve(parents, args){
                return books
            }
        },
        authors: {
            type: new GraphQLList(AuthorType),
            resolve(parents, args){
                return authors
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
