import React, { useContext } from 'react';
import './Services.css';
import AppContext from './context/AppContext';
import translate from '../i18n/translate';

function Services() {
  const contextData = useContext(AppContext);
  let darkmode = contextData.darkmode.darkTheme;
  return (
    <section id='Services-v2' className='services-section '>
      <h1 className='services-title'>{translate('title2')}</h1>
      <div className='sCards'>
        <div
          className={darkmode ? 'sCard-white scard1' : 'sCard scard1'}
          data-aos='fade-right'
        >
          <div className='sContainer'>
            <img src='/images/website-build.png' alt='' />
          </div>
          <div className='sdetails'>
            <h3 className={darkmode ? 'stitle-white ' : 'stitle '}>
              {translate('servicest1')}
            </h3>
            <p className={darkmode ? 'stext-white' : 'stext'}>
              {translate('servicestd1')}
            </p>
          </div>
        </div>
        <div
          className={darkmode ? 'sCard-white scard2' : 'sCard scard2 '}
          data-aos='fade-up'
        >
          <div className='sContainer'>
            <img src='/images/responsive-design-min.png' alt='' />
          </div>
          <div className='sdetails'>
            <h3 className={darkmode ? 'stitle-white ' : 'stitle '}>
              {translate('servicest2')}
            </h3>
            <p className={darkmode ? 'stext-white' : 'stext'}>
              {translate('servicestd2')}
            </p>
          </div>
        </div>
        <div
          className={darkmode ? 'sCard-white scard3 ' : 'sCard scard3 '}
          data-aos='fade-left'
        >
          <div className='sContainer'>
            <img src='/images/coding-min.png' alt='' />
          </div>
          <div className='sdetails'>
            <h3 className={darkmode ? 'stitle-white ' : 'stitle '}>
              {translate('servicest3')}
            </h3>
            <p className={darkmode ? 'stext-white' : 'stext'}>
              {translate('servicestd3')}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Services;
