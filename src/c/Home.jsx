// Home.jsx
import React, { useState } from "react";
import { Link } from "react-router-dom";

const Home = () => {
  const [clickCount, setClickCount] = useState(0);
  const handleClick = () => {
    setClickCount((prevCount) => prevCount + 1);

    // Check if click count reaches 2
    if (clickCount === 1) {
      // Open a new window (you can replace the URL with any desired URL)
      window.open("https://www.youtube.com/watch?v=Q5WL-1Dn0Fg", "_blank");
    }
  };

  const a = {
    position: "fixed",
    bottom: "20px",
    left: "20px",
    width: "100px",
    height: "100px",
    backgroundColor: "transparent",
    border: "none",
    outline: "none",
  };

  return (
    <div>
      <nav className="navbar">
        <Link to="/">首頁</Link>
        <Link to="/dog">狗</Link>
        <Link to="/cat">貓</Link>
      </nav>
      <h1>歡迎來到首頁</h1>
      <h1>請點擊上方的"狗"或"貓"來查看資訊</h1>
      <button onClick={handleClick} style={a}>
        A
      </button>
    </div>
  );
};

export default Home;
