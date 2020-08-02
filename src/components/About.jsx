import React, { Component } from "react";
import { Jumbotron, Container, Row, Col } from "react-bootstrap";

class About extends Component {
  render() {
    return (
      <div>
        <Jumbotron className="Jumbotron-about" fluid>
          <Container>
            <Row>
              <Col>
                <img
                  src="/images/talk.png"
                  className="img-jumbotron-about2"
                  alt=""
                />
              </Col>
              <Col>
                <img
                  src="/images/Rafav6.png"
                  className="img-jumbotron-about"
                  alt=""
                />
              </Col>
              <Col>
                <div className="text-about">
                  <p>
                    Since I first learned to code, I have strived to learn more
                    about it in order to serve others in solving practical
                    problems. I am a proactive, committed, and hardworking Stack
                    Web Developer looking for opportunities for growth and
                    innovation. What started with a “Hello World”, developed
                    into a full-fledged passion.
                  </p>
                  <p>
                    My strengths are my ability to learn new skills and
                    programming languages quickly, adaptability, problem
                    solving, and web design. I am proficient in JavaScript,
                    React.Js, Ruby on Rails, Redux, MongoDB, Node.Js, JQuery,
                    Bootstrap, Sql, CSS3, HTML5,Git/ Github.
                  </p>
                  <p>
                    Areas of expertise: developing front-end website
                    architecture, designing user interactions on web pages,
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
