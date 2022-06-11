import React, { useState } from 'react';
import { selectForecast } from '../../features/weatherSelectors';
import './textbox.css';
import { useAppSelector } from '../../app/hooks';

interface ItextBox {
  handleKeyPress: (
    e: React.KeyboardEvent<HTMLInputElement>,
    text: string
  ) => void;
  handleOnClick: (text: string) => void;
}

const TextBox = (props: ItextBox) => {
  const [isHover, setIsHover] = useState(false);
  const [inputText, setInputText] = useState('');
  const [location, setLocation] = useState('');

  const isLoading = useAppSelector((state) => state.weather.loading);

  return (
    <div
      className="input-container"
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
    >
      <input
        type="text"
        className="form-control input"
        placeholder="Please enter your location..."
        onChange={(e) => setInputText(e.target.value)}
        onKeyPress={(e) => props.handleKeyPress(e, inputText)}
      ></input>
      {!isLoading && (
        <img
          onClick={() => props.handleOnClick(inputText)}
          src="https://img.icons8.com/ios-glyphs/344/search--v1.png"
          alt="search"
          height="25px"
          width="25px"
          className={isHover ? 'hovered' : ''}
        ></img>
      )}
      {isLoading && (
        <div className="lds-ring">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      )}
    </div>
  );
};

export default TextBox;
