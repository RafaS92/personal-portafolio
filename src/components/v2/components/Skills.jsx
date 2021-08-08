import React from 'react';
import "./skills.css"

function Skills() {
  return (
    <section className='skills section' id='skills'>
      <h2 className='section__title'>Skills</h2>
      <span className='section__subtitle'>My technical leve</span>


         {/* this is the 3 */}
      <div className='skills__container container grid'>
        <div>
          <div className='skills__content'>
            <div className='skills__header'>
              <i className='fas fa-code'></i>
              <div>
                <h1 className='skills__title'>Esto funciona perro</h1>
              </div>
              <i class="fas fa-chevron-down"></i>
            </div>

            <div className="skills_list grid" >
            <div className="skills__data">
            <div className="skills__titles">
                <h3 className="skills__name">HTML</h3>
                <span className="skills__number">90%</span>
            </div>
            <div className="skills__bar">
                <span className="skills__percentage skills_html"></span>
            </div>
            </div>

            </div>
          </div>

             {/* this is the 2 */}
          <div className='skills__content'>
            <div className='skills__header'>
              <i className='fas fa-code'></i>
              <div>
                <h1 className='skills__title'>Yeah</h1>
              </div>
              <i class="fas fa-chevron-down"></i>
            </div>

            <div className="skills_list grid" >
            <div className="skills__data">
            <div className="skills__titles">
                <h3 className="skills__name">HTML</h3>
                <span className="skills__number">90%</span>
            </div>
            <div className="skills__bar">
                <span className="skills__percentage skills_html"></span>
            </div>
            </div>

            </div>
          </div>

            {/* this is the 3 */}
          <div className='skills__content'>
            <div className='skills__header'>
              <i className='fas fa-code'></i>
              <div>
                <h1 className='skills__title'>ME la pelas</h1>
              </div>
              <i class="fas fa-chevron-down"></i>
            </div>

            <div className="skills_list grid" >
            <div className="skills__data">
            <div className="skills__titles">
                <h3 className="skills__name">HTML</h3>
                <span className="skills__number">90%</span>
            </div>
            <div className="skills__bar">
                <span className="skills__percentage skills_html"></span>
            </div>
            </div>

            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Skills;
