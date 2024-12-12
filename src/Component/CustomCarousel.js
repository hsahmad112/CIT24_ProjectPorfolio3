import React, { useState, useEffect } from 'react';
import './../index.css';
import TitleCard from './TitleComponents/TitleCard';
import { Card,Button,  ButtonGroup } from 'react-bootstrap';
import { useNavigate } from "react-router";
import { Trash, ArrowLeftSquareFill, ArrowRightSquareFill } from 'react-bootstrap-icons';
import SimpleTitle from './TitleComponents/SimpleTitle';

const CustomCarousel = ({ items }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const navigate = useNavigate();
  const itemCount = items.length;


  // Calculate indices for the 5 visible cards
  const visibleItems = Array.from({ length: 5 }, (_, i) => (currentIndex + i) % itemCount);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % itemCount);
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + itemCount) % itemCount);
  };
  useEffect(() => {
    const fetchData = async () => {
      try {

      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  },[]);

  return (
    <div className="carousel-container" style={{ marginTop:  "50px", height: "100%"}}>  
        <ArrowLeftSquareFill  width={"50px"} height={"50px"} className="carousel-arrow left" onClick={handlePrev}/>
            {visibleItems.map((itemIndex, idx) => (
                <SimpleTitle key={idx} title={items[itemIndex]} navigate={navigate}/>

            ))}  

            <ArrowRightSquareFill width={"50px"} height={"50px"} className="carousel-arrow right" onClick={handleNext}/>

    </div>
  );
};

export default CustomCarousel;
