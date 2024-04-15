import React from 'react';
import '../pages/Loader.css';

function Loader() {
  return (
    <div className="loader-overlay w-screen">
      <div className="loader rounded-xl">
        <div className="wrapper">
          <div className="circle"></div>
          <div className="line-1"></div>
          <div className="line-2"></div>
          <div className="line-3"></div>
          <div className="line-4"></div>
        </div>
      </div>
    </div>
  );
}

export default Loader;
