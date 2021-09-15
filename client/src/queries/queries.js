import { gql } from 'apollo-boost';


// creating the query, `` a bit weid but looks similiar to the queries I made using graphiql interface
const getBooksQuery = gql`
    {
        books{
            name
            id
        }
    }
`

// getting the ncessary info in order to add books
const getAuthorsQuery = gql`
    {
        authors {
            name
            id
        }
    }
`
// names of the mutations should match the names I defined in the backend
// the parameters and their types are also defined in the backend so match 
// them too for making a mutation
// I can define query variables and their expected types as below, after "mutation"
// the ! makes it a required variable, tyes are like GraphQL... types
const addBookMutation = gql`
    mutation($name: String!, $genre: String!, $authorId: ID!){
        addBook(name: $name, genre: $genre, authorId: $authorId){
            name
            id
        }
    }
`

export { getAuthorsQuery, getBooksQuery, addBookMutation };