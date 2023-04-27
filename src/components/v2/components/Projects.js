import React, { useContext, useState, useEffect } from 'react';
import * as projectsData from '../../../data/projectsData.json';
import './Projects.css';
import StatsContainer from './StatsContainer';
import AppContext from './context/AppContext';
import DropdownProjects from './shareComponents/DropdownProjects';
import translate from '../i18n/translate';

function Projects({ locale }) {
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
    <section
      id='Projects-v2'
      className='projects-section'
    >
      <h1 className='projects-title' data-aos='fade-left'>
        {translate('title4')}
      </h1>
      <DropdownProjects selected={selected} setSelected={setSelected} />
      <h3 className='swipe-text'>
        Swipe Right!
        <i className='fas fa-solid fa-arrow-right icon-style sw-icon'></i>
      </h3>
      <div className='project-scroll'>
        <i class='fa-solid fa-right-long' />
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
                  className={
                    darkmode ? 'card-body-text' : 'card-body-text-white'
                  }
                >
                  {locale ? project.description : project.descriptionspa}
                </p>
                <StatsContainer
                  github={project.github}
                  website={project.website}
                  youtube={project.youtube}
                  document={project.document}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
export default Projects;
