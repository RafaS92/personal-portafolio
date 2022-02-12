import React, { useContext } from 'react';
import './Services.css';
import AppContext from './context/AppContext';
import translate from '../i18n/translate';

function Services() {
  const contextData = useContext(AppContext);
  let darkmode = contextData.darkmode.darkTheme;
  return (
    <section
      id='Services-v2'
      className='services-section ani-up initial-opacity'
    >
      <h1 className='services-title'>{translate('title2')}</h1>
      <div className='sCards'>
        <div
          className={
            darkmode
              ? 'sCard-white scard1 ani-left initial-opacity'
              : 'sCard scard1 ani-left initial-opacity'
          }
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
          className={
            darkmode
              ? 'sCard-white scard2 ani-up initial-opacity'
              : 'sCard scard2 ani-up initial-opacity'
          }
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
          className={
            darkmode
              ? 'sCard-white scard3 ani-right initial-opacity'
              : 'sCard scard3 ani-right initial-opacity'
          }
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
