import React, { Component } from 'react';
class Footer extends Component {
  render() {
    return (
      <div className='footer-section'>
        <div className='footer-container'>
          <div>
            <a href='https://www.youtube.com/channel/UCuTuDGb-Y9w-k-WgdXxWV6w'>
              <i className='fab fa-youtube bot-icons' />
            </a>
            <a href='https://github.com/RafaS92'>
              <i className='fab fa-github bot-icons' />
            </a>
            <a href='https://medium.com/@manrvaldez.92'>
              <i className='fab fa-medium-m bot-icons' />
            </a>
            <a href='mailto:rvaldezdev.2020@gmail.com'>
              <i className='fas fa-envelope-square bot-icons' />
            </a>
          </div>
          <span>© 2020 Rafael Valdez. All Rights Reserved.</span>
        </div>
      </div>
    );
  }
}

export default Footer;
