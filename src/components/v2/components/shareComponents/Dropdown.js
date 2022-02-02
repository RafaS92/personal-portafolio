import React, { useContext, useState } from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import './Dropdown.css';
import AppContext from '../context/AppContext';
import translate from '../../i18n/translate';

function Dropdown({ selected, setSelected }) {
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
          {translate('drop1')}
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
            {translate('drop2')}
          </MenuItem>
          <MenuItem
            onClick={(e) => {
              setSelected('Frontend');
            }}
            className='dropdown-item'
            value={20}
          >
            {translate('drop3')}
          </MenuItem>
          <MenuItem
            onClick={(e) => {
              setSelected('Backend');
            }}
            className='dropdown-item'
            value={30}
          >
            {translate('drop4')}
          </MenuItem>
          <MenuItem
            onClick={(e) => {
              setSelected('Tools');
            }}
            className='dropdown-item'
            value={40}
          >
            {translate('drop5')}
          </MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}

export default Dropdown;
