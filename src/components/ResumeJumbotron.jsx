import React, { Component } from "react";
import { Jumbotron } from "react-bootstrap";

class ResumeJumbotron extends Component {
  render() {
    return (
      <div>
        <Jumbotron className="Jumbotron-resume" fluid>
          <div>
            <div className="resume-container">
              <div className="text-resume">
                <h1>
                  Check Out My LinkedIn!
                  <p>Resume, education, interests and more...</p>
                </h1>
              </div>
            </div>
            <div className="resumeIcons-container">
              <a href="https://www.linkedin.com/in/rafael-salvador-valdez/">
                <img
                  className="LikedIn-img"
                  src="/images/LinkedIn.jpeg"
                  alt=""
                />
              </a>
              <a href="https://drive.google.com/file/d/1wloovSBDFWGaQSqqT1BvgewPnDGKlaG2/view?usp=sharing">
                <img
                  className="LikedIn-img"
                  src="https://us.123rf.com/450wm/riduwanmolla/riduwanmolla1809/riduwanmolla180900031/110113326-resume-vector-icon-cv-icon-white.jpg?ver=6"
                  alt=""
                />
              </a>
            </div>
          </div>
        </Jumbotron>
      </div>
    );
  }
}

export default ResumeJumbotron;
