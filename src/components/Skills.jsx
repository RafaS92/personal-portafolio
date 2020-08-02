import React, { Component } from "react";
import { Container, Row, Col, Jumbotron } from "react-bootstrap";

class Skills extends Component {
  render() {
    return (
      <div id="skills">
        <Jumbotron className="Jumbotron-skills" fluid>
          <h3 className="text-Jumbotron-skills">
            Technologies I am proficent with:
          </h3>
          <Container className="skills-container">
            <Col>
              <img
                src="images/js-logo.png"
                className="image-jumbotron-skills "
                alt=""
              />
            </Col>
            <Col>
              <img
                src="images/CSS3_logo_and_wordmark.svg.png"
                className="image-jumbotron-skills "
                alt=""
              />
            </Col>
            <Col>
              <img
                src="images/HTML.png"
                className="image-jumbotron-skills "
                alt=""
              />
            </Col>
            <Col>
              <img
                src="images/REACT.png"
                className="image-jumbotron-skills "
                alt=""
              />
            </Col>

            <Col>
              <img
                src="images/SQL.png"
                className="image-jumbotron-skills "
                alt=""
              />
            </Col>
            <Col>
              <img
                src="images/Node.png"
                className="image-jumbotron-skills "
                alt=""
              />
            </Col>
            <Col>
              <img
                src="images/mongodb-226029.png"
                className="image-jumbotron-skills "
                alt=""
              />
            </Col>
            <Col>
              <img
                src="images/Redux.png"
                className="image-jumbotron-skills "
                alt=""
              />
            </Col>

            <Col>
              <img
                src="images/github_PNG20.png"
                className="image-jumbotron-skills "
                alt=""
              />
            </Col>
            <Col>
              <img
                src="images/Bootstrap-Logo.png"
                className="image-jumbotron-skills "
                alt=""
              />
            </Col>
            <Col>
              <img
                src="images/jQuery.png"
                className="image-jumbotron-skills "
                alt=""
              />
            </Col>
            <Col>
              <img
                src="images/Ruby-on-rails-development.png"
                className="image-jumbotron-skills "
                alt=""
              />
            </Col>
          </Container>
        </Jumbotron>
      </div>
    );
  }
}

export default Skills;
