import React, { useContext, useState } from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import './DropdownProjects.css';
import AppContext from '../context/AppContext';

function DropdownProjects({ selected, setSelected }) {
  const [label, setLabel] = useState('');
  const contextData = useContext(AppContext);
  let darkmode = contextData.darkmode.darkTheme;

  const handleChange = (event) => {
    setLabel(event.target.value);
  };

  return (
    <Box className='dropdown'>
      <FormControl
        fullWidth
        className={darkmode ? 'dropdownHead' : 'dropdownHeadWhite'}
      >
        <InputLabel
          id='demo-simple-select-label'
          className={darkmode ? 'dropdown-btn' : 'dropdown-btn-white'}
        >
          Categories
        </InputLabel>
        <Select
          labelId='demo-simple-select-label'
          value={label}
          label='Categories'
          className={darkmode ? 'dropdown-content' : 'dropdown-content-white'}
          onChange={handleChange}
        >
          <MenuItem
            onClick={(e) => {
              setSelected('All');
            }}
            className='dropdown-item'
            value={10}
          >
            All
          </MenuItem>
          <MenuItem
            onClick={(e) => {
              setSelected('Web');
            }}
            className='dropdown-item'
            value={20}
          >
            Web Apps
          </MenuItem>
          <MenuItem
            onClick={(e) => {
              setSelected('Mobile');
            }}
            className='dropdown-item'
            value={30}
          >
            Mobile Apps
          </MenuItem>
          {/* <MenuItem
            onClick={(e) => {
              setSelected('Freelance');
            }}
            className='dropdown-item'
            value={40}
          >
            Freelance
          </MenuItem> */}
        </Select>
      </FormControl>
    </Box>
  );
}

export default DropdownProjects;
