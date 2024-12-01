import React, { useState } from 'react';
import { Box, Typography, Button, Card, CardContent, FormControl, Select, MenuItem, InputLabel } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const restaurantsData = {
    'Vijayawada': [
        { id: 1, name: 'Pizza Delight', price: 250, deliveryTime: '25 min', discount: '20% OFF' },
        { id: 3, name: 'Fried Feast', price: 200, deliveryTime: '30 min', discount: 'Free Drink with Meal' },
    ],
    'Guntur': [
        { id: 2, name: 'Spice Paradise', price: 220, deliveryTime: '20 min', discount: '10% OFF' },
        { id: 4, name: 'Biryani Hub', price: 300, deliveryTime: '15 min', discount: '30% OFF' },
    ],
    'Hyderabad': [
        { id: 5, name: 'Snack Station', price: 150, deliveryTime: '35 min', discount: '15% OFF' },
    ],
};
const PreOrder = () => {
  const [selectedLocation, setSelectedLocation] = useState('Vijayawada');
  const navigate = useNavigate();

  const handleRestaurantSelect = (restaurantId) => {
      navigate(`/restaurants/${restaurantId}/menu`);
  };

  return (
      <Box>
          <Typography variant="h4" gutterBottom>
              Select a Location
          </Typography>
          
          {/* Location Selector */}
          <FormControl fullWidth sx={{ mb: 3 }}>
              <InputLabel id="location-select-label">Select Location</InputLabel>
              <Select
                  labelId="location-select-label"
                  value={selectedLocation}
                  onChange={(e) => setSelectedLocation(e.target.value)}
              >
                  {Object.keys(restaurantsData).map((location) => (
                      <MenuItem key={location} value={location}>{location}</MenuItem>
                  ))}
              </Select>
          </FormControl>

          <Typography variant="h4" gutterBottom>
              Select a Restaurant for Pre-ordering
          </Typography>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
              {restaurantsData[selectedLocation].map((restaurant) => (
                  <Card key={restaurant.id} sx={{ width: 300 }}>
                      <CardContent>
                          <Typography variant="h6">{restaurant.name}</Typography>
                          <Typography variant="body1">Price for One: ₹{restaurant.price}</Typography>
                          <Typography variant="body1">Delivery Time: {restaurant.deliveryTime}</Typography>
                          <Typography variant="body2" color="green">
                              {restaurant.discount}
                          </Typography>
                          <Button
                              variant="contained"
                              sx={{ mt: 2, backgroundColor: '#ffc93c', color: '#000' }} // Change button color to yellow and text to black
                              onClick={() => handleRestaurantSelect(restaurant.id)}
                          >
                              View Menu
                          </Button>
                      </CardContent>
                  </Card>
              ))}
          </Box>
      </Box>
  );
};

export default PreOrder;