import React, { useState } from 'react';
import { Grid, TextField, Button, Card, CardContent, Typography, CardActions, Box } from '@mui/material';

const CookPortal = () => {
    const [cookDetailsList, setCookDetailsList] = useState([]);
    const [newDish, setNewDish] = useState({
        dish: '',
        name: '',
        description: '',
        availableTime: '',
        price: '',
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewDish((prevDish) => ({ ...prevDish, [name]: value }));
    };

    const handleAddDish = () => {
        if (
            newDish.dish &&
            newDish.name &&
            newDish.description &&
            newDish.availableTime &&
            newDish.price
        ) {
            setCookDetailsList((prevList) => [...prevList, newDish]);
            setNewDish({
                dish: '',
                name: '',
                description: '',
                availableTime: '',
                price: '',
            });
        } else {
            alert('Please fill out all fields!');
        }
    };

    // Razorpay Payment Handler
    const handlePayment = (dish) => {
        const options = {
            key: "YOUR_RAZORPAY_KEY_ID", // Replace with your Razorpay key ID
            amount: dish.price * 100, // Razorpay works with paise; convert ₹ to paise
            currency: "INR",
            name: "Food Order Payment",
            description: `Payment for ${dish.dish}`,
            image: "/path-to-your-logo.png", // Add a logo URL if available
            handler: (response) => {
                // This function will be called when payment is successful
                alert("Payment Successful! Payment ID: " + response.razorpay_payment_id);
            },
            prefill: {
                name: "Customer Name", // You can pre-fill this
                email: "customer@example.com", // Pre-fill customer email
                contact: "9999999999", // Pre-fill customer contact number
            },
            theme: {
                color: "#3399cc", // Customize payment window color
            },
        };

        const razorpay = new window.Razorpay(options);
        razorpay.open();
    };

    return (
        <Box sx={{ display: 'flex', padding: '20px', gap: '20px' }}>
            {/* Form Section */}
            <Box sx={{ flex: 1 }}>
                <Typography variant="h6" sx={{ marginBottom: '10px' }}>
                    Add New Dish
                </Typography>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label="Dish Name"
                            name="dish"
                            value={newDish.dish}
                            onChange={handleInputChange}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label="Cook Name"
                            name="name"
                            value={newDish.name}
                            onChange={handleInputChange}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label="Description"
                            name="description"
                            value={newDish.description}
                            onChange={handleInputChange}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            fullWidth
                            label="Available Time"
                            name="availableTime"
                            value={newDish.availableTime}
                            onChange={handleInputChange}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            fullWidth
                            label="Price"
                            name="price"
                            type="number"
                            value={newDish.price}
                            onChange={handleInputChange}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={handleAddDish}
                        >
                            Add Dish
                        </Button>
                    </Grid>
                </Grid>
            </Box>

            {/* Grid Section */}
            <Box sx={{ flex: 2 }}>
                <Typography variant="h6" sx={{ marginBottom: '10px' }}>
                    Dish List
                </Typography>
                <Grid container spacing={2}>
                    {cookDetailsList.map((cook, index) => (
                        <Grid item xs={12} sm={6} md={4} key={index}>
                            <Card>
                                <CardContent>
                                    <Typography variant="h5" component="div">
                                        {cook.dish}
                                    </Typography>
                                    <Typography variant="body2" color="textSecondary">
                                        Cook: {cook.name}
                                    </Typography>
                                    <Typography variant="body1">
                                        {cook.description}
                                    </Typography>
                                    <Typography variant="body2" color="textSecondary">
                                        Available Time: {cook.availableTime}
                                    </Typography>
                                    <Typography variant="body2" color="textSecondary">
                                        Price: ₹{cook.price}
                                    </Typography>
                                </CardContent>
                                <CardActions>
                                    <Button
                                        size="small"
                                        sx={{
                                            backgroundColor: '#ffc93c',
                                            color: '#000',
                                            '&:hover': {
                                                backgroundColor: '#ffb300',
                                            },
                                        }}
                                        onClick={() => handlePayment(cook)}
                                    >
                                        Order Now
                                    </Button>
                                </CardActions>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Box>
        </Box>
    );
};

export default CookPortal;
