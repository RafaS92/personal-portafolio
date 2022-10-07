import React, { useState, useEffect, useContext } from 'react';
import { Switch } from '@material-ui/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './Navbar.css';
import AppContext from './context/AppContext';
import translate from '../i18n/translate';

function Navbar(props) {
  const [click, setClick] = useState(false);
  const [button, setButton] = useState(true);

  const contextData = useContext(AppContext);
  let darkmode = contextData.darkmode.darkTheme;

  const toggleTheme = () => {
    contextData.setDarkmode({
      darkTheme: !contextData.darkmode.darkTheme
    });
    setClick(false);
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

  useEffect(() => {
    showButton();
  }, []);
  return (
    <>
      <nav className={darkmode ? 'nav__white' : 'navbarv2'}>
        <div className='navbar-container'>
          <a href='#hero' className='navbar-logo' onClick={closeMobileMenue}>
            <img alt='' src={ darkmode ? "/images/logos/logo-letters-black.png" : '/images/logos/logo-letters-white.png'} />
          </a>
          <div
            className={
              darkmode ? 'menu-icon black-icon' : 'menu-icon white-icon'
            }
            onClick={handleClick}
          >
            <FontAwesomeIcon style={{fontSize:'22px'}} icon={click ? 'times' : 'bars'} />
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
            <li className='nav-item' style={{marginLeft: 'auto',marginRight: 'auto'}}>
              <img className='logo-img-mobile' alt='' src={ darkmode ? "/images/logos/logo-letters-black.png" : '/images/logos/logo-letters-white.png'} />
            </li>
            <li className='nav-item nav-item-mobile'>
              <button
                onClick={props.changeLanguage}
                className='nav-links lan-btn'
              >
                <img className='language-img' src='/images/bilingual-flag.png' alt=''/>
              </button>
            </li>
            <li className='nav-item nav-item-mobile dark-light-switch'>
              <i
                className={
                  darkmode ? 'far fa-sun red-icon' : 'far fa-sun red-icon'
                }
              ></i>
              <Switch onChange={toggleTheme} defaultChecked />
              <i
                className={
                  darkmode ? 'far fa-moon red-icon' : 'far fa-moon red-icon'
                }
              ></i>
            </li>
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
            <li className='nav-item nav-item-desktop'>
              <button
                onClick={props.changeLanguage}
                className='nav-links lan-btn'
              >
                <img className='language-img' src='/images/bilingual-flag.png' alt=''/>
              </button>
            </li>
            <li className='nav-item nav-item-desktop dark-light-switch'>
              <i
                className={
                  darkmode ? 'far fa-sun red-icon' : 'far fa-sun red-icon'
                }
              ></i>
              <Switch onChange={toggleTheme} defaultChecked />
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
