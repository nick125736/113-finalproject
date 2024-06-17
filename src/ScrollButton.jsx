import React from 'react';

const ScrollButton = () => {
  const scrollToBottom = () => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: 'smooth',
    });
  };

  return (
    <button onClick={scrollToBottom} style={buttonStyle}>
      🔽
    </button>
  );
};

const buttonStyle = {
  position: 'fixed',
  bottom: '20px',
  right: '20px',
  padding: '10px 20px',
  backgroundColor: 'transparent',
  color: 'black',
  border: 'none',
  borderRadius: '5px',
  cursor: 'pointer',
  fontSize: '80px', 
};

export default ScrollButton;
