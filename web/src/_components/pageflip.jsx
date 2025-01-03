import React, { useState } from 'react';
import './PageFlip.css'; // Assuming you will move the CSS to a separate file

const PageFlip = () => {
  const [flippedPages, setFlippedPages] = useState([false, false, false]);

  const toggleFlip = (index) => {
    const newFlippedPages = [...flippedPages];
    newFlippedPages[index] = !newFlippedPages[index];
    setFlippedPages(newFlippedPages);
  };

  return (
    <div className="book-container">
      <div className="book">
        <div className={`page ${flippedPages[0] ? 'turn' : ''}`} onClick={() => toggleFlip(0)}>
          <div className="page-front cover">Click to open</div>
          <div className="page-back">Page 1</div>
        </div>
        <div className={`page ${flippedPages[1] ? 'turn' : ''}`} onClick={() => toggleFlip(1)} style={{ transform: 'translateZ(-2px)' }}>
          <div className="page-front">Page 2</div>
          <div className="page-back">Page 3</div>
        </div>
        <div className={`page ${flippedPages[2] ? 'turn' : ''}`} onClick={() => toggleFlip(2)} style={{ transform: 'translateZ(-4px)' }}>
          <div className="page-front">Page 4</div>
          <div className="page-back cover">The End</div>
        </div>
      </div>
    </div>
  );
};

export default PageFlip;