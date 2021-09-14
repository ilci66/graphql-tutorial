import React, { Component } from 'react';
import { gql } from 'apollo-boost';
import { graphql } from 'react-apollo';

// creating the query, `` a bit weid but looks similiar to the queries I made using graphiql interface
const getBooksQuery = gql`
    {
        books{
            name
            id
        }
    }
`

class BookList extends Component {
    render(){
        console.log(this.props)
        return(
            <div>
                <ul id="book-list">
                    <li>Book name</li>
                </ul>
            </div>
        );
    }
}

// I wrote it as both to prevent future confusion, gonna keep it here
// const BookList = (props) => {
//     console.log(props)
//     return(
//         <div>
//             <ul id="book-list">
//                 <li>Book name</li>
//             </ul>
//         </div>
//     );
// }
// use graphql here, binding the query to component
export default graphql(getBooksQuery)(BookList);