import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import './Dropdown.css';

function Dropdown({ selected, setSelected }) {
  const options = [
    {
      text: 'All',
      value: 10
    }
  ];
  const [label, setLabel] = React.useState('');

  const handleChange = (event) => {
    setLabel(event.target.value);
  };

  return (
    <Box className='dropdown'>
      <FormControl fullWidth className='dropdownHead'>
        <InputLabel id='demo-simple-select-label' className='dropdown-btn'>
          Categories
        </InputLabel>
        <Select
          labelId='demo-simple-select-label'
          id='demo-simple-select'
          value={label}
          label='Categories'
          className='dropdown-content'
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
              setSelected('Frontend');
            }}
            className='dropdown-item'
            value={20}
          >
            Frontend
          </MenuItem>
          <MenuItem
            onClick={(e) => {
              setSelected('Backend');
            }}
            className='dropdown-item'
            value={30}
          >
            Backend
          </MenuItem>
          <MenuItem
            onClick={(e) => {
              setSelected('Tools');
            }}
            className='dropdown-item'
            value={40}
          >
            Tools
          </MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}

export default Dropdown;
