import React, { Component } from "react";
import { Link } from "react-scroll";
import Projects from "./Projects";
import Contact from "./Contact";

class Navigation extends Component {
  render() {
    return (
      <div>
        <Link
          activeClass="active"
          to="skills"
          spy={true}
          smooth={true}
          offset={-70}
          duration={500}
        >
          Experience
        </Link>
        <Link
          activeClass="active"
          to="projects"
          spy={true}
          smooth={true}
          offset={-70}
          duration={500}
        >
          Projects
        </Link>
        <Link
          activeClass="active"
          to="contact"
          spy={true}
          smooth={true}
          offset={-70}
          duration={500}
        >
          Contact
        </Link>
      </div>
    );
  }
}

export default Navigation;
