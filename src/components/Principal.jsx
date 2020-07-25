import React, { Component } from "react";
import { Jumbotron, Container } from "react-bootstrap";
import Jumbotronimg from "./Jumbotronimg";
import About from "./About";
import Skills from "./Skills";

class Principal extends Component {
  render() {
    return (
      <div>
        <Jumbotronimg />
        <About />
        <Skills />
      </div>
    );
  }
}

export default Principal;
