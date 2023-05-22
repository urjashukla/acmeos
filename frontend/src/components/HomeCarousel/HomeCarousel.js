import React from 'react';
import Carousel from 'react-bootstrap/Carousel';
import './HomeCarousel.css';
import slide1 from './../../images/s1.png';
import slide2 from './../../images/s2.png';
import slide3 from './../../images/s3.png';

const HomeCarousel = () => {
  return (
    <Carousel fade>
      <Carousel.Item>
        <img className="d-block w-100" src={slide1} alt="First slide" />
      </Carousel.Item>
      <Carousel.Item>
        <img className="d-block w-100" src={slide2} alt="Second slide" />
      </Carousel.Item>
      <Carousel.Item>
        <img className="d-block w-100" src={slide3} alt="Third slide" />
        <Carousel.Caption>
          <a href="/chapters">
            <button className="seehowbtn">
              See How <i className="fa fa-play-circle" aria-hidden="true"></i>
            </button>
          </a>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
};

export default HomeCarousel;
