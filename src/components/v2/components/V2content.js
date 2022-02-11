import React, { useState, useContext, useEffect } from 'react';
// import './global.css';
import { I18nProvider, LOCALES } from '../i18n';
import Skills from './Skills';
import Projects from './Projects';
import Resume from './Resume';
import Hero from './Hero';
import About from './About';
import AppContext from './context/AppContext';
import Services from './Services';
import ContactSection from './ContactSection';

function V2content({ locale }) {
  useEffect(() => {
    contextData.setDarkmode({
      english: !contextData.darkmode.english
    });
  }, [locale]);

  // window.addEventListener('resize', () => {
  //   let vh = window.innerHeight * 0.01;
  //   document.documentElement.style.setProperty('--vh', `${vh}px`);
  // });

  // useEffect(() => {
  //   let vh = window.innerHeight * 0.01;
  //   document.documentElement.style.setProperty('--vh', `${vh}px`);
  // }, []);

  const contextData = useContext(AppContext);
  let darkmode = contextData.darkmode.darkTheme;

  const darkStyles = {
    backgroundColor: '#0a192f',
    color: 'white'
  };

  const lightStyles = {
    backgroundColor: '#dbd4d4',
    color: 'black'
  };

  return (
    <div style={darkmode ? darkStyles : lightStyles}>
      <div className='Twrapper'>
        <Hero />
        <About />
        <Services />
        <Skills />
        <Projects />
        <Resume />
        <ContactSection />
      </div>
    </div>
  );
}

export default V2content;
