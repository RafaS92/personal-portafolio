import React, { Component } from "react";
import { Navbar, Nav } from "react-bootstrap";

class Navigation extends Component {
  render() {
    return (
      <div>
        <Navbar
          collapseOnSelect
          expand="lg"
          bg="dark"
          variant="dark"
          className="navbar"
          fixed="top"
        >
          <Navbar.Brand></Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="links">
              <a href="#about" className="main-link">
                ABOUT
              </a>
              <a href="#skills">SKILLS</a>
              <a href="#projects">PROJECTS</a>
              <a href="#contact">CONTACT</a>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </div>
    );
  }
}

export default Navigation;
