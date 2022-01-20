import React, { useState } from 'react';
import './Dropdown.css';

function Dropdown() {
  const [active, setActive] = useState(false);
  return (
    <div className='dropdown'>
      <div className='dropdown-btn' onClick={(e) => setActive(!active)}>
        Choose One
        <span className='fas fa-caret-down'></span>
      </div>
      {active && (
        <div className='dropdown-content'>
          <div className='dropdown-item'>React</div>
          <div className='dropdown-item'>C#</div>
          <div className='dropdown-item'>Trello</div>
        </div>
      )}
    </div>
  );
}

export default Dropdown;
