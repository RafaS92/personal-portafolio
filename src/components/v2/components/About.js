import React from 'react';
import './About.css';
import translate from '../i18n/translate';
function About() {
  return (
    <div className='About-sec'>
      <div className='about-img'>
        <img
          alt=''
          src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQYtEATVFGTQVfh_l3nL-ZnoL9jPBpeBXrIFQ&usqp=CAU'
        />
      </div>
      <div className='about-text'>
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
            <strong className='ul-grid margin-top'>
              {translate('abouttech')}
            </strong>
            <ul className='ul ul-grid'>
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
  );
}

export default About;
