import React from 'react';
import wip from './../../images/wip.png';
import './Test.css';

const Test = () => {
  return (
    <div className='TestHeroDiv'>
      <div className='TestImgEncloseDiv'>
        <img src={wip} alt="Work in progress" className='img-fluid'/>
        <h4 className='TestWIP'>Work in progress</h4>
      </div>
    </div>
  );
};

export default Test;
