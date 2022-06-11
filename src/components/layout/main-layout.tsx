import React from 'react';
import Search from '../search/search';
import './main-layout.css';
import colors from '../../assets/colors';
import { useAppSelector } from '../../app/hooks';
import store from '../../app/store';

const Layout = ({ children }: any) => {
  let sum: number = 0;
  let length: number = 0;
  let avg: number;
  let color: string = '';
  let avgTemp: number = 0;

  const forecast = useAppSelector((state) => state.weather.forecast);
  console.log(forecast);
  forecast?.forEach((obj) => {
    sum += obj.main.temp;
    length++;
  });
  console.log(sum);
  avg = sum / length;
  avg = Math.round(avg);
  color = colors[avg];
  console.log(color);

  return (
    <>
      {forecast && (
        <main
          style={{
            background: `linear-gradient(to bottom right, lightblue, ${color})`,
          }}
          className="main"
        >
          {children}
        </main>
      )}
      {!forecast && (
        <main
          style={{
            background: `linear-gradient(to bottom right, lightblue, antiquewhite)`,
          }}
          className="main"
        >
          {children}
        </main>
      )}
    </>
  );
};

export default Layout;
