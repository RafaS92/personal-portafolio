import React, { Component } from "react";
import { makeStyles, Typography } from '@material-ui/core';
import * as projectsData from "../../../data/projectsData.json";
import "./Projects.css"


const useStyles = makeStyles((theme) => ({
    card: {
      color: `${theme.palette.primary.main}`,
      backgroudSize: "contain",
      padding:"10rem 0 0",
      borderRadius: "30px",
      flex: "1 1 50%",
      height: "max-content",
      maxWidth: "500px"
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
                <div className={`${classes.card}`}  key={project.key} style={{backgroundImage: `url(${project.imgUrl})`,backgroundSize:"cover"}}>
                <div className="card-content">
                <h2 class="card-title">{project.title}</h2>
                <p className="card-body">{project.description}</p>
                <button href="#" class="project-button">Learn More</button>
                </div>
               </div>
             ))}
            
          </div>
        </div>
    );
}
export default Projects;
