import React, { Component } from "react";
import { Jumbotron, Container, Row } from "react-bootstrap";

class ResumeJumbotron extends Component {
  render() {
    return (
      <div>
        <Jumbotron className="Jumbotron-resume" fluid>
          <Container className="resume-container">
            <Row>
              <div className="text-resume">
                <h1>
                  Check Out My LinkedIn!
                  <p>Resume,education,interests and more...</p>
                </h1>
              </div>
            </Row>
            <Row>
              <a href="https://www.linkedin.com/in/rafael-salvador-valdez/">
                <img
                  className="LikedIn-img"
                  src="/images/LinkedIn.jpeg"
                  alt=""
                />
              </a>
            </Row>
          </Container>
        </Jumbotron>
      </div>
    );
  }
}

export default ResumeJumbotron;
