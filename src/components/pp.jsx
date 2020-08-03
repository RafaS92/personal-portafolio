import React, { Component } from "react";
import { Link } from "react-scroll";
import { Navbar } from "react-bootstrap";

class Navigation extends Component {
  render() {
    return (
      <div>
        <nav className="navbar fixed-top navbar-expand-md navbar-dark scrolling-navbar">
          <a className="navbar-brand" href="#begining">
            {" "}
            <strong>Rafael Valdez</strong>
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse : other"
            data-target="#Sticky-nav"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="Sticky-nav">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item">
                <a href="#skills" className="nav-link active">
                  Skills
                </a>
              </li>

              <li className="nav-item">
                <a href="#projects" className="nav-link">
                  Projects
                </a>
              </li>

              <li className="nav-item">
                <a href="#contact" className="nav-link">
                  Contact
                </a>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    );
  }
}

export default Navigation;
