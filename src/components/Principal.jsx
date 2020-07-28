import React, { Component } from "react";
import Jumbotronimg from "./Jumbotronimg";
import About from "./About";
import Skills from "./Skills";
import ResumeJumbotron from "./ResumeJumbotron";
import Projects from "./Projects";
import Contact from "./Contact";

class Principal extends Component {
  render() {
    return (
      <div>
        <Jumbotronimg />
        <About />
        <Skills />
        <Projects />
        <ResumeJumbotron />
        <Contact />
      </div>
    );
  }
}

export default Principal;
