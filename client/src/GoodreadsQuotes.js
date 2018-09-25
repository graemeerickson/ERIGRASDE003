import React, { Component } from 'react';

class GoodreadsQuotes extends Component {

  componentDidMount = () => {
    fetch('http://localhost:3001/quotes')
      .then(response => response.json())
      .then(quotes => {
        console.log('quotes received from backend:', quotes);
      })
      .catch(err => console.log('An error occured while parsing!', err))
  }

  render() {
    return (
      <div>
        <h1>GoodreadsQuotes component</h1>
      </div>
    )
  }
}

export default GoodreadsQuotes;