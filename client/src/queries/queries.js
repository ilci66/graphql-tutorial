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

export {getAuthorsQuery, getBooksQuery}