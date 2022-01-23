import React, { useState, useEffect } from 'react';
import { Switch } from '@material-ui/core';
import SwitchMui from './shareComponents/SwitchMui';
import './Navbar.css';

function Navbar(props) {
  const [click, setClick] = useState(false);
  const [button, setButton] = useState(true);
  const [bartransparency, setBartransparency] = useState(true);

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
      <nav className={bartransparency ? 'navbarv2 ' : 'nav__white'}>
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
              <button onClick={props.changeLanguage} class='nav-links'>
                ChangeLanguage
              </button>
            </li>
            <li className='nav-item dark-light-switch'>
              <Switch
                checked={props.darkMode}
                onChange={props.darkModeChange}
              />

              {/* <SwitchMui
                checked={props.darkMode}
                onChange={props.darkModeChange}
              /> */}
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
