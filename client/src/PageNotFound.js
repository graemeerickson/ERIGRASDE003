import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <main>
      <h3>Page not found! Check out <Link to="/facebook">Expedia's Facebook Posts</Link> or <Link to="/quotes">Mark Twain's quotes</Link> instead!</h3>
    </main>
  )
}

export default NotFound;