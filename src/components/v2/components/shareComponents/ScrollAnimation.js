import React, { useContext } from 'react';
import './scroll.css';
import AppContext from '../context/AppContext';

function ScrollAnimation() {
  const contextData = useContext(AppContext);
  let darkmode = contextData.darkmode.darkTheme;
  return (
    <div className='scroll-container'>
      <div
        className={
          darkmode ? 'scroll-icon ex-3' : 'scroll-icon ex-3 black-border'
        }
      >
        <span
          className={darkmode ? 'wheel' : 'wheel black-border black-wheel'}
        ></span>
        <span className={darkmode ? 'arrow up' : 'arrow up  bf-black'}></span>
        <span
          className={darkmode ? 'arrow down' : 'arrow down bf-black'}
        ></span>
      </div>
    </div>
  );
}

export default ScrollAnimation;
