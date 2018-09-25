import React, { Component } from 'react';
import expediaLogo from './img/expedia_logo.jpg';

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
      const titleArr = post.title.split(' ');
      const [expediaTitlePortion, ...remainingTitlePortion] = titleArr;
      const remainingTitlePortionFormatted = remainingTitlePortion.join(' ');
      return (
        <div className="post-card fb-post" key={index}>
          <img className="expedia-logo" src={expediaLogo} alt="expedia_logo" />
          <h3><a href="https://www.facebook.com/expedia/" target="_blank" rel="noopener noreferrer">{expediaTitlePortion}</a> {remainingTitlePortionFormatted}</h3>
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
          <div className="spinner"></div>
        </main>
      )
    }
  }
}

export default FacebookPosts;