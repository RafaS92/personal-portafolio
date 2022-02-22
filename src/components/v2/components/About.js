import React from 'react';
import './About.css';
import translate from '../i18n/translate';
function About() {
  return (
    <section id='About-v2' className='About-sec'>
      <div className='About-content'>
        <div className='about-img initial-opacity' data-aos='fade-right'>
          <img
            alt=''
            src='https://www.zeldadungeon.net/wiki/images/thumb/f/fd/Link.png/400px-Link.png'
          />
        </div>
        <div className='about-text' data-aos='fade-up'>
          <h1 className='about-title'>{translate('title1')}</h1>
          <p>{translate('aboutd1')}</p>

          <p>{translate('aboutd2')}</p>

          <p>{translate('aboutd3')}</p>

          <div className='facts-section'>
            <div className='about-info'>
              <div>
                <strong>{translate('aboutedu')}</strong>
                <ul className='ul margin-top'>
                  <li>{translate('aboutsc1')}</li>
                  <li>{translate('aboutsc2')}</li>
                  <li>{translate('aboutsc3')}</li>
                </ul>
              </div>

              <div>
                <strong>{translate('abouthob')}</strong>
                <ul className='ul ul-grid margin-top'>
                  <div>
                    <li>Tae Kwon Do</li>
                    <li>{translate('aboutp1')}</li>
                    <li>{translate('aboutp2')}</li>
                  </div>

                  <div>
                    <li>{translate('aboutp3')}</li>
                    <li>{translate('aboutp4')}</li>
                  </div>
                </ul>
              </div>
            </div>

            <div className='about-tech'>
              <strong className='ul-grid'>{translate('abouttech')}</strong>
              <ul className='ul ul-grid margin-top'>
                <div>
                  <li>JavaScript</li>
                  <li>React</li>
                  <li>C#</li>
                </div>
                <div>
                  <li>.NET Framework</li>
                  <li>React Native</li>
                </div>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;
