import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

class Nav extends Component {
  render() {
    const links = (
      <span className="nav-link">
        <ul className="nav-list">
          <li className="nav-item"><NavLink exact to="/" activeClassName="active">Home</NavLink></li>
          <li className="nav-item"><NavLink to="/facebook" activeClassName="active">Expedia on Facebook</NavLink></li>
          <li className="nav-item"><NavLink to="/quotes" activeClassName="active">Quotes</NavLink></li>
        </ul>
      </span>
    );
    return (
      <nav className="navbar">
        {links}
      </nav>
    );
  }
}

export default Nav;