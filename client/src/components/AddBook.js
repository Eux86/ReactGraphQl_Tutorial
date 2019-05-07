import React, { Component } from 'react';
import { graphql, compose } from 'react-apollo';
import { getAuthorsQuery, addBookMutation, getBooksQuery } from '../queries/queries';

class AddBook extends Component {

    constructor(props) {
        super(props);
        this.state = {
            name: '',
            genre: '',
            authorId: ''
        }
    }

    displayAuthors() {
        const data = this.props.getAuthorsQuery;
        if (data.loading) {
            return <option disabled>Loading...</option>
        } else {
            return data.authors.map(author => (
                <option key={author.id} value={author.id}>{author.name}</option>
            ))
        }
    }

    submitForm(e) {
        e.preventDefault();
        this.props.addBookMutation({
            variables: {
                name: this.state.name,
                genre: this.state.genre,
                authorId: this.state.authorId
            },
            refetchQueries: [{query: getBooksQuery }]
        });
    }
    
    onChange(event) {
        this.setState( {[event.target.name]:event.target.value} );
    }

    render() {
        console.log(this.state);
        return (
            <form onSubmit={this.submitForm.bind(this)}>
                <div className="field">
                    <label>
                        Book Name:
                    </label>
                    <input type="text" name="name" onChange={this.onChange.bind(this)} />
                </div>
                <div className="field">
                    <label>
                        Genre:
                    </label>
                    <input type="text" name="genre" onChange={this.onChange.bind(this)} />
                </div>
                <div className="field">
                    <label>
                        Author:
                    </label>
                    <select name="authorId" onChange={this.onChange.bind(this)} >
                        <option disabled selected>Select an author...</option>
                        {this.displayAuthors()}
                    </select>
                </div>
                <button>+</button>
            </form>
        );
    }
}

export default compose(
    graphql(getAuthorsQuery, { name: "getAuthorsQuery" }),
    graphql(addBookMutation, { name: "addBookMutation" })
)(AddBook);

