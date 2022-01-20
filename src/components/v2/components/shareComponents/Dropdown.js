import React, { useState } from 'react';
import './Dropdown.css';

function Dropdown({ selected, setSelected }) {
  const [active, setActive] = useState(false);
  const options = ['All', 'Frontend', 'Backend', 'Tools'];
  return (
    <div className='dropdown'>
      <div className='dropdown-btn' onClick={(e) => setActive(!active)}>
        {selected}
        <span className='fas fa-caret-down'></span>
      </div>
      {active && (
        <div className='dropdown-content'>
          {options.map((option) => (
            <div
              onClick={(e) => {
                setSelected(option);
                setActive(false);
              }}
              className='dropdown-item'
            >
              {option}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Dropdown;
