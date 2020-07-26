import React, { Component } from "react";
import Jumbotronimg from "./Jumbotronimg";
import About from "./About";
import Skills from "./Skills";
import ResumeJumbotron from "./ResumeJumbotron";
import Projects from "./Projects";

class Principal extends Component {
  render() {
    return (
      <div>
        <Jumbotronimg />
        <About />
        <Skills />
        <ResumeJumbotron />
        <Projects />
      </div>
    );
  }
}

export default Principal;
