import React, { Component } from 'react';
import  {graphql } from 'react-apollo';
import { getBookQuery } from '../queries/queries'

class BookDetails extends Component {
    render(){
        // getting the bookId, passed down from the BookList component
        // and using it do the query, I basically took care of the query down below 
        console.log(this.props)
        return(
            <div id="book-details">
                <p>for book details</p>
            </div>
        )
    }
}

// export default graphql(getBookQuery)(BookDetails); 
// altering it to be able to pass the bookId property as a query parameter
// whenever the a prop is updated or a new prop comes in, the function I define below will fire
export default graphql(getBookQuery, {
    options: (props) => {
        return {
            variables: {
                id: props.bookId
            }
        }
    }
})(BookDetails);