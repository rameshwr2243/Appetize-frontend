import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';

// Sample restaurant data
const restaurants = [
    { id: 1, name: 'Pizza Delight', price: 250, deliveryTime: '25 min', discount: '20% OFF' },
    { id: 2, name: 'Spice Paradise', price: 220, deliveryTime: '20 min', discount: '10% OFF' },
    { id: 3, name: 'Fried Feast', price: 200, deliveryTime: '30 min', discount: 'Free Drink with Meal' },
    { id: 4, name: 'Biryani Hub', price: 300, deliveryTime: '15 min', discount: '30% OFF' },
    { id: 5, name: 'Snack Station', price: 150, deliveryTime: '35 min', discount: '15% OFF' },
];

const Restaurant = () => {
    const { id } = useParams();
    const restaurant = restaurants.find((res) => res.id === parseInt(id));
    const navigate = useNavigate();

    if (!restaurant) return <Typography variant="h6">Restaurant not found!</Typography>;

    const handleViewMenu = () => {
        navigate(`/restaurants/${id}/menu`);
    };

    return (
        <Box>
            <Typography variant="h4">{restaurant.name}</Typography>
            <Typography variant="body1">Price for One: ₹{restaurant.price}</Typography>
            <Typography variant="body1">Delivery Time: {restaurant.deliveryTime}</Typography>
            <Typography variant="body2" color="green">{restaurant.discount}</Typography>
            <Button variant="contained" onClick={handleViewMenu} sx={{ mt: 2 }}>
                View Menu
            </Button>
        </Box>
    );
};

export default Restaurant;
