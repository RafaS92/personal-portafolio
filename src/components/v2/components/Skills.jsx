import React, { useState } from 'react';
import * as skillsData from "../../../data/skillsV2.json";
import { makeStyles, Typography } from '@material-ui/core';
import './skills.css';

const useStyles = makeStyles((theme) => ({
  containerSkills: {
    backgroundColor: "rgb(202, 205, 211)",
    borderRadius: "30px",
    flex: "1 1 50%",
    boxShadow: `0 2px 20px 0 ${theme.palette.text.bright}`,
    height: "max-content"
  },
  headerSkills:{
    display: "flex",
    alignItems: "center",
    cursor: "pointer",
    backgroundColor: `${theme.palette.background.container}`,
    borderRadius: "30px 15px 100px 30px",
    paddingLeft:'16px',

    "& h1": {
      paddingLeft:'12px'
    }
  },
  skillsArrow:{
    marginLeft: "auto",
    fontSize: "1.8rem",

  },
  arrowBtn:{
  alignSelf: "flex-start",
  marginLeft: "auto",
  marginRight:"12px",
  color:`${theme.palette.primary.main}`,
  '&:focus':{
    outline: "none"
  }
  }

}));  


function Skills() {
  const classes = useStyles();
  const [open, setOpen] = useState({
      activeObject:null,
      objects:skillsData.skills
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
         className={`${classes.containerSkills} ${
           toggleActiveStyles(index)
          }`}
        >
          <div className={`${classes.headerSkills}`}>
            <i className='fas fa-code'></i>
            <div>
              <h1 className='skills__titles'>{elements.title}</h1>
            </div>
            <button className={`${classes.arrowBtn} skills__arrow`} onClick={() => setOpen(!open)}>
              <i className={`fas fa-chevron-down`}></i>
            </button>
          </div>
          <div className='skills__list'>
             {elements.icons?.map((icon)=>(
              <img src={`/images/logos/${icon}`} className="icon-img"/>
            ))} 
            {console.log(elements.icons)}
          </div>
        </div>
    ))}
      </div>
    </section>
  );
}

export default Skills;
