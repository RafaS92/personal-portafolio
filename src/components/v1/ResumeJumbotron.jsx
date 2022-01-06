import React, { Component } from 'react';

class ResumeJumbotron extends Component {
  render() {
    return (
      <div id='resume'>
        <div className='resume-section'>
          <div className='resume-container'>
            <div className='text-resume'>
              <h1>
                Check Out My LinkedIn!
                <p>Resume, education, interests and more...</p>
              </h1>
            </div>
          </div>
          <div className='resumeIcons-container'>
            <a href='https://www.linkedin.com/in/rafael-salvador-valdez/'>
              <img className='LikedIn-img' src='/images/LinkedIn.jpeg' alt='' />
            </a>
            <a href='https://drive.google.com/file/d/13HfkPrkWcOqWfLh-gQ7UID_yDEk6T6JW/view?usp=sharing'>
              <img
                className='LikedIn-img'
                src='https://us.123rf.com/450wm/riduwanmolla/riduwanmolla1809/riduwanmolla180900031/110113326-resume-vector-icon-cv-icon-white.jpg?ver=6'
                alt=''
              />
            </a>
          </div>
        </div>
      </div>
    );
  }
}

export default ResumeJumbotron;
