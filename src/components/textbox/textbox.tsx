import React, { useState } from 'react';
import './textbox.css';

const TextBox = (props: any) => {
  const [isHover, setIsHover] = useState(false);

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
        onChange={(e) => props.handleInputSubmit(e.target.value)}
      ></input>
      <img
        src="https://img.icons8.com/ios-glyphs/344/search--v1.png"
        alt="search"
        height="25px"
        width="25px"
        className={isHover ? 'hovered' : ''}
      ></img>
    </div>
  );
};

export default TextBox;
