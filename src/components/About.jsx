import React, { Component } from "react";
import { Jumbotron, Container } from "react-bootstrap";

class About extends Component {
  render() {
    return (
      <div>
        <Jumbotron className="Jumbotron4" fluid>
          <Container>
            <div className="row row-cols-2 row-cols-md-2">
              <div className="col mb-2 ">
                <img
                  src="https://www.thearkspa.com/images/content/img_9193-g626xx.jpg"
                  className="img-jumbotron2"
                  alt=""
                />
              </div>
              <div className="col mb-2 ">
                <p className="text4">
                  If you'll be traveling in the near future, now is a good time
                  to start thinking about how you'll make sure your pets are
                  taken care of while you're away. One of the most common
                  choices pet owners make is that of boarding their pets at our
                  facilities in Houston while they're gone. This way, they can
                  rest assured that their pets are fed, played with, and taken
                  care of daily.
                </p>
              </div>
            </div>
          </Container>
        </Jumbotron>
      </div>
    );
  }
}

export default About;
