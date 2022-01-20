import React from 'react';

function OutlineButton(props) {
  const { label, href } = props;
  return (
    <div className='Outline-button'>
      <a href={href}>
        <span>{label}</span>
      </a>
    </div>
  );
}

export default OutlineButton;
