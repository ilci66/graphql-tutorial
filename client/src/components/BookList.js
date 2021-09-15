import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import { getBooksQuery} from '../queries/queries'


class BookList extends Component {
    displayBooks(){
        const { data } = this.props
        console.log("this is data>>>>",this.props)
        if(data.loading){
            return (<div>Loading...</div>)
        }else{
            return data.books.map(book =>{
                return(
                    <li key={ book.id }>{book.name}</li>
                )
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
                    {this.displayBooks()}
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