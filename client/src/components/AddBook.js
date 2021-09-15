import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import { getAuthorsQuery, addBookMutation, getBooksQuery} from '../queries/queries'
// apparently react-apollo was using flowright and stopped using in 2020 to compose
import { flowRight as compose } from 'lodash';

class AddBook extends Component {
    constructor(props){
        super(props);
        this.state = {
            name: "",
            genre: "",
            authorId: ""
        }
    };

    displayAuthors(){
        // this becomes becomes undefined after composing because now info I get is different
        // var { data } = this.props
        // names i defined down there come into play here
        // console.log(this.props)
        var data = this.props.getAuthorsQuery
        if(data.loading){
            return( <option disabled>Loading authors</option> );
        } else {
            return data.authors.map(author => {
                return( <option key={ author.id } value={author.id}>{ author.name }</option> );
            });
        }
    };
    submitForm(e){
        e.preventDefault()
        // console.log(this.state)
        // this is how I call the mutation
        // again it's the name I gave, I could name it something else if I wanted to
        this.props.addBookMutation({
            // setting the variables to create a new book
            variables: {
                name: this.state.name,
                genre: this.state.genre,
                authorId: this.state.authorId
            },
            // this will cause the necessary re-render of the conponent after adding a book
            refetchQueries: [{ query: getBooksQuery }]
        })
    }

    render(){
        return(
            <form id="add-book" onSubmit={this.submitForm.bind(this)}>
                <div className="field" onChange={(e) => this.setState({name: e.target.value})}>
                    <label>Book name:</label>
                    <input type="text" />
                </div>
                <div className="field" onChange={(e) => this.setState({genre: e.target.value})}>
                    <label>Genre:</label>
                    <input type="text" />
                </div>
                <div className="field" onChange={(e) => this.setState({authorId: e.target.value})}>
                    <label>Author:</label>
                    <select>
                        <option>Select author</option>
                        { this.displayAuthors() }
                    </select>
                </div>
                <button>+</button>
            </form>
        );
    }
}

// realacing this one with the one I can compese multiple queries or mutations
// export default graphql(getAuthorsQuery)(AddBook);

// the name properties are going to be used up there 
export default compose(
    graphql(getAuthorsQuery, { name: "getAuthorsQuery"}),
    graphql(addBookMutation, { name: "addBookMutation"})
)(AddBook);
