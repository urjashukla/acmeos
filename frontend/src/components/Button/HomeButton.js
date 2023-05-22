import React from 'react';
import './HomeButton.css';

const HomeButton = ({ title }) => {
  return (
    <button className="homebtn">
      {title} <i className="fa fa-play-circle" aria-hidden="true"></i>
    </button>
  );
};

export default HomeButton;
