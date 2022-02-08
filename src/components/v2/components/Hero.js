import React from 'react';
import './hero.css';
import translate from '../i18n/translate';
import ScrollAnimation from './shareComponents/ScrollAnimation';

function Hero() {
  return (
    <div className='hero-div'>
      <h5 className='bright'>
        {translate('hi')}
        <span>
          <img alt='' className='taco-img' src='/images/taco-min.png' />
        </span>
      </h5>

      <h1 className='title-v2'>{translate('im')}</h1>
      <h2 className='subtitle-v2'>{translate('ing')}</h2>
      <p className='herodes-v2'>{translate('hero')}</p>
      <ScrollAnimation />
    </div>
  );
}

export default Hero;
