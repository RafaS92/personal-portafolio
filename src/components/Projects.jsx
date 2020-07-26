import React, { Component } from "react";
import { Jumbotron, Container, Row, Col } from "react-bootstrap";

class Projects extends Component {
  render() {
    return (
      <div>
        <Jumbotron className="Jumbotron-projects" fluid>
          <Container>
            <h1 className="PTitle">My Projects</h1>
            <Row>
              <Col className="mr-5">
                <div class="card">
                  <div class="card-image"></div>
                  <div class="card-text">
                    <h2>Pet Life</h2>
                    <p>
                      Pet Life is a webpage business of a pet care where users
                      can book a visit, check the services, locations,
                      information and join to the community of the Pet Life.
                    </p>
                  </div>
                  <div class="card-stats">
                    <div class="stat">
                      <div class="value">
                        <i class="fab fa-youtube" />
                      </div>
                      DEMO
                    </div>

                    <div class="stat">
                      <div class="value">
                        <i class="fab fa-github"></i>
                      </div>
                      <div class="type">Code</div>
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
                      Shoptastic is an e-commerce page where user can look for
                      products, categories of products, see the locations
                      available in every city of U.S, they can add products to
                      their carts and checkout.
                    </p>
                  </div>
                  <div class="card-stats2">
                    <div class="stat">
                      <div class="value">
                        <i class="fab fa-youtube" />
                      </div>
                      DEMO
                    </div>

                    <div class="stat">
                      <div class="value">
                        <i class="fab fa-github"></i>
                      </div>
                      <div class="type">Code</div>
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
                      Vidly is an application where Users can find different
                      list of movies, the main propose of this app was extend my
                      skills in authentication, validation, and other security
                      measures in real app applications.
                    </p>
                  </div>
                  <div class="card-stats3">
                    <div class="stat">
                      <div class="value">
                        <i class="fab fa-youtube" />
                      </div>
                      DEMO
                    </div>

                    <div class="stat">
                      <div class="value">
                        <i class="fab fa-github"></i>
                      </div>
                      <div class="type">Code</div>
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
