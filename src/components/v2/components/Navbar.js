import React, { useState, useEffect, useContext } from 'react';
import { Switch } from '@material-ui/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './Navbar.css';
import AppContext from './context/AppContext';
import translate from '../i18n/translate';

function Navbar(props) {
  const [click, setClick] = useState(false);
  const [button, setButton] = useState(true);
  const [bartransparency, setBartransparency] = useState(true);
  const [icon, setIcon] = useState('fa-times');

  const contextData = useContext(AppContext);
  let darkmode = contextData.darkmode.darkTheme;

  const toggleTheme = () => {
    contextData.setDarkmode({
      darkTheme: !contextData.darkmode.darkTheme
    });
  };

  const handleClick = () => {
    setClick(!click);
  };

  const closeMobileMenue = () => setClick(false);

  const showButton = () => {
    if (window.innerWidth <= 960) {
      setButton(false);
    } else {
      setButton(true);
    }
  };

  let changeWidth = window.addEventListener('resize', showButton);
  // window.addEventListener('scroll', function () {});

  useEffect(() => {
    showButton();
  }, []);
  return (
    <>
      <nav className={darkmode ? 'nav__white' : ' navbarv2 '}>
        <div className='navbar-container'>
          <a href='/' className='navbar-logo' onClick={closeMobileMenue}>
            <i className='fas fa-flag'></i>
          </a>
          <div
            className={
              darkmode ? 'menu-icon black-icon' : 'menu-icon white-icon'
            }
            onClick={handleClick}
          >
            <FontAwesomeIcon icon={click ? 'times' : 'bars'} />
          </div>

          <ul
            className={
              darkmode
                ? click
                  ? 'nav-menu active'
                  : 'nav-menu'
                : click
                ? 'nav-menu active-black'
                : 'nav-menu'
            }
          >
            <li className='nav-item'>
              <a
                href='#About-v2'
                className='nav-links'
                onClick={closeMobileMenue}
              >
                {translate('nav1')}
              </a>
            </li>
            <li className='nav-item'>
              <a
                href='#Services-v2'
                className='nav-links'
                onClick={closeMobileMenue}
              >
                {translate('nav2')}
              </a>
            </li>
            <li className='nav-item'>
              <a
                href='#Technologies-v2'
                className='nav-links'
                onClick={closeMobileMenue}
              >
                {translate('nav3')}
              </a>
            </li>
            <li className='nav-item'>
              <a
                href='#Projects-v2'
                className='nav-links'
                onClick={closeMobileMenue}
              >
                {translate('nav4')}
              </a>
            </li>
            <li className='nav-item'>
              <a
                href='#Other-v2'
                className='nav-links'
                onClick={closeMobileMenue}
              >
                {translate('nav5')}
              </a>
            </li>
            <li className='nav-item'>
              <a
                href='#Contact-v2'
                className='nav-links'
                onClick={closeMobileMenue}
              >
                {translate('nav6')}
              </a>
            </li>
            <li className='nav-item'>
              <button
                onClick={props.changeLanguage}
                className='nav-links lan-btn'
              >
                <i className='fas fa-globe'></i>
                {props.locale ? <span> Spa</span> : <span> Eng</span>}
              </button>
            </li>
            <li className='nav-item dark-light-switch'>
              <i
                className={
                  darkmode ? 'far fa-sun red-icon' : 'far fa-sun red-icon'
                }
              ></i>
              <Switch onChange={toggleTheme} />
              <i
                className={
                  darkmode ? 'far fa-moon red-icon' : 'far fa-moon red-icon'
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
