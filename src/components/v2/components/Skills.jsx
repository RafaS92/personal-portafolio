import React, { useState } from 'react';
import './skills.css';

function Skills() {
  const [open, setOpen] = useState({
      activeObject:null,
      objects:[{id:1},{id:2},{id:3},{id:4}]
  });
 

  function toggleActive(index){
      setOpen({...open, activeObject:open.objects[index]})
       console.log(open);
  }

  function toggleActiveStyles(index){
      if(open.objects[index] === open.activeObject){
          return 'skills__open';
      } else {
          return 'skills__close';
      }
  }

  return (
    <section className='skills section' id='skills'>
    <h2 className='section__title'>Skills</h2>
      <span className='section__subtitle'>My technical leve</span>
      <div className="skills__container">

      
    {open.objects.map((elements, index) =>(
        <div
        key={index}
        onClick={() => {toggleActive(index)}}
         className={`skills__content ${
           toggleActiveStyles(index)
          }`}
        >
          <div className='skills__header'>
            <i className='fas fa-code'></i>
            <div>
              <h1 className='skills__titles'>Esto funciona perro</h1>
            </div>
            <button onClick={() => setOpen(!open)}>
              <i class='fas fa-chevron-down skills__arrow'></i>
            </button>
          </div>
          <div className='skills__list'>
            <h2 className='skills__title'>Esto funciona perro</h2>
          </div>
        </div>
    ))}
      </div>
    </section>
  );
}

export default Skills;
