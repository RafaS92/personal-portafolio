import React, { Component } from "react";
import { makeStyles, Typography } from '@material-ui/core';
import * as projectsData from "../../../data/projectsData.json";
import "./Projects.css"


const useStyles = makeStyles((theme) => ({
    card: {
      color: `${theme.palette.primary.main}`,
      borderRadius: "30px",
      flex: "1 1 50%",
      height: "max-content"
    }
  
  }));  


function Projects() {
    const classes = useStyles();
    return (
        <div className="projects-section">
         <h1  data-text="Projects">
            Projects
          </h1>
          <div className="project-container" >
             {projectsData.features.map((project) => (
               <div key={project.key}>
                <div className={`${classes.card}`} style={{backgroundImage: `url(${project.imgUrl})`}}>
                <h2 class="card-title">{project.title}</h2>
                <p className="card-body">{project.description}</p>
                <a href="#" class="project-button">Learn More</a>
              
               </div>
               </div>
             ))}
            
          </div>
        </div>
    );
}
export default Projects;
