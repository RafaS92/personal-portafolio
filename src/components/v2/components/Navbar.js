import React, { useState, useEffect, useContext } from 'react';
import { Switch } from '@material-ui/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './Navbar.css';
import AppContext from './context/AppContext';

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
    console.log(click);
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
            Rafael Valdez<i className='fas fa-flag'></i>
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
                About
              </a>
            </li>
            <li className='nav-item'>
              <a
                href='#Services-v2'
                className='nav-links'
                onClick={closeMobileMenue}
              >
                Services
              </a>
            </li>
            <li className='nav-item'>
              <a
                href='#Technologies-v2'
                className='nav-links'
                onClick={closeMobileMenue}
              >
                Tecnologies
              </a>
            </li>
            <li className='nav-item'>
              <a
                href='#Projects-v2'
                className='nav-links'
                onClick={closeMobileMenue}
              >
                Projects
              </a>
            </li>
            <li className='nav-item'>
              <a
                href='#Other-v2'
                className='nav-links'
                onClick={closeMobileMenue}
              >
                Other
              </a>
            </li>
            <li className='nav-item'>
              <a
                href='#Contact-v2'
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
