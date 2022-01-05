import React, { useState } from 'react';
// import './global.css';
import Navbar from './Navbar';
import About from './About';
import { I18nProvider, LOCALES } from '../i18n';
import translate from '../i18n/translate';
import { ThemeProvider, createTheme } from '@material-ui/core/styles';
// import darkTheme from './themes/darkTheme';
// import lightTheme from './themes/lightTheme';
import { Paper } from '@material-ui/core';
import Hero from './Hero';
import './Main.css';
import Skills from './Skills';
import Projects from './Projects';

function Main() {
  const [locale, setLocale] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  console.log(darkMode);

  // const changeTheme = () => {
  //   setDarkMode(!darkMode)
  // }

  const changeLocale = () => {
    setLocale(!locale);
  };

  const darkModeChange = () => {
    setDarkMode(!darkMode);
  };

  const lightTheme = createTheme({
    palette: {
      type: 'light',
      primary: {
        main: '#000000',
        light: '#a09f9f',
        bright: 'ff3200',
      },
      text: {
        bright: '#1F73FB',
      },
      background: {
        paper: '#f2f2f2',
        container: '#1F73FB',
      },
    },
  });

  const darkTheme = createTheme({
    palette: {
      type: 'dark',
      primary: {
        main: '#FFFFFF',
        light: '#0000FF',
        bright: '#30D5C8',
      },
      text: {
        bright: '#30D5C8',
      },
      background: {
        paper: '#0A192F',
        container: '#112240',
      },
    },
  });

  return (
    <ThemeProvider
      classNam='v2'
      theme={darkMode == false ? darkTheme : lightTheme}
    >
      <Paper>
        <I18nProvider
          locale={locale === true ? LOCALES.ENGLISH : LOCALES.SPANISH}
        >
          <Navbar
            locale={locale}
            changeLanguage={changeLocale}
            darkModeChange={darkModeChange}
            darkMode={darkMode}
          />
          <div className='Twrapper '>
            {/* <Hero />
    <About />
    <Skills /> */}
            <Projects />
          </div>
        </I18nProvider>
      </Paper>
    </ThemeProvider>
  );
}

export default Main;
