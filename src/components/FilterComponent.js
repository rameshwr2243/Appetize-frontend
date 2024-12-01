import React, { useState } from 'react';
import { MenuItem, Select, InputLabel, FormControl, Box } from '@mui/material';

const FilterComponent = ({ onFilterChange }) => {
  const [filter, setFilter] = useState({ cuisine: '', price: '', deliveryTime: '' });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFilter((prevFilter) => ({
      ...prevFilter,
      [name]: value,
    }));
    onFilterChange({ ...filter, [name]: value });
  };

  return (
    <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
      <FormControl fullWidth>
        <InputLabel>Cuisine</InputLabel>
        <Select name="cuisine" value={filter.cuisine} onChange={handleChange}>
          <MenuItem value="Italian">Italian</MenuItem>
          <MenuItem value="Indian">Indian</MenuItem>
          <MenuItem value="Chinese">Chinese</MenuItem>
        </Select>
      </FormControl>

      <FormControl fullWidth>
        <InputLabel>Price</InputLabel>
        <Select name="price" value={filter.price} onChange={handleChange}>
          <MenuItem value="Low">Low</MenuItem>
          <MenuItem value="Medium">Medium</MenuItem>
          <MenuItem value="High">High</MenuItem>
        </Select>
      </FormControl>

      <FormControl fullWidth>
        <InputLabel>Delivery Time</InputLabel>
        <Select name="deliveryTime" value={filter.deliveryTime} onChange={handleChange}>
          <MenuItem value="15">15 mins</MenuItem>
          <MenuItem value="30">30 mins</MenuItem>
          <MenuItem value="45">45 mins</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
};

export default FilterComponent;
