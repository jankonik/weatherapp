import React, { ReactNode } from 'react';
import './main-layout.css';
import colors1 from '../../assets/colors';
import { useAppSelector } from '../../app/hooks';

interface IChildren {
  children: ReactNode;
}

const Layout = ({ children }: IChildren) => {
  let sum: number = 0;
  let length: number = 0;
  let avg: number;
  let color: string = '';

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
      <div
        className="background"
        style={
          forecast
            ? {
                backgroundImage: `linear-gradient(to bottom right, lightblue, ${color}`,
              }
            : !forecast
            ? {
                backgroundImage: `linear-gradient(to bottom right, lightblue, antiquewhite`,
              }
            : {
                backgroundImage: `linear-gradient(to bottom right, lightblue, antiquewhite`,
              }
        }
      >
        <main className="main">{children}</main>
      </div>
    </>
  );
};

export default Layout;
