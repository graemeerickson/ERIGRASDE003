import React, { Component } from 'react';

const SERVER_URL = 'http://localhost:3001';
const AUTH_PATH = '/auth';
const QUOTES_PATH = '/quotes';

class GoodreadsQuotes extends Component {
  constructor() {
    super();
    this.state = {
      loaded: false,
      authorized: false,
      quotesArr: []
    }
  }

  componentDidMount = () => {
    const authorizedInLocalStorage = localStorage.getItem('authorized_with_goodreads');
    const urlParam = this.props.match.params.id;
    // if '1' is in the url string, then assume the user is authorized by Goodreads. if '1' isn't
    // in the url string, check if we've written to localStorage that this user is authorized.
    if (urlParam === '1' || authorizedInLocalStorage) {
      fetch(SERVER_URL + QUOTES_PATH)
        .then(response => response.json())
        .then(quotesArr => {
          // write to localstorage
          localStorage.setItem('authorized_with_goodreads', true);
          this.setState({
            loaded: true,
            authorized: true,
            quotesArr
          })
        })
        .catch(err => console.log('Error occured while fetching data', err))
    }
    // not authorized by Goodreads - do not fetch quotes
    else {
      this.setState({
        loaded: true
      })
    }
  }

  render() {
    const quotes = this.state.quotesArr.map((quote, index) => {
      return (
        <div className="post-card quote-post" key={index}>
          <p>{quote.quoteText}</p>
          <small>Tags: {quote.quoteTags.join()}</small>
          <br />
          <small>{quote.quoteLikes}</small>
        </div>
      )
    })

    if (this.state.loaded && this.state.authorized) {
      return (
        <main>
          {quotes}
        </main>
      )
    } else if (this.state.loaded && !this.state.authorized) {
      return (
        <main>
          <a href={SERVER_URL + AUTH_PATH}>
            <button className="login-btn">Log into Goodreads to read<br /> Mark Twain's top quotes</button>
          </a>
        </main>
      )
    } else {
      return (
        <main>
          <h2>Fetching Mark Twain quotes...</h2>
          <div className="spinner"></div>
        </main>
      )
    }
  }
}

export default GoodreadsQuotes;