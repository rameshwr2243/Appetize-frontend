import React, { useState } from 'react';
import { FormControl, FormLabel, FormGroup, FormControlLabel, Checkbox } from '@mui/material';

const CustomizationComponent = ({ options }) => {
  const [selectedOptions, setSelectedOptions] = useState([]);

  const handleChange = (event) => {
    const option = event.target.name;
    setSelectedOptions((prevSelected) =>
      prevSelected.includes(option)
        ? prevSelected.filter((item) => item !== option)
        : [...prevSelected, option]
    );
  };

  return (
    <FormControl component="fieldset">
      <FormLabel component="legend">Customize Your Order</FormLabel>
      <FormGroup>
        {options.map((option) => (
          <FormControlLabel
            key={option}
            control={<Checkbox checked={selectedOptions.includes(option)} onChange={handleChange} name={option} />}
            label={option}
          />
        ))}
      </FormGroup>
    </FormControl>
  );
};

export default CustomizationComponent;
