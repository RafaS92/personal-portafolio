import React, { Component } from "react";

class About extends Component {
  render() {
    return (
      <div className="Jumbotron-about" id="about" fluid>
        <div className="about-container">
          <div>
            <img
              src="/images/Rafav5.png"
              className="img-jumbotron-about"
              alt=""
            />
          </div>

          <div className="text-about">
            <p>
              Since I first learned to code, I have strived to learn more about
              it in order to serve others in solving practical problems. I am a
              proactive, committed, and hardworking Full Stack Web Developer
              looking for opportunities for growth and innovation. What started
              with a “Hello World", developed into a full-fledged passion.
            </p>
            <p>
              My strengths are my ability to learn new skills and programming
              languages quickly, adaptability, problem-solving, and web design.
              I am proficient in JavaScript, React.Js, React Native, Ruby on
              Rails, Redux, Node.Js, JQuery, SQL, CSS3, HTML5, Github.
            </p>
            <p>
              Expertise areas: Developing front-end website architecture,
              designing user interactions on web pages, developing back end
              website applications, creating servers and databases for
              functionality, ensuring responsiveness of applications,
              maintaining code integrity and organization.
            </p>
          </div>
        </div>
      </div>
    );
  }
}

export default About;
