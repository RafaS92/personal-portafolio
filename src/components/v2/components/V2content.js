import React, { useState, useContext } from 'react';
// import './global.css';
import { I18nProvider, LOCALES } from '../i18n';
import Skills from './Skills';
import Projects from './Projects';
import Resume from './Resume';
import Hero from './Hero';
import About from './About';
import AppContext from './context/AppContext';

function V2content() {
  const [locale, setLocale] = useState(true);

  const contextData = useContext(AppContext);
  let darkmode = contextData.darkmode.darkTheme;
  console.log(darkmode);

  const darkStyles = {
    backgroundColor: '#0a192f',
    color: 'white'
  };

  const lightStyles = {
    backgroundColor: 'whitesmoke',
    color: 'black'
  };

  return (
    <div style={darkmode ? darkStyles : lightStyles}>
      <div className='Twrapper'>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Resume />
      </div>
    </div>
  );
}

export default V2content;
