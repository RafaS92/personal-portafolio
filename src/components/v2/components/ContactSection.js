import React, { useContext } from 'react';
import './ContactSection.css';
import AppContext from './context/AppContext';

function ContactSection() {
  const contextData = useContext(AppContext);
  let darkmode = contextData.darkmode.darkTheme;

  return (
    <div className='contact-v2'>
      <h1>Get in Touch</h1>
      <p className='contact-v2-text'>
        erasdadaasda adf hadafhjdfjhs jfs sdjhfhjsdfjhshj fhlsl hfhs
        fdshhlfsflhs llhksdfkhl shklfhk lsfkls lhkd fhklsdkf hlshklfd
        khlsdfglhsg dsfgsdfdfg asdasfsdfgdsfgdgdf sdfdsfsf sfdsfsdfwerf
      </p>

      <div className='section-icons-container'>
        <div className={darkmode ? 'icons-container' : 'icons-container-white'}>
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
              <h3>Location</h3>
              <p className='details-text'>
                #1400 Bayou Shore Dr, Galveston,Tx 77055
              </p>
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
              <h3>Phone</h3>
              <p className='details-text phone'>+1 832-920-0685</p>
              <span className='details-text-whats'>
                Available also in whatsapp
              </span>
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
    </div>
  );
}

export default ContactSection;
