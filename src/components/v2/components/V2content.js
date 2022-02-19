import React, { useContext, useEffect } from 'react';
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
    const aniUpList = document.querySelectorAll('.ani-up');
    const aniLeftList = document.querySelectorAll('.ani-left');
    const aniRightList = document.querySelectorAll('.ani-right');
    const aniRightTitles = document.querySelectorAll('.ani-right-title');
    const aniLeftTitles = document.querySelectorAll('.ani-left-title');

    window.addEventListener('scroll', () => {
      aniUpList.forEach((e) => {
        var top = e.getBoundingClientRect().top;
        if (top < window.innerHeight - 600) {
          e.classList.add('fade-in-up');
        }
      });

      aniLeftList.forEach((e) => {
        var top = e.getBoundingClientRect().top;
        if (top < window.innerHeight - 650) {
          e.classList.add('fade-in-left');
        }
      });

      aniRightList.forEach((e) => {
        var top = e.getBoundingClientRect().top;
        if (top < window.innerHeight - 650) {
          e.classList.add('fade-in-right');
        }
      });

      aniLeftTitles.forEach((e) => {
        var top = e.getBoundingClientRect().top;
        if (top < window.innerHeight - 300) {
          e.classList.add('fade-in-left');
        }
      });

      aniRightTitles.forEach((e) => {
        var top = e.getBoundingClientRect().top;
        if (top < window.innerHeight - 300) {
          e.classList.add('fade-in-right');
        }
      });
    });
  });

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
        <Projects locale={locale} />
        <Resume />
        <ContactSection />
      </div>
    </div>
  );
}

export default V2content;
