import React, { Component } from "react";

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
        <div className="Jumbotron-contact">
          <h1 className="contact-title">Get In Touch</h1>
          <div className="contact-container">
            <div className="info">
              <div>
                <i className="fas fa-map-marker-alt fa-1x" />
                <p> Texas City, Texas 77591</p>

                <br />
              </div>
              <div>
                <i className="fas fa-phone fa-1x" />
                <p> (832)-920-0685</p>

                <br />
              </div>
              <div>
                <br />
                <i className="fas fa-envelope-square"></i>
                <p> rvaldezdev.2020@gmail.com</p>
              </div>
            </div>
            <div>
              <div className="form">
                <form>
                  <input type="hidden" name="form-name" value="contact" />
                  <div className="fields">
                    <div className="field half">
                      <label htmlFor="name">Name</label>
                      <input
                        type="text"
                        name="name"
                        id="name"
                        placeholder="Jane Doe"
                        disabled
                      />
                    </div>
                    <div className="field half">
                      <label htmlFor="email">Email</label>
                      <input
                        type="email"
                        name="email"
                        id="email"
                        placeholder="jane@untitled.tld"
                        disabled
                      />
                    </div>
                    <div className="field">
                      <label htmlFor="message">Message</label>
                      <textarea
                        disabled
                        name="message"
                        id="message"
                        placeholder="This form has been disabled due to the persistent receipt of annoying spam on a daily basis. I apologize for any inconvenience."
                        rows="6"
                        onChange={(e) => this.handleChange(e)}
                      ></textarea>
                    </div>
                  </div>
                  <div className="field">
                    <input
                      type="button"
                      value="Send Message"
                      className="primary"
                      disabled
                    />
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Contact;
