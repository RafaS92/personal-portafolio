import React, { useState, useContext } from 'react';
import AppContext from './context/AppContext';
import * as projectsData from '../../../data/projectsData.json';

function StatsContainer(props) {
  const contextData = useContext(AppContext);
  let darkmode = contextData.darkmode.darkTheme;

  return (
    <div className='stats-container-v2'>
      <div className={darkmode ? 'statv2' : ' statv2-white  '}>
        <a href={props.youtube} className='stat-link'>
          <div className='value'>
            <i className='fab fa-youtube' />
          </div>
          DEMO
        </a>
      </div>
      <div className={darkmode ? 'statv2' : ' statv2-white  '}>
        <a href={props.github} className='stat-link'>
          <div className='value-v2'>
            <i className='fab fa-github'></i>
          </div>
          <div className='type'>CODE</div>
        </a>
      </div>
      {props.website ? (
        <div className={darkmode ? 'statv2' : ' statv2-white  '}>
          <a href={props.website} className='stat-link'>
            <div className='value'>
              <i className='fas fa-globe'></i>
            </div>
            WEBSITE
          </a>
        </div>
      ) : null}
    </div>
  );
}

export default StatsContainer;
