import React, { useContext } from 'react';
import * as projectsData from '../../../data/projectsData.json';
import './Projects.css';
import StatsContainer from './StatsContainer';
import AppContext from './context/AppContext';

function Projects() {
  const contextData = useContext(AppContext);
  let darkmode = contextData.darkmode.darkTheme;
  return (
    <div className='projects-section'>
      <h1 className='projects-title'>Projects</h1>
      <div className='project-container'>
        {projectsData.features.map((project) => (
          <div
            className='cardv2'
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
