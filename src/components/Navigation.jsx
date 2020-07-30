import React, { Component } from "react";
import { Link } from "react-scroll";
import { Navbar } from "react-bootstrap";

class Navigation extends Component {
  render() {
    return (
      <div>
        <Navbar bg="dark" variant="dark" fixed="top">
          <Navbar.Brand>
            <Link
              activeClass="active"
              to="begining"
              spy={true}
              smooth={true}
              offset={0}
              duration={500}
              href=""
            >
              RAFAEL VALDEZ
            </Link>
          </Navbar.Brand>
          <Link
            activeClass="active"
            to="skills"
            spy={true}
            smooth={true}
            offset={0}
            duration={500}
            className="title2"
            href=""
          >
            Experience
          </Link>
          <Link
            activeClass="active"
            to="projects"
            spy={true}
            smooth={true}
            offset={-18}
            duration={500}
            className="title3"
            href=""
          >
            Projects
          </Link>
          <Link
            activeClass="active"
            to="contact"
            spy={true}
            smooth={true}
            offset={0}
            duration={500}
            className="title3"
            href=""
          >
            Contact
          </Link>
        </Navbar>
      </div>
    );
  }
}

export default Navigation;
