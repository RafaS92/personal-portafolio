import React, { useState, useEffect } from 'react';
import * as skillsData from '../../../data/skillsV2.json';
import Dropdown from './shareComponents/Dropdown';
import Test from './shareComponents/Test';
// import { makeStyles, Typography } from '@material-ui/core';
import './skills.css';
// import zIndex from '@material-ui/core/styles/zIndex';

function Skills() {
  const [selected, setSelected] = useState('Frontend');

  let groupOfSkills = skillsData.skills.filter(
    (e) => e.title === `${selected}`
  );
  let skillsIcons = groupOfSkills.map((e) => e.icons);
  let arrayOfIcons = skillsIcons[0];

  return (
    <section className='' id='skills-v2'>
      <div className='skills__container-v2'>
        <Dropdown selected={selected} setSelected={setSelected} />
        <h1>{selected}</h1>
        {arrayOfIcons?.map((icon) => (
          <img
            style={{ width: '100px' }}
            src={`/images/logos/${icon}`}
            alt=''
          />
        ))}
      </div>
    </section>
  );
}

export default Skills;
