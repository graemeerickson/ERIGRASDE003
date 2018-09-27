import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import FacebookPosts from './FacebookPosts';
import GoodreadsQuotes from './GoodreadsQuotes';
import Home from './Home';
import Nav from './Nav';
import './App.css';

class App extends Component {
  render() {
    return (
      <div>
        <Router>
          <div>
            <Nav />
            <Route exact path="/" component={Home} />
            <Route exact path="/facebook" component={FacebookPosts} />
            <Route exact path="/quotes" component={GoodreadsQuotes} />
            <Route exact path="/quotes/:id" component={GoodreadsQuotes} />
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
