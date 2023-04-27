import React, { useState } from 'react';
import './Header.css';


function Header() {

  
  const [sessionDark, setSessionDark] = useState(JSON.parse(sessionStorage.getItem('dark')));

  const toggleDarkTheme = () => {
    const button = document.querySelector("#toggle-dark-theme");
    const imgButton = document.querySelector(".circle-theme");

    if(button.id === "toggle-dark-theme") {
      button.id = "toggle-dark-theme-checked";
      imgButton.className = "circle-theme-checked";
    } else if (button.id === "toggle-dark-theme-checked") {
      button.id = "toggle-dark-theme";
      imgButton.className = "circle-theme";
    }

    if (sessionDark) {
      sessionStorage.setItem('dark', false);
      setSessionDark(false);
    } else if (!sessionDark) {
      sessionStorage.setItem('dark', true);
      setSessionDark(true);
    }

    

    const btnFilterModal = document.querySelector("#btn-modal-responsive img");
    let btnFilterModalState = btnFilterModal.getAttribute("src");

    if (btnFilterModalState === "img/filter-icon.svg") {
      btnFilterModal.setAttribute("src", "img/filter-icon-white.svg")
    } else if (btnFilterModalState === "img/filter-icon-white.svg") {
      btnFilterModal.setAttribute("src", "img/filter-icon.svg")
    }
  }


  return (

    

    <header className="main-header">
        <div className="container">
            <h1 className="logo">
                <img src="../img/logo.svg" alt="devjobsLogo" className="logo-img" aria-hidden="true"/>
            </h1>
            <div className="theme-button">
                <img className="theme-buttonsun" src="img/sun.svg" alt="sun image for light theme"/>
                <button id="toggle-dark-theme" onClick={toggleDarkTheme}><div className="circle-theme"></div></button>
                <img className="theme-buttonmoon" src="img/moon.svg" alt="moon image for dark theme"/>
            </div>
        </div>
        
    </header>

  );
}

export default Header;