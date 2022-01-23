import React, { useState, useEffect, useContext } from 'react';
import { Switch } from '@material-ui/core';
import './Navbar.css';
import AppContext from './context/AppContext';

function Navbar(props) {
  const [click, setClick] = useState(false);
  const [button, setButton] = useState(true);
  const [bartransparency, setBartransparency] = useState(true);

  const contextData = useContext(AppContext);
  let darkmode = contextData.darkmode.darkTheme;

  const toggleTheme = () => {
    contextData.setDarkmode({
      darkTheme: !contextData.darkmode.darkTheme
    });
  };

  const handleClick = () => setClick(!click);
  const closeMobileMenue = () => setClick(false);

  const showButton = () => {
    if (window.innerWidth <= 960) {
      setButton(false);
    } else {
      setButton(true);
    }
  };

  const barshow = () => {
    console.log('rererere');
  };

  window.addEventListener('resize', showButton);
  window.addEventListener('scroll', function () {
    console.log('terror');
  });

  useEffect(() => {
    showButton();
    barshow();
  }, []);
  return (
    <>
      <nav className={darkmode ? 'nav__white' : ' navbarv2 '}>
        <div className='navbar-container'>
          <a href='/' className='navbar-logo' onClick={closeMobileMenue}>
            Rafael Valdez<i className='fas fa-flag'></i>
          </a>
          <div className='menu-icon' onClick={handleClick}>
            <i className={click ? 'fas fa-bars' : 'fas fa-times'} />
          </div>

          <ul className={click ? 'nav-menu active' : 'nav-menu'}>
            <li className='nav-item'>
              <a href='/' className='nav-links' onClick={closeMobileMenue}>
                About
              </a>
            </li>
            <li className='nav-item'>
              <a
                href='/services'
                className='nav-links'
                onClick={closeMobileMenue}
              >
                Tecnologies
              </a>
            </li>
            <li className='nav-item'>
              <a
                href='/products'
                className='nav-links'
                onClick={closeMobileMenue}
              >
                Resume
              </a>
            </li>
            <li className='nav-item'>
              <a
                href='/products'
                className='nav-links'
                onClick={closeMobileMenue}
              >
                Contact
              </a>
            </li>
            <li className='nav-item'>
              <button onClick={props.changeLanguage} className='nav-links'>
                ChangeLanguage
              </button>
            </li>
            <li className='nav-item dark-light-switch'>
              <i
                className={
                  darkmode ? 'far fa-sun red-icon' : 'far fa-sun blue-icon'
                }
              ></i>
              <Switch onChange={toggleTheme} defaultChecked />
              <i
                className={
                  darkmode ? 'far fa-moon red-icon' : 'far fa-moon blue-icon'
                }
              ></i>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
