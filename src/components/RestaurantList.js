import React, { useState } from 'react';
import { Box, Button, Typography, Card, CardContent, Grid, Dialog, DialogTitle, DialogContent, DialogActions, Select, MenuItem, InputLabel, FormControl } from '@mui/material';
import { useNavigate } from 'react-router-dom';


const restaurantsData = {
    Vijayawada: [
      { id: 1, name: 'Delicious Eats', rating: 4.5, price: 250, deliveryTime: '25 min', offer: '20% OFF' },
      { id: 2, name: 'Tasty Treats', rating: 4.0, price: 200, deliveryTime: '30 min', offer: 'Free Drink with Meal' },
      { id: 3, name: 'Curry House', rating: 4.3, price: 220, deliveryTime: '20 min', offer: '10% OFF' },
      { id: 4, name: 'Spice of India', rating: 4.7, price: 300, deliveryTime: '15 min', offer: '30% OFF' },
      { id: 5, name: 'Chaat Corner', rating: 4.1, price: 180, deliveryTime: '30 min', offer: 'Buy 1 Get 1' },
      { id: 6, name: 'Masala Magic', rating: 4.2, price: 250, deliveryTime: '25 min', offer: 'Free Delivery' },
      { id: 7, name: 'Biryani Bites', rating: 4.6, price: 300, deliveryTime: '20 min', offer: '15% OFF' },
      { id: 8, name: 'Sweet Treats', rating: 4.5, price: 150, deliveryTime: '35 min', offer: '10% OFF' },
      { id: 9, name: 'Paneer Paradise', rating: 4.0, price: 200, deliveryTime: '30 min', offer: '20% OFF' },
      { id: 10, name: 'Naan & Co.', rating: 4.3, price: 180, deliveryTime: '20 min', offer: 'Free Drink with Meal' },
    ],
    Guntur: [
      { id: 11, name: 'Dosa Delight', rating: 4.2, price: 200, deliveryTime: '25 min', offer: '20% OFF' },
      { id: 12, name: 'Thali Express', rating: 4.4, price: 250, deliveryTime: '20 min', offer: 'Free Drink with Meal' },
      { id: 13, name: 'Kebab King', rating: 4.6, price: 300, deliveryTime: '15 min', offer: '30% OFF' },
      { id: 14, name: 'Street Food Hub', rating: 4.0, price: 150, deliveryTime: '35 min', offer: '10% OFF' },
      { id: 15, name: 'Veggie World', rating: 4.1, price: 220, deliveryTime: '30 min', offer: 'Free Delivery' },
    ],
    Hyderabad: [
      { id: 16, name: 'Roti Roti', rating: 3.8, price: 180, deliveryTime: '30 min', offer: '15% OFF' },
      { id: 17, name: 'Beverage Bliss', rating: 4.2, price: 120, deliveryTime: '20 min', offer: 'Free Drink with Meal' },
      { id: 18, name: 'Rice Bowl', rating: 4.5, price: 250, deliveryTime: '20 min', offer: '20% OFF' },
      { id: 19, name: 'Spicy Affair', rating: 4.3, price: 300, deliveryTime: '15 min', offer: '30% OFF' },
      { id: 20, name: 'Ghar Ka Khana', rating: 4.0, price: 200, deliveryTime: '30 min', offer: '10% OFF' },
    ],
  };
  
const restaurantMenus = {
    1: [
      { id: 1, name: 'Paneer Butter Masala', price: 220 },
      { id: 2, name: 'Chicken Biryani', price: 180 },
      { id: 3, name: 'Butter Naan', price: 70 },
      { id: 4, name: 'Dal Tadka', price: 150 },
      { id: 5, name: 'Veg Biryani', price: 160 },
      { id: 6, name: 'Mixed Vegetable Curry', price: 140 },
      { id: 7, name: 'Jeera Rice', price: 130 },
    ],
    2: [
      { id: 1, name: 'Veg Biryani', price: 200 },
      { id: 2, name: 'Chilli Paneer', price: 190 },
      { id: 3, name: 'Garlic Naan', price: 50 },
      { id: 4, name: 'Mixed Raita', price: 70 },
      { id: 5, name: 'Bhindi Masala', price: 120 },
      { id: 6, name: 'Gajar Halwa', price: 90 },
    ],
    3: [
      { id: 1, name: 'Fried Rice', price: 200 },
      { id: 2, name: 'Spring Rolls', price: 150 },
      { id: 3, name: 'Sweet and Sour Chicken', price: 250 },
      { id: 4, name: 'Ice Cream', price: 100 },
    ],
    4: [
      { id: 1, name: 'Hyderabadi Biryani', price: 350 },
      { id: 2, name: 'Mutton Rogan Josh', price: 400 },
      { id: 3, name: 'Raita', price: 70 },
      { id: 4, name: 'Gulab Jamun', price: 120 },
    ],
    5: [
      { id: 1, name: 'Fries', price: 120 },
      { id: 2, name: 'Sandwich', price: 150 },
      { id: 3, name: 'Soft Drink', price: 60 },
      { id: 4, name: 'Pasta', price: 220 },
    ],
    6: [
      { id: 1, name: 'Paneer Tikka', price: 100 },
      { id: 2, name: 'Aloo Gobi', price: 90 },
      { id: 3, name: 'Palak Paneer', price: 80 },
      { id: 4, name: 'Chole Bhature', price: 120 },
      { id: 5, name: 'Dal Makhani', price: 100 },
    ],
    7: [
      { id: 1, name: 'Samosa', price: 50 },
      { id: 2, name: 'Gulab Jamun', price: 40 },
      { id: 3, name: 'Aloo Tikki', price: 30 },
      { id: 4, name: 'Pani Puri', price: 30 },
      { id: 5, name: 'Tandoori Chicken', price: 160 },
    ],
    8: [
      { id: 1, name: 'Butter Chicken', price: 180 },
      { id: 2, name: 'Paneer Butter Masala', price: 170 },
      { id: 3, name: 'Biryani', price: 160 },
      { id: 4, name: 'Raita', price: 40 },
      { id: 5, name: 'Naan', price: 50 },
    ],
    9: [
      { id: 1, name: 'Tandoori Chicken', price: 160 },
      { id: 2, name: 'Seekh Kebab', price: 120 },
      { id: 3, name: 'Mutton Rogan Josh', price: 180 },
      { id: 4, name: 'Paneer Tikka', price: 150 },
      { id: 5, name: 'Veg Pakora', price: 50 },
    ],
    10: [
      { id: 1, name: 'Bhel Puri', price: 50 },
      { id: 2, name: 'Sev Puri', price: 50 },
      { id: 3, name: 'Dhokla', price: 60 },
      { id: 4, name: 'Pav Bhaji', price: 80 },
      { id: 5, name: 'Vada Pav', price: 70 },
    ],
    11: [
      { id: 1, name: 'Dal Makhani', price: 100 },
      { id: 2, name: 'Palak Paneer', price: 120 },
      { id: 3, name: 'Aloo Gobi', price: 90 },
      { id: 4, name: 'Chana Masala', price: 100 },
      { id: 5, name: 'Vegetable Biryani', price: 120 },
    ],
    12: [
      { id: 1, name: 'Hyderabadi Biryani', price: 160 },
      { id: 2, name: 'Kolkata Biryani', price: 150 },
      { id: 3, name: 'Mirchi Ka Salan', price: 120 },
      { id: 4, name: 'Double Ka Meetha', price: 90 },
      { id: 5, name: 'Nihari', price: 180 },
    ],
    13: [
      { id: 1, name: 'Gulab Jamun', price: 60 },
      { id: 2, name: 'Rasgulla', price: 60 },
      { id: 3, name: 'Kheer', price: 50 },
      { id: 4, name: 'Jalebi', price: 60 },
      { id: 5, name: 'Mysore Pak', price: 70 },
    ],
    14: [
      { id: 1, name: 'Paneer Butter Masala', price: 140 },
      { id: 2, name: 'Palak Paneer', price: 130 },
      { id: 3, name: 'Veg Pulao', price: 110 },
      { id: 4, name: 'Dal Tadka', price: 130 },
      { id: 5, name: 'Roti', price: 20 },
    ],
    15: [
      { id: 1, name: 'Butter Naan', price: 50 },
      { id: 2, name: 'Garlic Naan', price: 60 },
      { id: 3, name: 'Tandoori Roti', price: 50 },
      { id: 4, name: 'Missi Roti', price: 50 },
      { id: 5, name: 'Paratha', price: 60 },
    ],
    16: [
      { id: 1, name: 'Butter Naan', price: 50 },
      { id: 2, name: 'Garlic Naan', price: 60 },
      { id: 3, name: 'Tandoori Roti', price: 50 },
      { id: 4, name: 'Missi Roti', price: 50 },
      { id: 5, name: 'Paratha', price: 60 },
    ],
    17: [
      { id: 1, name: 'Masala Dosa', price: 80 },
      { id: 2, name: 'Rawa Dosa', price: 90 },
      { id: 3, name: 'Idli', price: 40 },
      { id: 4, name: 'Vada', price: 50 },
      { id: 5, name: 'Upma', price: 70 },
    ],
    18: [
      { id: 1, name: 'Thali', price: 150 },
      { id: 2, name: 'Rice and Curry', price: 100 },
      { id: 3, name: 'Daal Bati Churma', price: 120 },
      { id: 4, name: 'Pongal', price: 80 },
      { id: 5, name: 'Kadhi Pakora', price: 100 },
    ],
    19: [
      { id: 1, name: 'Seekh Kebab', price: 120 },
      { id: 2, name: 'Shami Kebab', price: 130 },
      { id: 3, name: 'Chicken Tikka', price: 150 },
      { id: 4, name: 'Mutton Korma', price: 170 },
      { id: 5, name: 'Fish Curry', price: 160 },
    ],
    20: [
      { id: 1, name: 'Aloo Tikki Chaat', price: 50 },
      { id: 2, name: 'Sev Puri', price: 50 },
      { id: 3, name: 'Dahi Puri', price: 60 },
      { id: 4, name: 'Bhel Puri', price: 40 },
      { id: 5, name: 'Pani Puri', price: 30 },
    ],
  };
  const RestaurantMenuApp = () => {
    const [selectedCity, setSelectedCity] = useState('');
    const [selectedRestaurant, setSelectedRestaurant] = useState(null);
    const [openMenuDialog, setOpenMenuDialog] = useState(false);
    const [cart, setCart] = useState({});
  
    const navigate = useNavigate(); // Initialize navigate function
    
    // Handle city selection
    const handleCityChange = (event) => {
      setSelectedCity(event.target.value);
      setSelectedRestaurant(null);
      setCart({});
    };
  
    // Handle restaurant selection
    const handleRestaurantSelect = (restaurant) => {
      setSelectedRestaurant(restaurant);
      setOpenMenuDialog(true);
      setCart({});
    };
  
    // Close menu dialog
    const handleCloseDialog = () => {
      setOpenMenuDialog(false);
    };
  
    // Add menu item to cart
    const handleAddToCart = (menuItem) => {
      setCart((prevCart) => ({
        ...prevCart,
        [menuItem.id]: (prevCart[menuItem.id] || 0) + 1,
      }));
    };
  
    // Remove menu item from cart
    const handleRemoveFromCart = (menuItem) => {
      setCart((prevCart) => {
        const updatedQuantity = (prevCart[menuItem.id] || 1) - 1;
        if (updatedQuantity > 0) {
          return { ...prevCart, [menuItem.id]: updatedQuantity };
        } else {
          const { [menuItem.id]: _, ...rest } = prevCart;
          return rest;
        }
      });
    };
  
    // Calculate total bill
    const calculateTotalBill = () => {
      if (!selectedRestaurant) return 0;
      return Object.keys(cart).reduce((total, itemId) => {
        const menuItem = restaurantMenus[selectedRestaurant.id]?.find(
          (item) => item.id === parseInt(itemId)
        );
        return total + (menuItem ? menuItem.price * cart[itemId] : 0);
      }, 0);
    };
  
    // Render restaurants based on selected city
    const renderRestaurants = () => {
      if (!selectedCity) return null;
      return restaurantsData[selectedCity]?.map((restaurant) => (
        <Grid item xs={12} sm={6} md={4} key={restaurant.id}>
          <Card>
            <CardContent>
              <Typography variant="h5">{restaurant.name}</Typography>
              <Typography variant="body2">Rating: {restaurant.rating}</Typography>
              <Typography variant="body2">Price: ₹{restaurant.price}</Typography>
              <Typography variant="body2">Delivery Time: {restaurant.deliveryTime}</Typography>
              <Typography variant="body2">Offer: {restaurant.offer}</Typography>
              <Button
                variant="contained"
                onClick={() => handleRestaurantSelect(restaurant)}
                style={{ marginTop: '10px', backgroundColor: '#ffc93c', color: 'black' }}
              >
                View Menu
              </Button>
            </CardContent>
          </Card>
        </Grid>
      ));
    };
  
    // Handle checkout navigation
    const handleCheckout = () => {
      // Redirect to the payment page after clicking on Proceed to Checkout
      navigate('/payment'); // This will take the user to the payment page
    };
  
    // Calculate total bill for checkout
    const totalBill = calculateTotalBill();
  
    return (
      <Box sx={{ padding: 3 }}>
        {/* City selection dropdown */}
        <FormControl fullWidth variant="outlined" sx={{ marginBottom: 3 }}>
          <InputLabel id="city-select-label">Select City</InputLabel>
          <Select
            labelId="city-select-label"
            value={selectedCity}
            onChange={handleCityChange}
            label="Select City"
          >
            {Object.keys(restaurantsData).map((city) => (
              <MenuItem key={city} value={city}>
                {city}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
  
        {/* Render the list of restaurants based on selected city */}
        <Grid container spacing={2}>
          {renderRestaurants()}
        </Grid>
  
        {/* Menu dialog with restaurant menu */}
        <Dialog open={openMenuDialog} onClose={handleCloseDialog}>
          <DialogTitle>Menu for {selectedRestaurant?.name}</DialogTitle>
          <DialogContent>
            {selectedRestaurant && restaurantMenus[selectedRestaurant.id] ? (
              <div>
                {restaurantMenus[selectedRestaurant.id].map((menuItem) => (
                  <Box key={menuItem.id} display="flex" justifyContent="space-between" marginBottom={1}>
                    <Typography>{menuItem.name}</Typography>
                    <Typography>₹{menuItem.price}</Typography>
                    <Box display="flex" alignItems="center">
                      <Button
                        variant="contained"
                        onClick={() => handleRemoveFromCart(menuItem)}
                        style={{ backgroundColor: '#ffc93c', color: 'black', marginRight: '10px' }}
                      >
                        -
                      </Button>
                      <Typography>{cart[menuItem.id] || 0}</Typography>
                      <Button
                        variant="contained"
                        onClick={() => handleAddToCart(menuItem)}
                        style={{ backgroundColor: '#ffc93c', color: 'black', marginLeft: '10px' }}
                      >
                        +
                      </Button>
                    </Box>
                  </Box>
                ))}
              </div>
            ) : (
              <Typography>No menu available</Typography>
            )}
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialog} color="primary">
              Close
            </Button>
            <Button
              onClick={handleCheckout}
              color="primary"
              disabled={totalBill <= 0}
            >
              Proceed to Checkout (₹{totalBill})
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    );
  };
  
  export default RestaurantMenuApp;
  