import React, { FC, ReactNode } from 'react';
import Search from '../search/search';
import './main-layout.css';
import colors1 from '../../assets/colors';
import { useAppSelector } from '../../app/hooks';
import store from '../../app/store';

interface IChildren {
  children: ReactNode;
}

const Layout = ({ children }: IChildren) => {
  let sum: number = 0;
  let length: number = 0;
  let avg: number;
  let color: string = '';
  let avgTemp: number = 0;

  const forecast = useAppSelector((state) => state.weather.forecast);
  forecast?.forEach((obj) => {
    sum += obj.main.temp;
    length++;
  });
  avg = sum / length;
  avg = Math.round(avg);
  color = colors1[40 + avg];

  return (
    <>
      {forecast && (
        <div
          className="background"
          style={{
            backgroundImage: `linear-gradient(to bottom right, lightblue, ${color})`,
          }}
        >
          <main className="main">{children}</main>
        </div>
      )}
      {(!forecast || !forecast?.length) && (
        <div
          className="background"
          style={{
            backgroundImage: `linear-gradient(to bottom right, lightblue, antiquewhite)`,
          }}
        >
          <main className="main">{children}</main>
        </div>
      )}
    </>
  );
};

export default Layout;
