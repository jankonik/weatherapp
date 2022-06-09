import React from 'react';
import './avgTemp.css';

const AvgTemp = () => {
  return (
    <div className="avgTemp-container">
      <div className="date">JUNE 10 - 20 2022</div>
      <div className="avgTemp">
        <b className="avgTemp-bold">
          27<sup className="sup">°C</sup>
        </b>
      </div>
    </div>
  );
};

export default AvgTemp;
