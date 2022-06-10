import React, { useEffect, useState } from 'react';
import './search.css';
import TextBox from '../textbox/textbox';
import Dropdown from '../dropdown/dropdown';
import axios from 'axios';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import moment from 'moment';
import {
  loadingForecast,
  loadingForecastSuccess,
} from '../../features/weatherSlice';
import { selectCount } from '../../features/weatherSelectors';

// import { weatherRequested } from '../../features/weatherSlice';

interface IMain {
  temp: number;
  // [key: string]: number;
}

export interface IList {
  dt: number;
  main: IMain;
}

export interface IForecast {
  list: IList;
}

interface response {
  data: IForecast;
}

const Search = () => {
  const [location, setLocation] = useState('');
  const [code, setCode] = useState('');
  const dispatch = useAppDispatch();
  let weatherNiz: any = [];

  const fetchData = async () => {
    const url = `https://api.openweathermap.org/data/2.5/forecast?q=nis,rs&appid=a0aded824b2b4be8568ca119ec24a000`;
    dispatch(loadingForecast(true));
    const response: response = await axios.get(url);
    weatherNiz = response.data.list;
    let day: string;
    const wNizFilter: IList[] = weatherNiz.filter(
      (weatherObj: any, index: number) => {
        if (index === 0) {
          day = moment.unix(weatherObj.dt).format('dddd');
          return weatherObj;
        }

        if (moment.unix(weatherObj.dt).format('dddd') !== day) {
          day = moment.unix(weatherObj.dt).format('dddd');
          return weatherObj;
        }

        return null;
      }
    );
    dispatch(
      loadingForecastSuccess({
        forecast: wNizFilter,
        loading: false,
      })
    );
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
