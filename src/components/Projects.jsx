import React, { Component } from "react";
import { Jumbotron, Container, Row, Col } from "react-bootstrap";

class Projects extends Component {
  render() {
    return (
      <div id="projects">
        <Jumbotron className="Jumbotron-projects" fluid>
          <Container>
            <h1 className="PTitle" data-text="Projects">
              Projects
            </h1>
            <Row>
              <Col className="mr-5">
                <div className="card">
                  <div className="card-image"></div>
                  <div className="card-text">
                    <h2>Pet Life</h2>
                    <p>
                      Pet Life is a webpage business of a pet care where users
                      can book a visit, check the services, locations,
                      information and join to the community.
                    </p>
                  </div>
                  <div className="card-stats">
                    <div className="stat">
                      <a href="https://www.youtube.com/watch?v=MgNTv3fzBhc&t=30s">
                        <div className="value">
                          <i className="fab fa-youtube" />
                        </div>
                        DEMO
                      </a>
                    </div>

                    <div className="stat">
                      <a href="https://github.com/RafaS92/PetLife">
                        <div className="value">
                          <i className="fab fa-github"></i>
                        </div>
                        <div className="type">Code</div>
                      </a>
                    </div>
                  </div>
                </div>
              </Col>
              <Col className="ml-5 mr-5">
                <div className="card">
                  <div className="card-image2"></div>
                  <div className="card-text">
                    <h2>Shoptastic</h2>
                    <p>
                      Shoptastic is an e-commerce page where users can look for
                      products, categories of products, see the locations
                      available in every city of U.S, they can add products to
                      their carts and checkout.
                    </p>
                  </div>
                  <div className="card-stats2">
                    <div className="stat">
                      <a href="https://www.youtube.com/watch?v=0QbrqZUcKH8&t=81s">
                        <div className="value">
                          <i className="fab fa-youtube" />
                        </div>
                        DEMO
                      </a>
                    </div>

                    <div className="stat">
                      <a href="https://github.com/isaac-3/Shop-Mod4-React-Project">
                        <div className="value">
                          <i className="fab fa-github"></i>
                        </div>
                        <div className="type">Code</div>
                      </a>
                    </div>
                  </div>
                </div>
              </Col>
              <Col className="ml-5">
                <div className="card">
                  <div className="card-image3"></div>
                  <div className="card-text">
                    <h2>Vidly</h2>
                    <p>
                      Vidly is an application where users can find different
                      list of movies, the main propose of this app was extend my
                      skills in authentication, validation, and other security
                      measures in real app applications.
                    </p>
                  </div>
                  <div className="card-stats3">
                    <div className="stat">
                      <a href="https://www.youtube.com/watch?v=gwuazsgxTTk">
                        <div className="value">
                          <i className="fab fa-youtube" />
                        </div>
                        DEMO
                      </a>
                    </div>

                    <div className="stat">
                      <a href="https://github.com/RafaS92/vidly">
                        <div className="value">
                          <i className="fab fa-github"></i>
                        </div>
                        <div className="type">Code</div>
                      </a>
                    </div>
                  </div>
                </div>
              </Col>
            </Row>
          </Container>
        </Jumbotron>
      </div>
    );
  }
}

export default Projects;
