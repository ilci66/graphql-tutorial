import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import { getAuthorsQuery} from '../queries/queries'


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
        var { data } = this.props
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
        console.log(this.state)
    }

    render(){
        return(
            <form id="add-book" onSubmit={this.submitForm.bind(this)}>
                <div className="field" onChange={(e) => this.setState({name: e.target.name})}>
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

export default graphql(getAuthorsQuery)(AddBook);