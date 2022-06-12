import React from 'react';
import moment from 'moment';
import './dailyTemp.css';
import { useAppSelector } from '../../app/hooks';

interface IDay {
  name: string;
  temp: number;
}

const DailyTemp = () => {
  const daysArr: {
    name: string;
    temp: number;
  }[] = [];

  const forecast = useAppSelector((state) => state.weather.forecast);

  forecast?.forEach((dayObj) => {
    const name = moment.unix(dayObj.dt).format('dddd');
    const temp = dayObj.main.temp;
    daysArr.push({ name, temp });
  });

  return (
    <>
      {forecast?.length && (
        <div className="dailyTemp-container">
          {daysArr?.map((day: IDay, index: number) => (
            <div key={index} className="day">
              <b className="day-bold">{day.name}</b>
              <div className="temp">
                <b className="temp-number">
                  {day.temp.toFixed()}
                  <sup className="temp-sup">°C</sup>
                </b>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default DailyTemp;
