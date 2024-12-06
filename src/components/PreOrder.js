import React, { useState } from 'react';
import { Box, Typography, Button, Card, CardContent, FormControl, Select, MenuItem, InputLabel, TextField } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const restaurantsData = {
    'Vijayawada': [
        { id: 1, name: 'Pizza Delight', menu: [
            { id: 1, name: 'Margherita Pizza', price: 150 },
            { id: 2, name: 'Pepperoni Pizza', price: 180 },
            { id: 3, name: 'Veg Burger', price: 90 }
        ]},
        { id: 3, name: 'Fried Feast', menu: [
            { id: 4, name: 'Fried Chicken', price: 200 },
            { id: 5, name: 'French Fries', price: 80 }
        ]}
    ],
    'Guntur': [
        { id: 2, name: 'Spice Paradise', menu: [
            { id: 6, name: 'Paneer Tikka', price: 250 },
            { id: 7, name: 'Chole Bhature', price: 150 }
        ]},
        { id: 4, name: 'Biryani Hub', menu: [
            { id: 8, name: 'Chicken Biryani', price: 300 },
            { id: 9, name: 'Mutton Biryani', price: 350 }
        ]}
    ],
};

const PreOrder = () => {
    const [selectedLocation, setSelectedLocation] = useState('Vijayawada');
    const [selectedRestaurant, setSelectedRestaurant] = useState(null);
    const [selectedItems, setSelectedItems] = useState([]); // Track selected menu items
    const [orderDate, setOrderDate] = useState('');
    const [orderTime, setOrderTime] = useState('');
    const navigate = useNavigate();

    // Handle when a restaurant is selected
    const handleRestaurantSelect = (restaurant) => {
        setSelectedRestaurant(restaurant);
        setSelectedItems([]); // Reset selected items when a new restaurant is chosen
    };

    // Handle item selection
    const handleItemSelect = (itemId) => {
        setSelectedItems((prevItems) => {
            if (prevItems.includes(itemId)) {
                return prevItems.filter((id) => id !== itemId); // Remove item if already selected
            } else {
                return [...prevItems, itemId]; // Add item to the list
            }
        });
    };

    // Handle confirming the order
    const handleConfirmOrder = () => {
        if (selectedRestaurant && selectedItems.length > 0 && orderDate && orderTime) {
            // Proceed to payment page with selected data
            navigate('/payment', {
                state: { 
                    restaurant: selectedRestaurant, 
                    selectedItems: selectedItems.map(id => selectedRestaurant.menu.find(item => item.id === id)),
                    orderDate, 
                    orderTime 
                }
            });
        } else {
            alert('Please complete the order by selecting items and providing date & time.');
        }
    };

    return (
        <Box sx={{ padding: 3 }}>
            <Typography variant="h4" gutterBottom align="center" sx={{ fontWeight: 'bold' }}>Select a Location</Typography>

            {/* Location Selector */}
            <FormControl fullWidth sx={{ mb: 3 }}>
                <InputLabel id="location-select-label">Select Location</InputLabel>
                <Select
                    labelId="location-select-label"
                    value={selectedLocation}
                    onChange={(e) => setSelectedLocation(e.target.value)}
                    fullWidth
                >
                    {Object.keys(restaurantsData).map((location) => (
                        <MenuItem key={location} value={location}>
                            {location}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>

            <Typography variant="h5" gutterBottom align="center" sx={{ fontWeight: 'bold' }}>Select a Restaurant</Typography>

            {/* Restaurant Cards */}
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, justifyContent: 'center' }}>
                {restaurantsData[selectedLocation].map((restaurant) => (
                    <Card key={restaurant.id} sx={{ width: 280, boxShadow: 3, borderRadius: 2 }}>
                        <CardContent>
                            <Typography variant="h6" align="center" sx={{ fontWeight: 'bold' }}>{restaurant.name}</Typography>
                            <Button
                                variant="contained"
                                sx={{
                                    mt: 2,
                                    backgroundColor: '#ff7043',
                                    color: '#fff',
                                    '&:hover': { backgroundColor: '#ff5722' }
                                }}
                                onClick={() => handleRestaurantSelect(restaurant)}
                                fullWidth
                            >
                                Select Restaurant
                            </Button>
                        </CardContent>
                    </Card>
                ))}
            </Box>

            {selectedRestaurant && (
                <Box sx={{ mt: 3 }}>
                    <Typography variant="h5" gutterBottom align="center" sx={{ fontWeight: 'bold' }}>Select Menu Items</Typography>

                    {/* Menu Item Selection */}
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, justifyContent: 'center' }}>
                        {selectedRestaurant.menu.map((item) => (
                            <Card key={item.id} sx={{ width: 220, boxShadow: 3, borderRadius: 2 }}>
                                <CardContent>
                                    <Typography variant="h6" align="center" sx={{ fontWeight: 'bold' }}>{item.name}</Typography>
                                    <Typography variant="body1" align="center" sx={{ color: '#777' }}>₹{item.price}</Typography>
                                    <Button
                                        variant="contained"
                                        sx={{
                                            mt: 1,
                                            backgroundColor: selectedItems.includes(item.id) ? '#ff7043' : '#ffcc80',
                                            color: '#000',
                                            '&:hover': { backgroundColor: selectedItems.includes(item.id) ? '#ff5722' : '#ffb74d' },
                                        }}
                                        onClick={() => handleItemSelect(item.id)}
                                        fullWidth
                                    >
                                        {selectedItems.includes(item.id) ? 'Deselect' : 'Select'}
                                    </Button>
                                </CardContent>
                            </Card>
                        ))}
                    </Box>

                    <Typography variant="h5" gutterBottom align="center" sx={{ fontWeight: 'bold' }}>Choose Date and Time</Typography>

                    {/* Date and Time Picker */}
                    <Box sx={{ display: 'flex', gap: 2 }}>
                        <TextField
                            label="Date"
                            type="date"
                            value={orderDate}
                            onChange={(e) => setOrderDate(e.target.value)}
                            fullWidth
                            sx={{ mb: 2 }}
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                        <TextField
                            label="Time"
                            type="time"
                            value={orderTime}
                            onChange={(e) => setOrderTime(e.target.value)}
                            fullWidth
                            sx={{ mb: 2 }}
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                    </Box>

                    {/* Confirm Order Button */}
                    <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={handleConfirmOrder}
                            sx={{
                                backgroundColor: '#388e3c',
                                color: '#fff',
                                '&:hover': { backgroundColor: '#2c6e29' },
                                padding: '10px 20px',
                                fontSize: '16px'
                            }}
                        >
                            Confirm Order
                        </Button>
                    </Box>
                </Box>
            )}
        </Box>
    );
};

export default PreOrder;
