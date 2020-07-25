import React, { Component } from "react";
import { Jumbotron, Container } from "react-bootstrap";
import Jumbotronimg from "./Jumbotronimg";
import About from "./About";

class Principal extends Component {
  render() {
    return (
      <div>
        <Jumbotronimg />
        <About />
      </div>
    );
  }
}

export default Principal;
