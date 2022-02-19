import React from 'react';
import './hero.css';
import translate from '../i18n/translate';

function Hero() {
  return (
    <div className='hero-div'>
      <h5 className='bright'>
        {translate('hi')}
        <span>
          <img
            alt=''
            className='taco-img fade-in-left initial-opacity'
            src='/images/taco-min.png'
          />
        </span>
      </h5>

      <h2 className='title-v2 fade-in-right initial-opacity'>
        {translate('im')}
      </h2>
      <h2 className='subtitle-v2 fade-in-up initial-opacity'>
        {translate('ing')}
      </h2>
      <p className='herodes-v2'>{translate('hero')}</p>
    </div>
  );
}

export default Hero;
