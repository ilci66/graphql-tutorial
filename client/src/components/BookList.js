import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import { getBooksQuery } from '../queries/queries';
import BookDetails from './BookDetails';

class BookList extends Component {
    constructor(props){
        super(props);
        this.state = {
            selected: null
        }
    }
    displayBooks(){
        var { data } = this.props;

        if(data.loading){
            return( <div>Loading books...</div> );
        } else {
            return data.books.map(book => {
                return(
                    <li key={ book.id } onClick={ (e) => this.setState({ selected: book.id }) }>{ book.name }</li>
                );
            })
        }
    }
    render(){        
        // console.log(this.props)
        // make use of the loading property to make sure you have the data, 
        // turns false when you have the data you want by default
        return(
            <div>
                <ul id="book-list">
                    { this.displayBooks() }
                </ul>
                <BookDetails bookId={ this.state.selected } />
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