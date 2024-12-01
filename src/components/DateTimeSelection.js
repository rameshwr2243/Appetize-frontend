import React, { useState } from 'react';
import { Box, Typography, TextField, Button } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';

const DateTimeSelection = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { cart, totalBill } = location.state || {};

    const [date, setDate] = useState('');
    const [time, setTime] = useState('');

    const handleSubmit = () => {
        alert(`Order Summary:\nTotal: ₹${totalBill}\nDate: ${date}\nTime: ${time}`);
        navigate('/confirmation');  // Redirect to confirmation page
    };

    return (
        <Box sx={{ padding: 3 }}>
            <Typography variant="h4" gutterBottom>Select Date and Time</Typography>
            <TextField
                label="Select Date"
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                sx={{ mb: 2 }}
                InputLabelProps={{
                    shrink: true,
                }}
            />
            <TextField
                label="Select Time"
                type="time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                InputLabelProps={{
                    shrink: true,
                }}
                sx={{ mb: 2 }}
            />
            <Button variant="contained" onClick={handleSubmit}>
                Confirm Order
            </Button>
        </Box>
    );
};

export default DateTimeSelection;
