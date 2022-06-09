import React, { useEffect, useRef, useState } from 'react';
import './dropdownOptions.css';

interface Country {
  handleClickOption({}: any): any;
  data: any;
}

const DropdownOptions = (props: Country) => {
  return (
    <div className="items">
      {props.data.countries.map((country: any, index: number) => (
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
