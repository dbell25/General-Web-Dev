/**
 * @fileoverview Displays the main novel lookup page.
 * @author Daniel Bell
 */
import React, { Component } from 'react';
import { createApolloFetch } from 'apollo-fetch';
import './Books.css';

const fetch = createApolloFetch({
  uri: 'http://localhost:3001/graphql',
});

class Books extends Component {
    constructor(props) {
        super(props)
        this.bookID = 1;
        this.getBooksQuery = '';
        this.state = {
            name: '',
            genre: '',
            author: '',
            year: '',
            id: 1
        }
    }
    /**
     * Queries the GraphQL
     */
    updateFields = () => {
        if(this.state.id > 0){
            let graphql_query = `{ book(id: "${this.state.id}"){ name author genre year }}`
            fetch({ query: graphql_query })
            .then(res => {
                this.setState({
                    name: res.data.book.name,
                    author: res.data.book.author,
                    genre: res.data.book.genre,
                    year: res.data.book.year
                });
            });
        }
        else this.setState({ name: '', author: '', genre: '', year: '' });
    }

    render() {
        return (
            <div>
                { /* Input Form */}
                <h2 className="title">Classic Novel Information</h2>
                <div className="input">
                <small>Book Title</small>
                <select onChange={(e) => this.setState({ id: e.target.value }, () => this.updateFields())}>
                    <option value="0">Select</option>
                    <option value="1">1984</option>
                    <option value="2">Around the World in 80 Days</option>
                    <option value="3">Murder on The Orient Express</option>
                    <option value="4">I, Robot</option>
                    <option value="4">Robinson Crusoe</option>
                </select>
                </div>
                {/* Output Informaiton */}
                <div className="output">
                    <small>Author</small>
                    <input readOnly={true} value={this.state.author}/>
                    <small>Genre</small>
                    <input readOnly={true} value={this.state.genre}/>
                    <small>Release Year</small>
                    <input readOnly={true} value={this.state.year}/>
                </div>
            </div>
        );
    }
}

export default Books;