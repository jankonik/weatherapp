import React, { useEffect } from 'react';
import './dropdown.css';
import { useState } from 'react';
import data from '../../assets/countries.json';
import DropdownOptions from './dropdownOptions';

export interface ICountry {
  name: string;
  code: string;
  icon: string;
}

interface ISendCode {
  sendCodeToParent: (code: string) => void;
}

const Dropdown = (props: ISendCode) => {
  const [isOpened, setIsOpened] = useState(false);
  const [country, setCountry] = useState(data.countries[0]);

  useEffect(() => {
    props.sendCodeToParent(country.code);
  }, []);

  function handleClick() {
    if (!isOpened) {
      setIsOpened(true);
    } else {
      setIsOpened(false);
    }
  }

  const handleClickOption = (country: ICountry) => {
    setCountry(country);
    props.sendCodeToParent(country.code);
  };

  return (
    <div onClick={handleClick} className="form-control dropdown noselect">
      <img className="flag" src={country.icon} alt=""></img>
      <b>{country.code}</b>
      <img
        className={isOpened ? 'rotated' : ''}
        src="https://icon-library.com/images/dropdown-menu-icon/dropdown-menu-icon-12.jpg"
        alt=""
        height="25px"
        width="25px"
      ></img>

      {isOpened && (
        <DropdownOptions data={data} handleClickOption={handleClickOption} />
      )}
    </div>
  );
};

export default Dropdown;
