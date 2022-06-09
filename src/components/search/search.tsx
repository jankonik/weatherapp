import React, { useEffect, useState } from 'react';
import './search.css';
import TextBox from '../textbox/textbox';
import Dropdown from '../dropdown/dropdown';
import axios from 'axios';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import moment from 'moment';

// import { weatherRequested } from '../../features/weatherSlice';

interface main {
  [key: string]: number;
}

interface list {
  [index: number]: {
    dt: number;
    main: main;
  };
}

interface forecast {
  list: list;
}

interface response {
  data: forecast;
}

const Search = () => {
  const [location, setLocation] = useState('');
  const [code, setCode] = useState('');
  const dispatch = useAppDispatch();
  let weatherNiz: any = [];

  const forecast = useAppSelector((state) => state.weather.forecast);
  console.log(forecast);

  const fetchData = async () => {
    const url = `https://api.openweathermap.org/data/2.5/forecast?q=nis,rs&appid=a0aded824b2b4be8568ca119ec24a000`;
    const response: response = await axios.get(url);
    console.log(response.data.list[5].dt);
    weatherNiz = response.data.list;
    console.log(weatherNiz);
    let day: string;

    const wNizFilter = weatherNiz.filter((weatherObj: any, index: number) => {
      if (index === 0) {
        day = moment.unix(weatherObj.dt).format('dddd');
        console.log(day);
        return weatherObj;
      }

      if (moment.unix(weatherObj.dt).format('dddd') !== day) {
        day = moment.unix(weatherObj.dt).format('dddd');
        return weatherObj;
      }

      return;
    });
    console.log(wNizFilter);
  };

  useEffect(() => {
    // dispatch(weatherRequested(fetchData()));
    fetchData();
  }, []);

  const sendCodeToParent = (country: any) => {
    setCode(country);
    console.log(code);
  };

  const handleInputSubmit = (location: string) => {
    setLocation(location);
    console.log(location);
  };

  return (
    <div className="container">
      <img
        src="https://cdn-icons-png.flaticon.com/512/4064/4064269.png"
        alt="cloudy"
        width="50px"
        height="50px"
      ></img>
      <Dropdown sendCodeToParent={sendCodeToParent} />
      <TextBox handleInputSubmit={handleInputSubmit} />
    </div>
  );
};

export default Search;
