import React, { Component } from 'react';

class FacebookPosts extends Component {
  
  componentDidMount = () => {
    fetch('http://localhost:3001/facebook')
      .then(response => response.json())
      .then(posts => {
        console.log('posts received from backend:', posts)
      })
      .catch(err => console.log('Error while parsing:', err))
  }

  render() {
    return (
      <div>
        <h1>FacebookPosts component</h1>
      </div>
    )
  }
}

export default FacebookPosts;