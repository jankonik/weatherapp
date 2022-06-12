import React, { FormEvent, useState } from 'react';
import './search.css';
import TextBox from '../textbox/textbox';
import Dropdown from '../dropdown/dropdown';
import axios from 'axios';
import { AxiosError } from 'axios';
import { useAppDispatch } from '../../app/hooks';
import moment from 'moment';
import {
  loadingForecast,
  loadingForecastError,
  loadingForecastSuccess,
} from '../../features/weatherSlice';
import { toast } from 'react-toastify';

interface IMain {
  temp: number;
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
  const [searchLocation, setSearchLocation] = useState('');
  const [formData, setFormData] = useState({
    countryCode: '',
    location: '',
  });

  const dispatch = useAppDispatch();

  const fetchData = async () => {
    const url = `https://api.openweathermap.org/data/2.5/forecast?q=${formData.location},${formData.countryCode}&appid=a0aded824b2b4be8568ca119ec24a000&units=metric`;
    dispatch(loadingForecast(true));
    try {
      const response: response = await axios.get(url);
      const weatherNiz: any = response.data.list;
      let day: string;
      const wNizFilter: IList[] = weatherNiz.filter(
        (weatherObj: IList, index: number) => {
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
    } catch (error) {
      const serverError = error as AxiosError;
      dispatch(loadingForecastError(serverError.message));
    }
  };

  const sendCodeToParent = (countryCode: string) => {
    setFormData({
      ...formData,
      countryCode: countryCode,
    });
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
    setSearchLocation(searchLocation);
    setFormData({
      ...formData,
      location: text,
    });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (formData.location != '') {
      fetchData();
    } else {
      toast.error('Location not provided!');
    }
  };

  return (
    <form onSubmit={(e) => handleSubmit(e)} className="container">
      <img
        className="clouds"
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
