import React, { Component } from 'react';
import { makeStyles, Typography } from '@material-ui/core';
import * as projectsData from '../../../data/projectsData.json';
import './Projects.css';
import StatsContainer from './StatsContainer';

const useStyles = makeStyles((theme) => ({
  card: {
    color: `${theme.palette.primary.main}`,
    backgroudSize: 'cover',
    backgroundRepeat: 'no-repeat',
    padding: '10rem 0 0',
    borderRadius: '30px',
    flex: '1 1 50%',
    minHeight: '470px',
    maxWidth: '500px',
    overflow: 'hidden',
    transition: 'transform 2s ease',

    '&:hover, &:focus-within': {
      transform: 'scale(1.05)',

      '& .card-title::after': {
        transform: 'scaleX(1.2)'
      },
      '& .card-content': {
        transform: 'traslateY(0)',
        transition: 'height 400ms ease',
        height: '100%'
      },
      '& .card-content > *:not(.card-title)': {
        opacity: 1,
        transition: 'opacity 1s linear',
        transitionDelay: '200ms'
      }
    }
  }
}));

function Projects() {
  const classes = useStyles();

  return (
    <div className='projects-section'>
      <h1 data-text='Projects'>Projects</h1>
      <div className='project-container'>
        {projectsData.features.map((project) => (
          <div
            className={`${classes.card}`}
            key={project.key}
            style={{
              backgroundImage: `url(${
                project.imgUrlVertical ?? project.imgUrl
              })`,
              backgroundSize: `${project.size ?? 'contain'}`
            }}
          >
            <div className='card-content'>
              <h2 className='card-title'>{project.title}</h2>
              <p className='card-body-text'>{project.description}</p>
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
