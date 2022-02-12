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
    contextData.setDarkmode({
      english: !contextData.darkmode.english
    });
  }, [locale]);

  const aniUpList = document.querySelectorAll('.ani-up');
  const aniLeftList = document.querySelectorAll('.ani-left');
  const aniRightList = document.querySelectorAll('.ani-right');

  // aniUpList.forEach((e) => {
  //   var top = e.getBoundingClientRect().top;
  //   if (top < window.innerHeight - 30) {
  //     e.classList.add('already-on-page');
  //   } else {
  //     e.classList.add('not-on-page');
  //   }
  // });

  useEffect(() => {
    window.addEventListener('scroll', () => {
      aniUpList.forEach((e) => {
        var top = e.getBoundingClientRect().top;
        if (top < window.innerHeight - 800) {
          e.classList.add('fade-in-up');
        }
      });

      aniLeftList.forEach((e) => {
        var top = e.getBoundingClientRect().top;
        if (top < window.innerHeight - 800) {
          e.classList.add('fade-in-left');
        }
      });

      aniRightList.forEach((e) => {
        var top = e.getBoundingClientRect().top;
        if (top < window.innerHeight - 800) {
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
        <Projects />
        <Resume />
        <ContactSection />
      </div>
    </div>
  );
}

export default V2content;
