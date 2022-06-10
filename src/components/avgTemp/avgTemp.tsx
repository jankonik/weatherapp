import React from 'react';
import { useAppSelector } from '../../app/hooks';
import store from '../../app/store';
import { selectCount } from '../../features/weatherSelectors';
import './avgTemp.css';
import { IList } from '../search/search';

const AvgTemp = () => {
  const forecast = useAppSelector((state) => state.weather.forecast);
  const isLoading = useAppSelector((state) => state.weather.loading);

  console.log(forecast, isLoading, 'data');

  forecast?.forEach((obj) => {
    const temp = obj.main.temp;
    console.log(temp);
  });

  return (
    <div className="avgTemp-container">
      <div className="date"></div>
      <div className="avgTemp">
        <b className="avgTemp-bold">
          27<sup className="sup">°C</sup>
        </b>
      </div>
    </div>
  );
};

export default AvgTemp;
