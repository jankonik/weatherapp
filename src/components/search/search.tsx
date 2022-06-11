import React, { FormEvent, useEffect, useState } from 'react';
import './search.css';
import TextBox from '../textbox/textbox';
import Dropdown from '../dropdown/dropdown';
import axios from 'axios';
import { AxiosError } from 'axios';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import moment from 'moment';
import {
  loadingForecast,
  loadingForecastError,
  loadingForecastSuccess,
} from '../../features/weatherSlice';

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

type ServerError = { errorMessage: string };

const Search = (props: any) => {
  const [searchLocation, setSearchLocation] = useState('');
  const [code, setCode] = useState('');
  const [formData, setFormData] = useState({
    countryCode: '',
    location: '',
  });

  const dispatch = useAppDispatch();
  let weatherNiz: any = [];

  const fetchData = async () => {
    const url = `https://api.openweathermap.org/data/2.5/forecast?q=${formData.location},${formData.countryCode}&appid=a0aded824b2b4be8568ca119ec24a000&units=metric`;
    dispatch(loadingForecast(true));
    try {
      const response: response = await axios.get(url);
      weatherNiz = response.data.list;
      dispatch(loadingForecastError(false));
    } catch (error) {
      const serverError = error as AxiosError<ServerError>;
      dispatch(loadingForecastError(true));
    }
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
  }, []);

  const sendCodeToParent = (countryCode: string) => {
    setCode(countryCode);
    setFormData({
      ...formData,
      countryCode: countryCode,
    });
    console.log(code);
  };

  const handleInputSubmit = (location: string) => {
    console.log(location);
  };

  const handleKeyPress = (
    event: React.KeyboardEvent<HTMLInputElement>,
    text: string
  ) => {
    if (event.key === 'Enter') {
      setSearchLocation(searchLocation);
      setFormData({
        ...formData,
        location: text,
      });
    }
  };

  const handleOnClick = (text: string) => {
    console.log('icon clicked');
    setSearchLocation(searchLocation);
    setFormData({
      ...formData,
      location: text,
    });
    fetchData();
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    fetchData();
  };
  console.log(formData);

  return (
    <form onSubmit={(e) => handleSubmit(e)} className="container">
      <img
        src="https://cdn-icons-png.flaticon.com/512/4064/4064269.png"
        alt="cloudy"
        width="50px"
        height="50px"
      ></img>
      <Dropdown sendCodeToParent={sendCodeToParent} />
      <TextBox handleKeyPress={handleKeyPress} handleOnClick={handleOnClick} />
    </form>
  );
};

export default Search;
