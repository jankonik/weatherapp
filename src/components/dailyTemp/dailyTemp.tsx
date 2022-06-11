import React from 'react';
import moment from 'moment';
import './dailyTemp.css';
import { useAppSelector } from '../../app/hooks';
import { IList } from '../search/search';

const DailyTemp = (props: any) => {
  // const weekDays = [
  //   'MONDAY',
  //   'TUESDAY',
  //   'WEDNESDAY',
  //   'THURSDAY',
  //   'FRIDAY',
  //   'SATURDAY',
  //   'SUNDAY',
  // ];
  // const currentDay = moment().day();
  // let concatWeekDays = weekDays.concat(weekDays.splice(0, currentDay - 1));

  const daysArr: {
    name: string;
    temp: number;
  }[] = [];

  let days: Array<string> = [];
  const forecast = useAppSelector((state) => state.weather.forecast);
  const isLoading = useAppSelector((state) => state.weather.loading);
  const error = useAppSelector((state) => state.weather.message);

  forecast?.forEach((dayObj) => {
    const name = moment.unix(dayObj.dt).format('dddd');
    const temp = dayObj.main.temp;
    daysArr.push({ name, temp });
  });
  console.log(daysArr);

  // const days = forecast?.map((day: IList, index: number) => (

  // ))

  return (
    <>
      {!error && forecast && (
        <div className="dailyTemp-container">
          {daysArr?.map((day: any, index: number) => (
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
