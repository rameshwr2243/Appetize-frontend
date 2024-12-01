import React, { useState } from 'react';
import { Box, TextField, Button } from '@mui/material';

const CookForm = () => {
  const [name, setName] = useState('');
  const [dish, setDish] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [availableTime, setAvailableTime] = useState('');
  const [quantity, setQuantity] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    const cookDetails = {
      name,
      dish,
      description,
      price,
      availableTime,
      quantity,
    };

    // Handle the cook details submission (e.g., save to a state, send to an API, etc.)
    console.log('Cook details submitted:', cookDetails);

    // Reset form fields
    setName('');
    setDish('');
    setDescription('');
    setPrice('');
    setAvailableTime('');
    setQuantity('');
  };

  return (
    <Box sx={{ maxWidth: 500, margin: 'auto', mt: 4 }}>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          fullWidth
          required
          margin="normal"
        />
        <TextField
          label="Dish"
          value={dish}
          onChange={(e) => setDish(e.target.value)}
          fullWidth
          required
          margin="normal"
        />
        <TextField
          label="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          fullWidth
          required
          margin="normal"
          multiline
          rows={3}
        />
        <TextField
          label="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          fullWidth
          required
          margin="normal"
          type="number"
        />
        <TextField
          label="Available Time"
          value={availableTime}
          onChange={(e) => setAvailableTime(e.target.value)}
          fullWidth
          required
          margin="normal"
          placeholder="e.g. 10:00 AM - 2:00 PM"
        />
        <TextField
          label="Quantity"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          fullWidth
          required
          margin="normal"
          type="number"
        />
        <Button type="submit" variant="contained" color="primary" fullWidth>
          Submit
        </Button>
      </form>
    </Box>
  );
};

export default CookForm;
