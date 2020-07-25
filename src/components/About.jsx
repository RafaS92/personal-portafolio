import React, { Component } from "react";
import { Jumbotron, Container, Row, Col } from "react-bootstrap";

class About extends Component {
  render() {
    return (
      <div>
        <Jumbotron className="Jumbotron-about" fluid>
          <Container>
            <Row>
              <Col sm={4}>
                <img
                  src="https://www.thearkspa.com/images/content/img_9193-g626xx.jpg"
                  className="img-jumbotron-about"
                  alt=""
                />
              </Col>
              <Col sm={8}>
                <div className="text-about">
                  <p>
                    First and foremost,I love to Code! is my passion! Since I
                    learned about coding, I have been motivated to learn
                    everyday more about it in order to solve practical problems
                    of people,even more launch my own web application .
                  </p>
                  <p>
                    I strongly believe that Software Engineers are the people
                    who most change the world,solving human problems to change
                    and improve lives of people around the world . I am a
                    Proactive, Hard-working and Passionate Full Stack Web
                    Developer. Looking for growth opportunities and try new
                    technologies. What started with a “Hello World” it turned
                    out in a full-fledged passion that gets more exciting
                    overtime flexibility and extraordinary commitment are core
                    to my person. I strongly believe that any goal is attainable
                    through responsibility, innovation, determination and
                    constant work.
                  </p>
                  <p>
                    Expertise: Developing front end website
                    architecture,designing user interactions on web pages,
                    developing back end website applications, creating servers
                    and databases for functionality, ensuring responsiveness of
                    applications, maintain code integrity and organization.
                  </p>
                </div>
              </Col>
            </Row>
          </Container>
        </Jumbotron>
      </div>
    );
  }
}

export default About;
