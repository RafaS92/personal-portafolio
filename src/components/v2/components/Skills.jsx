import React, { useState, useContext, useEffect } from 'react';
import * as skillsData from '../../../data/skillsV2.json';
import Dropdown from './shareComponents/Dropdown';
import './skills.css';
import AppContext from './context/AppContext';

function Skills() {
  const [selected, setSelected] = useState('All');
  const [addAnimation, setAddAnimation] = useState('');

  const contextData = useContext(AppContext);
  let darkmode = contextData.darkmode.darkTheme;

  let groupOfSkills = skillsData.skills.filter(
    (e) => e.title === `${selected}`
  );
  let skillsIcons = groupOfSkills.map((e) => e.icons);
  let arraySkills = skillsIcons[0];

  function addAnimationIcons() {
    setAddAnimation('animation');
    setTimeout(() => {
      setAddAnimation('');
    }, 1500);
  }

  useEffect(() => {
    addAnimationIcons();
  }, [selected]);

  return (
    <section id='skills-v2'>
      <h1 className='skills-title'>Skills</h1>
      <Dropdown selected={selected} setSelected={setSelected} />
      <div
        className={
          darkmode ? 'skills__container-v2' : 'skills__container-v2-white'
        }
      >
        {arraySkills?.map((icon) => (
          <div key={icon} className={`icon-img-container ${addAnimation}`}>
            <img src={`/images/logos/${icon}`} alt='' className='icon-img ' />
          </div>
        ))}
      </div>
    </section>
  );
}

export default Skills;
