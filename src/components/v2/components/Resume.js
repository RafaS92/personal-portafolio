import React, { useContext } from 'react';
import './Resume.css';
import AnimatedButton from './shareComponents/AnimatedButton';
import AppContext from './context/AppContext';
import translate from './../i18n/translate';

function Resume() {
  const contextData = useContext(AppContext);
  let darkmode = contextData.darkmode.darkTheme;
  return (
    <section
      className={darkmode ? 'resume__section-v2-white' : 'resume__section-v2'}
    >
      <div className={darkmode ? 'Rcontent-white' : 'Rcontent'}>
        <h2 className={darkmode ? 'rTitle-white' : 'rTitle'}>
          {translate('Resumet')}
        </h2>
        <p className={darkmode ? 'rText-white' : 'rText'}>
          {translate('Resumecon')}
        </p>
        <div className='buttons-container-v2'>
          <AnimatedButton
            label={translate('past')}
            href='https://www.linkedin.com/in/rafael-salvador-valdez/'
          />
          <AnimatedButton
            label='LinkedIn'
            href='https://www.linkedin.com/in/rafael-salvador-valdez/'
          />
          <AnimatedButton
            label={translate('resume')}
            href='https://drive.google.com/file/d/13HfkPrkWcOqWfLh-gQ7UID_yDEk6T6JW/view'
          />
        </div>
      </div>
      <div className='Rimg-container-mb'>
        <img className='Rimg' src='/images/m2.png' alt='' />
      </div>
      <svg
        className='wave'
        xmlns='http://www.w3.org/2000/svg'
        viewBox='0 0 1440 320'
      >
        <path
          fill={darkmode ? '#f7aa11' : '#ff2845'}
          fillOpacity='.8'
          d='M0,288L24,282.7C48,277,96,267,144,234.7C192,203,240,149,288,144C336,139,384,181,432,176C480,171,528,117,576,85.3C624,53,672,43,720,64C768,85,816,139,864,160C912,181,960,171,1008,154.7C1056,139,1104,117,1152,112C1200,107,1248,117,1296,106.7C1344,96,1392,64,1416,48L1440,32L1440,320L1416,320C1392,320,1344,320,1296,320C1248,320,1200,320,1152,320C1104,320,1056,320,1008,320C960,320,912,320,864,320C816,320,768,320,720,320C672,320,624,320,576,320C528,320,480,320,432,320C384,320,336,320,288,320C240,320,192,320,144,320C96,320,48,320,24,320L0,320Z'
        ></path>
      </svg>
    </section>
  );
}

export default Resume;
