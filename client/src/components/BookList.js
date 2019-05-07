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

    onBookSelected(book){
        this.setState({selected: book});
    }

    render() {
        return (
            <div>
                <ul id="book-list">
                {this.props.data && this.props.data.books &&
                this.props.data.books.map(book => 
                    <li 
                        key={book.id}
                        onClick={() => this.onBookSelected(book)}>
                        {book.name}
                    </li>
                )}
                {this.props.data.loading && 
                     <div>Loading...</div>
                }
                </ul>
                <BookDetails selectedBook={this.state.selected && this.state.selected.id} />
            </div>
        );
    }
}

export default graphql(getBooksQuery)(BookList);
