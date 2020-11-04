import React, { Component } from "react";
import { Jumbotron, Container, Row, Col } from "react-bootstrap";

class About extends Component {
  render() {
    return (
      <div>
        <Jumbotron className="Jumbotron-about" id="about" fluid>
          <Container>
            <Row className="about-container">
              <Col>
                <img
                  src="/images/Rafav5.png"
                  className="img-jumbotron-about"
                  alt=""
                />
              </Col>
              <Col>
                <div className="text-about">
                  <p>
                    Since I first learned to code, I have strived to learn more
                    about it in order to serve others in solving practical
                    problems. I am a proactive, committed, and hardworking Full
                    Stack Web Developer looking for opportunities for growth and
                    innovation. What started with a “Hello World”, developed
                    into a full-fledged passion.
                  </p>
                  <p>
                    My strengths are my ability to learn new skills and
                    programming languages quickly, adaptability,
                    problem-solving, and web design. I am proficient in
                    JavaScript, React.Js,React Native, Ruby on Rails, Redux, Node.Js, JQuery,
                    Bootstrap, SQL, CSS3, HTML5, Git/ Github.
                  </p>
                  <p>
                    Expertise areas: Developing front-end website architecture,
                    designing user interactions on web pages, developing back
                    end website applications, creating servers and databases for
                    functionality, ensuring responsiveness of applications,
                    maintaining code integrity and organization.
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
