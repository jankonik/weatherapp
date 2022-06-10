import React from 'react';
import moment from 'moment';
import './dailyTemp.css';

const DailyTemp = (props: any) => {
  const weekDays = [
    'MONDAY',
    'TUESDAY',
    'WEDNESDAY',
    'THURSDAY',
    'FRIDAY',
    'SATURDAY',
    'SUNDAY',
  ];
  const currentDay = moment().day();
  let concatWeekDays = weekDays.concat(weekDays.splice(0, currentDay - 1));

  return (
    <div className="dailyTemp-container">
      {concatWeekDays.map((day: any, index: number) => (
        <div key={index} className="day">
          <b className="day-bold">{day}</b>
          <div className="temp">
            <b className="temp-number">
              30<sup className="temp-sup">°C</sup>
            </b>
          </div>
        </div>
      ))}
    </div>
  );
};

export default DailyTemp;
