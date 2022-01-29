import React, { useContext } from 'react';
import './Services.css';
import AppContext from './context/AppContext';

function Services() {
  const contextData = useContext(AppContext);
  let darkmode = contextData.darkmode.darkTheme;
  return (
    <div className='services-section'>
      <div id='Services-v2'>v2</div>
      <h1 className='services-title'>Services</h1>
      <div className='sCards'>
        <div className={darkmode ? 'sCard-white scard1 ' : 'sCard scard1 '}>
          <div className='sContainer'>
            <img src='/images/website-build.png' alt='' />
          </div>
          <div className='sdetails'>
            <h3 className={darkmode ? 'stitle-white ' : 'stitle '}>
              Webiste Creation
            </h3>
            <p className={darkmode ? 'stext-white' : 'stext'}>
              dasda adsad ads adadasdfafadf asdfa fasd adfadafdsa afsdadfsgsgfs
              a dsa asdf a dsa asdadadfasd asf ad a dasdasdadas grsgdfgdfgdgf
              sadfsdfsfsd getrfrgdf dfgdtret sdfret
            </p>
          </div>
        </div>
        <div className={darkmode ? 'sCard-white scard2 ' : 'sCard scard2'}>
          <div className='sContainer'>
            <img src='/images/responsive-design-min.png' alt='' />
          </div>
          <div className='sdetails'>
            <h3 className={darkmode ? 'stitle-white ' : 'stitle '}>
              Responsive Design
            </h3>
            <p className={darkmode ? 'stext-white' : 'stext'}>
              dasda adsad ads adadasdfafadf asdfa fasd adfadafdsa afsdadfsgsgfs
              a dsa asdf a dsa asdadadfasd asf ad a dasdasdadas grsgdfgdfgdgf
              sadfsdfsfsd getrfrgdf dfgdtret sdfret
            </p>
          </div>
        </div>
        <div className={darkmode ? 'sCard-white scard3 ' : 'sCard scard3 '}>
          <div className='sContainer'>
            <img src='/images/coding-min.png' alt='' />
          </div>
          <div className='sdetails'>
            <h3 className={darkmode ? 'stitle-white ' : 'stitle '}>
              Condig Projects
            </h3>
            <p className={darkmode ? 'stext-white' : 'stext'}>
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
