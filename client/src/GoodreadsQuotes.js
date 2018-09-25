import React, { Component } from 'react';

class GoodreadsQuotes extends Component {
  constructor() {
    super();
    this.state = {
      loaded: false,
      quotesArr: []
    }
  }

  componentDidMount = () => {
    fetch('http://localhost:3001/quotes')
      .then(response => response.json())
      .then(quotesArr => {
        this.setState({
          loaded: true,
          quotesArr
        })
      })
      .catch(err => console.log('An error occured while parsing!', err))
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

    if (this.state.loaded) {
      return (
        <main>
          {quotes}
        </main>
      )
    } else {
      return (
        <main>
          <h3>Fetching Mark Twain quotes...</h3>
          <div className="spinner"></div>
        </main>
      )
    }
  }
}

export default GoodreadsQuotes;