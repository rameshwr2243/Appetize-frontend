import React, { useState } from 'react';
import { Box, Typography, Button, Grid, Card, CardContent } from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';

const restaurantMenus = {
    1: [
        { id: 1, name: 'Paneer Butter Masala', price: 220 },
        { id: 2, name: 'Chicken Biryani', price: 180 },
        { id: 3, name: 'Butter Naan', price: 40 },
        { id: 4, name: 'Dal Tadka', price: 150 },
    ],
    2: [
        { id: 1, name: 'Veg Biryani', price: 200 },
        { id: 2, name: 'Chilli Paneer', price: 180 },
        { id: 3, name: 'Garlic Naan', price: 50 },
        { id: 4, name: 'Mixed Raita', price: 60 },
    ],
    3: [
        { id: 1, name: 'Fried Rice', price: 180 },
        { id: 2, name: 'Spring Rolls', price: 150 },
        { id: 3, name: 'Sweet and Sour Chicken', price: 220 },
        { id: 4, name: 'Ice Cream', price: 80 },
    ],
    4: [
        { id: 1, name: 'Hyderabadi Biryani', price: 300 },
        { id: 2, name: 'Mutton Rogan Josh', price: 350 },
        { id: 3, name: 'Raita', price: 70 },
        { id: 4, name: 'Gulab Jamun', price: 100 },
    ],
    5: [
        { id: 1, name: 'Fries', price: 100 },
        { id: 2, name: 'Sandwich', price: 120 },
        { id: 3, name: 'Soft Drink', price: 50 },
        { id: 4, name: 'Pasta', price: 200 },
    ],
};

const Menu = () => {
    const { restaurantId } = useParams();
    const navigate = useNavigate();
    const [cart, setCart] = useState({});

    // Check if restaurantId is valid
    if (!restaurantId || !restaurantMenus[restaurantId]) {
        return (
            <Box sx={{ padding: 3 }}>
                <Typography variant="h4">Invalid Restaurant ID</Typography>
            </Box>
        );
    }

    const menu = restaurantMenus[restaurantId] || [];

    const handleAddQuantity = (itemId) => {
        setCart((prevCart) => ({
            ...prevCart,
            [itemId]: (prevCart[itemId] || 0) + 1,
        }));
    };

    const handleRemoveQuantity = (itemId) => {
        setCart((prevCart) => {
            const newQuantity = (prevCart[itemId] || 1) - 1;
            if (newQuantity > 0) {
                return { ...prevCart, [itemId]: newQuantity };
            } else {
                const { [itemId]: _, ...rest } = prevCart;
                return rest;
            }
        });
    };

    const calculateTotalBill = () => {
        return Object.keys(cart).reduce((total, itemId) => {
            const item = menu.find(menuItem => menuItem.id === parseInt(itemId));
            return total + (item.price * (cart[itemId] || 0));
        }, 0);
    };

    const totalBill = calculateTotalBill();

    const handlePayment = () => {
        if (totalBill > 0) {
            navigate('/pre-ordering/date-time', { state: { cart, totalBill } });
        }
    };

    return (
        <Box sx={{ flexGrow: 1, padding: 3 }}>
            <Typography variant="h4" sx={{ mb: 3 }}>Menu</Typography>
            <Grid container spacing={2}>
                {menu.map((item) => (
                    <Grid item xs={12} sm={6} key={item.id}>
                        <Card sx={{ boxShadow: 3 }}>
                            <CardContent>
                                <Typography variant="h6">{item.name}</Typography>
                                <Typography variant="body2" color="textSecondary">Price: ₹{item.price}</Typography>
                                <Box sx={{ mt: 2 }}>
                                    <Button
                                        variant="contained"
                                        onClick={() => handleRemoveQuantity(item.id)}
                                        disabled={!cart[item.id]}
                                        sx={{ mr: 1 }}
                                    >
                                        -
                                    </Button>
                                    <Typography display="inline" sx={{ fontSize: 18, mr: 1 }}>
                                        {cart[item.id] || 0}
                                    </Typography>
                                    <Button
                                        variant="contained"
                                        onClick={() => handleAddQuantity(item.id)}
                                    >
                                        +
                                    </Button>
                                </Box>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
            <Box sx={{ mt: 4, padding: 2, border: '1px solid #ccc', borderRadius: 2 }}>
                <Typography variant="h5">Total Bill: ₹{totalBill}</Typography>
                <Button
                    variant="contained"
                    color="primary"
                    disabled={totalBill === 0}
                    onClick={handlePayment}
                    sx={{ mt: 2 }}
                >
                    Proceed to Payment
                </Button>
            </Box>
        </Box>
    );
};

export default Menu;
