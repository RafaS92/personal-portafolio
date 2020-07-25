import { Link, NavLink } from "react-router-dom";
import React, { Component } from "react";
import { Nav, Navbar } from "react-bootstrap";

class Navigation extends Component {
  render() {
    return (
      <div>
        <Navbar bg="dark" variant="green">
          <Navbar.Brand href="principal" className="title1">
            RAFAEL VALDEZ
          </Navbar.Brand>
          <Nav className="ml-auto title2">
            <Nav.Link className="title2" href="#home">
              EXPERIENCE
            </Nav.Link>
            <Nav.Link className="title2" href="#features">
              WORK
            </Nav.Link>
            <Nav.Link className="title2" href="#pricing">
              CONTACT
            </Nav.Link>
          </Nav>
        </Navbar>
      </div>
    );
  }
}

export default Navigation;
