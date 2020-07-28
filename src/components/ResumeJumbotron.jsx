import React, { Component } from "react";
import { Jumbotron, Container, Button } from "react-bootstrap";

class ResumeJumbotron extends Component {
  render() {
    return (
      <div>
        <Jumbotron className="Jumbotron-resume" fluid>
          <Container>
            <h1 className="text-resume">
              Check Out My LinkedIn!
              <div>Resume,education,interests and more...</div>
            </h1>

            <a href="https://www.linkedin.com/in/rafael-salvador-valdez/">
              <img className="LikedIn-img" src="/images/LinkedIn.jpeg" />
            </a>
          </Container>
        </Jumbotron>
      </div>
    );
  }
}

export default ResumeJumbotron;
