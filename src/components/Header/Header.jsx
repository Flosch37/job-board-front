import React, { useState } from 'react';
import './Header.css';
import sun from '../../assets/sun.svg';
import moon from '../../assets/moon.svg';
import logo from '../../assets/logo.svg';

function Header() {


  const [sessionDark, setSessionDark] = useState(JSON.parse(sessionStorage.getItem('dark')));

  const toggleDarkTheme = () => {
    console.log('toggleDarkTheme');

  }


  return (



    <header className="main-header">
      <div className="container">
        <h1 className="logo">
          <img src={logo} alt="devjobsLogo" className="logo-img" aria-hidden="true" />
        </h1>
        <div className="theme-button">
          <img className="theme-buttonsun" src={sun} alt="sun image for light theme" />
          <button id="toggle-dark-theme" onClick={toggleDarkTheme}><div className="circle-theme"></div></button>
          <img className="theme-buttonmoon" src={moon} alt="moon image for dark theme" />
        </div>
      </div>

    </header>

  );
}

export default Header;