import React, { Component } from "react";
import { Jumbotron, Container, Row, Col } from "react-bootstrap";

class Contact extends Component {
  state = {
    name: "",
    email: "",
    image: "",
  };

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  clearForm = (e) => {
    e.preventDefault();
    this.props.form(this.state);
    this.setState({
      username: "",
      text: "",
      image: "",
    });
  };

  render() {
    return (
      <div id="contact">
        <Jumbotron className="Jumbotron-contact" fluid>
          <Container>
            <h1 className="contact-title">Get In Touch</h1>

            <Row>
              <Col xs={5} className="info">
                <div>
                  <i className="fas fa-map-marker-alt fa-1x" />
                  <span> 6130 Lago Mar Blvd,Apt2104</span>
                  <p>Texas City, Texas 77591</p>
                  <br />
                  <br />
                </div>
                <div>
                  <i class="fas fa-phone fa-1x" />
                  <span> (832)-920-0685</span>
                  <br />
                  <br />
                </div>
                <div>
                  <br />
                  <i class="fas fa-envelope-square"></i>
                  <span> rvaldezdev.2020@gmail.com</span>
                </div>
              </Col>
              <Col xs={7}>
                <div className="form">
                  <form method="post" action="POST" data-netlify="true">
                    <div className="fields">
                      <div className="field half">
                        <label for="name">Name</label>
                        <input
                          type="text"
                          name="name"
                          id="name"
                          placeholder="Jane Doe"
                          onChange={(e) => this.handleChange(e)}
                        />
                      </div>
                      <div className="field half">
                        <label for="email">Email</label>
                        <input
                          type="email"
                          name="email"
                          id="email"
                          placeholder="jane@untitled.tld"
                          onChange={(e) => this.handleChange(e)}
                        />
                      </div>
                      <div className="field">
                        <label for="message">Message</label>
                        <textarea
                          name="message"
                          id="message"
                          placeholder="Enter your message"
                          rows="6"
                          onChange={(e) => this.handleChange(e)}
                        ></textarea>
                      </div>
                      <div className="field">
                        <label for="message">Message</label>
                        <input
                          type="file"
                          name="myfile"
                          id="myfile"
                          placeholder="Upload file"
                          rows="6"
                          onChange={(e) => this.handleChange(e)}
                        />
                      </div>
                      <div className="file">
                        <div data-netlify-recaptcha="true"></div>
                      </div>
                    </div>
                    <input
                      type="submit"
                      value="Send Message"
                      className="primary"
                    />
                  </form>
                </div>
              </Col>
            </Row>
          </Container>
        </Jumbotron>
      </div>
    );
  }
}

export default Contact;
