import React from 'react';
import './hero.css';
import translate from '../i18n/translate';

function Hero() {
  return (
    <div id='hero' className='hero-div'>
      <h5 className='bright'>
        {translate('hi')}
        <span>
          <img
            alt=''
            className='taco-img'
            src='/images/taco-min.png'
            data-aos='fade-right'
          />
        </span>
      </h5>

      <h2 className='title-v2' data-aos='fade-left'>
        {translate('im')}
      </h2>
      <h2 className='subtitle-v2' data-aos='fade-up'>
        {translate('ing')}
      </h2>
      <p className='herodes-v2'>{translate('hero')}</p>
    </div>
  );
}

export default Hero;
