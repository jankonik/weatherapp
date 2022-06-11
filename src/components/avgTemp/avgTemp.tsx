import React from 'react';
import { useAppSelector } from '../../app/hooks';
import store from '../../app/store';
import './avgTemp.css';
import { IList } from '../search/search';
import { selectForecast } from '../../features/weatherSelectors';
import moment from 'moment';

const AvgTemp = () => {
  const forecast = useAppSelector((state) => state.weather.forecast);
  const isLoading = useAppSelector((state) => state.weather.loading);
  const error = useAppSelector((state) => state.weather.message);
  let sum: number = 0;
  let avg: number = 0;
  let length: number = 0;
  let arr: Array<string> = [];
  let month: string = '';
  console.log(forecast, isLoading, error, 'data');

  forecast?.forEach((obj) => {
    sum += obj.main.temp;
    length++;
    arr.push(moment.unix(obj.dt).format('DD'));
    month = moment.unix(obj.dt).format('MMMM');
  });
  avg = sum / length;
  const first = arr[0];
  const last = arr[length - 1];

  return (
    <>
      {!error && forecast && (
        <div className="avgTemp-container">
          <div className="date">
            {month} {first} - {last}{' '}
          </div>
          <div className="avgTemp">
            <b className="avgTemp-bold">
              {avg.toFixed()}
              <sup className="sup">°C</sup>
            </b>
          </div>
        </div>
      )}
    </>
  );
};

export default AvgTemp;
