import React, { Component } from 'react';

class FacebookPosts extends Component {
  constructor() {
    super();
    this.state = {
      loaded: false,
      posts: []
    }
  }

  componentDidMount = () => {
    fetch('http://localhost:3001/facebook')
      .then(response => response.json())
      .then(posts => {
        this.setState({
          loaded: true,
          posts
        })
      })
      .catch(err => console.log('Error while parsing:', err))
  }

  render() {
    
    const posts = this.state.posts.map((post, index) => {
      return (
        <div key={index}>
          <h3>{post.title}</h3>
          <p>{post.text}</p>
          <small>{post.timestamp}</small>
        </div>
      )
    })

    if (this.state.loaded) {
      return (
        <main>
          {posts}
        </main>
      )
    } else {
      return (
        <main>
          <h2>Fetching Expedia Facebook posts...</h2>
        </main>
      )
    }
  }
}

export default FacebookPosts;