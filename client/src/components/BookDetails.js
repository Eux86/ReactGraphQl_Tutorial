import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import { getBookQuery } from '../queries/queries';

class BookDetails extends Component {
    render() {
        const displayBookDetails = () => {
            const {book} = this.props.data;
            if (book) {
                return (
                    <div>
                        <h2>{book.name}</h2>
                        <p>{book.genre}</p>
                        <p>{book.author.name}</p>
                        <p>Other books by this author: </p>
                        <ul className="other-books">
                            { book.author.books.map( item => 
                                <li key={item.id}>{item.name}</li>
                            )}
                        </ul>
                    </div>
                )
            } else {
                return (
                    <div>No book selected...</div>
                )
            }
        }
        
        console.log(this.props);
        return (
            <div id="book-details">
                {displayBookDetails()}   
            </div>
        );
    }
}

export default graphql(getBookQuery, {
    options: (props) => {
        return {
            variables: {
                id: props.selectedBook
            }
        }
    }
})(BookDetails);
