import React, { Component } from 'react';
import pointerImage from './img/pointing-up.png';

class Home extends Component {
  render() {
    return (
      <main>
        <section id="home-section">
          <img id="pointer-up-image" src={pointerImage} alt="" /><br />
          <h3 className="home-call-to-action">To read the latest from Expedia on Facebook or to read Mark Twain's most popular quotes, explore the links above</h3>
        </section>
      </main>
    );
  }
}

export default Home;