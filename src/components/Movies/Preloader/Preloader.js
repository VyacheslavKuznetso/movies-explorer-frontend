import React, { useState, useEffect } from 'react';
import './Preloader.css';

const Preloader = () => {


  return (
    <>
      <div className="preloader-overlay">
        <div className="preloader-container">
          <div className="preloader-circle"></div>
        </div>
      </div>
    </>
  );
};

export default Preloader;
