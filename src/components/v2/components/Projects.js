import React, { useContext, useState, useEffect } from 'react';
import * as projectsData from '../../../data/projectsData.json';
import './Projects.css';
import StatsContainer from './StatsContainer';
import AppContext from './context/AppContext';
import DropdownProjects from './shareComponents/DropdownProjects';

function Projects() {
  const [selected, setSelected] = useState('All');
  const [addAnimation, setAddAnimation] = useState('');
  const contextData = useContext(AppContext);
  let darkmode = contextData.darkmode.darkTheme;
  let projects = projectsData.features;

  let groupOfprojects = projects.filter((e) =>
    e.category.includes(`${selected}`)
  );

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
    <div className='projects-section'>
      <h1 className='projects-title'>Projects</h1>
      <DropdownProjects selected={selected} setSelected={setSelected} />
      <div className='project-container'>
        {groupOfprojects?.map((project) => (
          <div
            className={`cardv2 ${addAnimation}`}
            key={project.key}
            style={{
              backgroundImage: `url(${
                project.imgUrlVertical ?? project.imgUrl
              })`,
              backgroundSize: `${project.size ?? 'contain'}`
            }}
          >
            <div className={darkmode ? 'card-content' : 'card-content-white'}>
              <h2 className={darkmode ? 'card-title' : 'card-title-white'}>
                {project.title}
              </h2>
              <p
                className={darkmode ? 'card-body-text' : 'card-body-text-white'}
              >
                {project.description}
              </p>
              <StatsContainer
                github={project.github}
                website={project.website}
                youtube={project.youtube}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
export default Projects;
