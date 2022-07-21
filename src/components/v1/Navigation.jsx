import React, { useState, useEffect } from 'react';
import './Navigation.css';

function Navigation() {
  const [click, setClick] = useState(false);
  const [, setButton] = useState(true);

  const handleClick = () => setClick(!click);
  const closeMobileMenue = () => setClick(false);

  const showButton = () => {
    if (window.innerWidth <= 960) {
      setButton(false);
    } else {
      setButton(true);
    }
  };

  window.addEventListener('resize', showButton);

  useEffect(() => {
    showButton();
  }, []);

  return (
    <>
      <nav className='navbar2'>
        <a href='#start' className='navbar-logo' onClick={closeMobileMenue}>
          <img alt='' src='images/Rv.jpg' className='logo-v1' />
        </a>
        <div className='navbar-container-v1'>
          <div className='menu-icon' onClick={handleClick}>
            <i className='fas fa-bars' />
          </div>

          <ul className={click ? 'nav-menu active' : 'nav-menu-v1'}>
            <li className='nav-item'>
              <a
                href='#about'
                className='nav-links-v1'
                onClick={closeMobileMenue}
              >
                ABOUT
              </a>
            </li>
            <li className='nav-item'>
              <a
                href='#skills'
                className='nav-links-v1'
                onClick={closeMobileMenue}
              >
                SKILLS
              </a>
            </li>
            <li className='nav-item'>
              <a
                href='#projects'
                className='nav-links-v1'
                onClick={closeMobileMenue}
              >
                PROJECTS
              </a>
            </li>
            <li className='nav-item'>
              <a
                href='#resume'
                className='nav-links-v1'
                onClick={closeMobileMenue}
              >
                RESUME
              </a>
            </li>
            <li className='nav-item'>
              <a
                href='#contact'
                className='nav-links-v1'
                onClick={closeMobileMenue}
              >
                CONTACT
              </a>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
}

export default Navigation;
