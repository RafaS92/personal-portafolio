import React from 'react';
import './Services.css';

function Services() {
  return (
    <div>
      <h1 className='services-title'>Services</h1>
      <div className='sCards'>
        <div className='sCard scard1'>
          <div className='sContainer'>
            <img src='/images/website-build.png' alt='' />
          </div>
          <div className='sdetails'>
            <h3>Webiste Creation</h3>
            <p>
              dasda adsad ads adadasdfafadf asdfa fasd adfadafdsa afsdadfsgsgfs
              a dsa asdf a dsa asdadadfasd asf ad a dasdasdadas grsgdfgdfgdgf
              sadfsdfsfsd getrfrgdf dfgdtret sdfret
            </p>
          </div>
        </div>
        <div className='sCard scard2'>
          <div className='sContainer'>
            <img src='/images/responsive-design-min.png' alt='' />
          </div>
          <div className='sdetails'>
            <h3>Responsive Design</h3>
            <p>
              dasda adsad ads adadasdfafadf asdfa fasd adfadafdsa afsdadfsgsgfs
              a dsa asdf a dsa asdadadfasd asf ad a dasdasdadas grsgdfgdfgdgf
              sadfsdfsfsd getrfrgdf dfgdtret sdfret
            </p>
          </div>
        </div>
        <div className='sCard scard3'>
          <div className='sContainer'>
            <img src='/images/coding-min.png' alt='' />
          </div>
          <div className='sdetails'>
            <h3>Conding Projects</h3>
            <p>
              dasda adsad ads adadasdfafadf asdfa fasd adfadafdsa afsdadfsgsgfs
              a dsa asdf a dsa asdadadfasd asf ad a dasdasdadas grsgdfgdfgdgf
              sadfsdfsfsd getrfrgdf dfgdtret sdfret
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Services;
