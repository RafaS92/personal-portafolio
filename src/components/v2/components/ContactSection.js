import React, { useContext } from 'react';
import './ContactSection.css';
import AppContext from './context/AppContext';
import translate from './../i18n/translate';

function ContactSection() {
  const contextData = useContext(AppContext);
  let darkmode = contextData.darkmode.darkTheme;

  return (
    <>
      <div id='Contact-v2' style={{ opacity: 0 }}>
        V2
      </div>
      <section className='contact-v2' data-aos='fade-up'>
        <h1 className='contact-title-v2'>{translate('title5')}</h1>
        <h5 className='contact-v2-text'>
          <p>
            {translate('touch')}
            <span></span>
          </p>
        </h5>

        <div className='section-icons-container'>
          <div
            className={darkmode ? 'icons-container' : 'icons-container-white'}
          >
            <div className='icon-contact'>
              <div
                className={
                  darkmode
                    ? 'single-icon-container'
                    : 'single-icon-container-white'
                }
              >
                <i className='fas fa-map-marker-alt fa-lg icon-style'></i>
              </div>

              <div className='icon-text-container'>
                <h3>{translate('touchLoc')}</h3>
                <p className='details-text'>Galveston, TX</p>
              </div>
            </div>
            <div className='icon-contact'>
              <div
                className={
                  darkmode
                    ? 'single-icon-container'
                    : 'single-icon-container-white'
                }
              >
                <i className='fas fa-mobile-alt  fa-lg icon-style'></i>
              </div>

              <div className='icon-text-container'>
                <h3>{translate('touchPho')}</h3>
                <p className='details-text phone'>+1 832-920-0685</p>
                <span className='details-text-whats'>{translate('whats')}</span>
              </div>
            </div>
            <div className='icon-contact'>
              <div
                className={
                  darkmode
                    ? 'single-icon-container'
                    : 'single-icon-container-white'
                }
              >
                <i className='fas fa-envelope  fa-lg icon-style'></i>
              </div>

              <div className='icon-text-container'>
                <h3>Email</h3>
                <p className='details-text'>rvaldezdev.2020@gmail.com</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default ContactSection;
