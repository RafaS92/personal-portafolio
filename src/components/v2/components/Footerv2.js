import React, { useContext } from 'react';
import AppContext from './context/AppContext';
import './Footerv2.css';

function Footerv2() {
  const contextData = useContext(AppContext);
  let darkmode = contextData.darkmode.darkTheme;
  return (
    <div className={darkmode ? 'footer-section-v2-white' : 'footer-section-v2'}>
      <div
        className={
          darkmode ? 'footer-container-v2-white' : 'footer-container-v2'
        }
      >
        <div className='footer-icons-container'>
          <a href='https://www.youtube.com/channel/UCuTuDGb-Y9w-k-WgdXxWV6w'>
            <i className='fab fa-youtube bot-icons-v2' />
          </a>
          <a href='https://github.com/RafaS92'>
            <i className='fab fa-github bot-icons-v2' />
          </a>
          <a href='https://medium.com/@manrvaldez.92'>
            <i className='fab fa-medium-m bot-icons-v2' />
          </a>
          <a href='mailto:rvaldezdev.2020@gmail.com'>
            <i className='fas fa-envelope-square bot-icons-v2' />
          </a>
        </div>
        <div>© 2025 Rafael Valdez. All Rights Reserved.</div>
      </div>
    </div>
  );
}

export default Footerv2;
