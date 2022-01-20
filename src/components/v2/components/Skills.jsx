import React, { useState } from 'react';
import * as skillsData from '../../../data/skillsV2.json';
import Dropdown from './shareComponents/Dropdown';
// import { makeStyles, Typography } from '@material-ui/core';
import './skills.css';
// import zIndex from '@material-ui/core/styles/zIndex';

function Skills() {
  const [selected, setSelected] = useState('All');

  const group = skillsData.skills.filter((e) => e.title === 'Backend');

  console.log('red');
  console.log(skillsData.skills);
  console.log(group);
  return (
    <section className='' id='skills-v2'>
      <div className='skills__container-v2'>
        <Dropdown selected={selected} setSelected={setSelected} />
        <h1>{selected}</h1>
      </div>
    </section>
  );
}

export default Skills;
