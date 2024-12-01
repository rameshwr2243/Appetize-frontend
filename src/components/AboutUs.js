// AboutUs.js
import React from 'react';
import { Box, Typography } from '@mui/material';

const AboutUs = () => (
    <Box sx={{ padding: '20px', textAlign: 'center', backgroundColor: '#f0f0f0', marginTop: '20px' }}>
        <Typography variant="h4" gutterBottom>About Us</Typography>
        <Typography variant="body1">
            We are students working on this project as part of our learning process. 
            This project demonstrates a food delivery system built to showcase our skills 
            in web development and full-stack technologies.
        </Typography>
    </Box>
);

export default AboutUs; // Make sure this line is present to export the component
