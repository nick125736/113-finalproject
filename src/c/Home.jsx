// Home.jsx
import React from 'react';
import { Link } from 'react-router-dom';


const Home = () => {
  return (
    <div>
      <nav className="navbar">
        <Link to="/">Home</Link>
        <Link to="/dog">Dog</Link>
        <Link to="/cat">Cat</Link>
      </nav>
      <h1>Welcome to the Home Page</h1>
    </div>
  );
};

export default Home;
