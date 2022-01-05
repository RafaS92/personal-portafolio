import React, { Component } from 'react';
import * as projectsData from '../../data/projectsData.json';

class Projects extends Component {
  render() {
    return (
      <div id='projects'>
        <div className='Jumbotron-projects'>
          <h1 className='PTitle' data-text='Projects'>
            Projects
          </h1>
          <div className='projects-container'>
            {projectsData.features.map((project) => (
              <div key={project.key}>
                <div className='cards'>
                  <div className='img-container'>
                    <img className='img-projects' src={project.imgUrl} />
                  </div>
                  <div className='card-text'>
                    <h2>{project.title}</h2>
                    <p>{project.description}</p>
                  </div>
                  <div className={project.stats}>
                    <div className='stat'>
                      <a href={project.youtube}>
                        <div className='value'>
                          <i className='fab fa-youtube' />
                        </div>
                        DEMO
                      </a>
                    </div>
                    <div className='stat'>
                      <a href={project.github}>
                        <div className='value'>
                          <i className='fab fa-github'></i>
                        </div>
                        <div className='type'>CODE</div>
                      </a>
                    </div>
                    {project.website ? (
                      <div className='stat'>
                        <a href={project.website}>
                          <div className='value'>
                            <i className='fas fa-globe'></i>
                          </div>
                          WEBSITE
                        </a>
                      </div>
                    ) : null}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
}
export default Projects;
