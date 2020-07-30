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
                <div class="card">
                  <div class="card-image"></div>
                  <div class="card-text">
                    <h2>Pet Life</h2>
                    <p>
                      Pet Life is a webpage business of a pet care where users
                      can book a visit, check the services, locations,
                      information and join to the community.
                    </p>
                  </div>
                  <div class="card-stats">
                    <div class="stat">
                      <a href="https://www.youtube.com/watch?v=MgNTv3fzBhc&t=30s">
                        <div class="value">
                          <i class="fab fa-youtube" />
                        </div>
                        DEMO
                      </a>
                    </div>

                    <div class="stat">
                      <a href="https://github.com/RafaS92/PetLife">
                        <div class="value">
                          <i class="fab fa-github"></i>
                        </div>
                        <div class="type">Code</div>
                      </a>
                    </div>
                  </div>
                </div>
              </Col>
              <Col className="ml-5 mr-5">
                <div class="card">
                  <div class="card-image2"></div>
                  <div class="card-text">
                    <h2>Shoptastic</h2>
                    <p>
                      Shoptastic is an e-commerce page where users can look for
                      products, categories of products, see the locations
                      available in every city of U.S, they can add products to
                      their carts and checkout.
                    </p>
                  </div>
                  <div class="card-stats2">
                    <div class="stat">
                      <a href="https://www.youtube.com/watch?v=0QbrqZUcKH8&t=81s">
                        <div class="value">
                          <i class="fab fa-youtube" />
                        </div>
                        DEMO
                      </a>
                    </div>

                    <div class="stat">
                      <a href="https://github.com/isaac-3/Shop-Mod4-React-Project">
                        <div class="value">
                          <i class="fab fa-github"></i>
                        </div>
                        <div class="type">Code</div>
                      </a>
                    </div>
                  </div>
                </div>
              </Col>
              <Col className="ml-5">
                <div class="card">
                  <div class="card-image3"></div>
                  <div class="card-text">
                    <h2>Vidly</h2>
                    <p>
                      Vidly is an application where users can find different
                      list of movies, the main propose of this app was extend my
                      skills in authentication, validation, and other security
                      measures in real app applications.
                    </p>
                  </div>
                  <div class="card-stats3">
                    <div class="stat">
                      <a href="https://www.youtube.com/watch?v=gwuazsgxTTk">
                        <div class="value">
                          <i class="fab fa-youtube" />
                        </div>
                        DEMO
                      </a>
                    </div>

                    <div class="stat">
                      <a href="https://github.com/RafaS92/vidly">
                        <div class="value">
                          <i class="fab fa-github"></i>
                        </div>
                        <div class="type">Code</div>
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
