import React, { useEffect, useRef, useState } from 'react';
import './dropdownOptions.css';
import { ICountry } from './dropdown';

interface IData {
  countries: ICountry[];
}

interface Country {
  handleClickOption: (country: ICountry) => void;
  data: IData;
}

const DropdownOptions = (props: Country) => {
  return (
    <div className="items">
      {props.data.countries.map((country: ICountry, index: number) => (
        <div
          key={index}
          className="country"
          onClick={() => props.handleClickOption(country)}
        >
          <img src={`${country.icon}`} alt="" />
          <p>{country.code}</p>
        </div>
      ))}
    </div>
  );
};

export default DropdownOptions;
