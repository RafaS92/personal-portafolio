import React, { useState, useEffect } from 'react';
import * as skillsData from '../../../data/skillsV2.json';
import Dropdown from './shareComponents/Dropdown';
import Test from './shareComponents/Test';
// import { makeStyles, Typography } from '@material-ui/core';
import './skills.css';
// import zIndex from '@material-ui/core/styles/zIndex';

function Skills() {
  const [selected, setSelected] = useState('All');

  let groupOfSkills = skillsData.skills.filter(
    (e) => e.title === `${selected}`
  );
  let skillsIcons = groupOfSkills.map((e) => e.icons);
  let arrayOfIcons = skillsIcons[0];

  return (
    <section className='' id='skills-v2'>
      <Dropdown selected={selected} setSelected={setSelected} />
      <div className='skills__container-v2'>
        {arrayOfIcons?.map((icon) => (
          <div className='icon-img-container'>
            <img src={`/images/logos/${icon}`} alt='' className='icon-img' />
          </div>
        ))}
      </div>
    </section>
  );
}

export default Skills;
