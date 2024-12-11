import React, { useState } from 'react';
import './../index.css';

const CustomCarousel = ({ items }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const itemCount = items.length;

  // Calculate indices for the 5 visible cards
  const visibleItems = Array.from({ length: 5 }, (_, i) => (currentIndex + i) % itemCount);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % itemCount);
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + itemCount) % itemCount);
  };

  return (
    <div className="carousel-container">
      <button className="carousel-arrow left" onClick={handlePrev}>
        &#9664;
      </button>

      <div className="carousel-cards">
        {visibleItems.map((itemIndex, idx) => (
          <div key={idx} className="carousel-card">
            {items[itemIndex]}
          </div>
        ))}
      </div>

      <button className="carousel-arrow right" onClick={handleNext}>
        &#9654;
      </button>
    </div>
  );
};

export default CustomCarousel;