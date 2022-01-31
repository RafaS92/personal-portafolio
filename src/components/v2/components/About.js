import React from 'react';
import './About.css';
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
        <p>
          I am passionate about building & designing thoughtful experiences to
          make sure users are satisfied when using products and services online.
        </p>
        <p>
          Technology has always been my passion and hobby since my early
          childhood. Even though I studied business management, I learned to
          code on my own out of curiosity.
        </p>
        <p>
          I enjoy the challenge of solving complex customer problems and
          planning the user experience from the ground up, from research and
          discovery through to visual designs.
        </p>
        <div className='facts-section'>
          <div className='about-info'>
            <div>
              <strong>Education:</strong>
              <ul className='ul margin-top'>
                <li>
                  Flatiron School Full Stack Web Development Houston, Texas
                </li>
                <li>
                  B.A.Business Administration(UASLP) San Luis Potosi,Mexico
                </li>
                <li> B.A. International Business(UV) Valparaíso, Chile</li>
              </ul>
            </div>

            <div>
              <strong>Hobbies:</strong>
              <ul className='ul ul-grid margin-top'>
                <div>
                  <li>Tae Kwon Do</li>
                  <li>Cooking</li>
                  <li>Travelling</li>
                </div>

                <div>
                  <li>Technology</li>
                  <li>Videogames</li>
                </div>
              </ul>
            </div>
          </div>

          <div className='about-tech'>
            <strong className='ul-grid margin-top'>
              Couple technologies I’ve been working with recently:
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
