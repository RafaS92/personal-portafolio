import React, { Component } from "react";
import { Jumbotron, Container, Button } from "react-bootstrap";

class ResumeJumbotron extends Component {
  render() {
    return (
      <div>
        <Jumbotron className="Jumbotron-resume" fluid>
          <Container>
            <h1 className="text-resume">Check Out My Resume!</h1>
            <Button variant="success" className="resume-button">
              Grab A Copy
            </Button>
          </Container>
        </Jumbotron>
      </div>
    );
  }
}

export default ResumeJumbotron;
