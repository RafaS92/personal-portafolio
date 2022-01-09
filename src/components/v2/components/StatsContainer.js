import React from 'react';
import * as projectsData from '../../../data/projectsData.json';

function StatsContainer(props) {
  return (
    <div className='stats-container-v2'>
      <div className='stat'>
        <a href={props.youtube} className='stat-link'>
          <div className='value'>
            <i className='fab fa-youtube' />
          </div>
          DEMO
        </a>
      </div>
      <div className='stat'>
        <a href={props.github} className='stat-link'>
          <div className='value-v2'>
            <i className='fab fa-github'></i>
          </div>
          <div className='type'>CODE</div>
        </a>
      </div>
      {props.website ? (
        <div className='stat'>
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
