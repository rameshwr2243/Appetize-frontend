import React from 'react';
import { Box, Typography } from '@mui/material';

const AboutUs = () => (
    <Box sx={{ padding: '20px', textAlign: 'center', backgroundColor: '#f0f0f0', marginTop: '20px' }}>
        {/* Reduced font size for the "About Us" heading */}
        <Typography variant="h6" gutterBottom>About Us</Typography>
        <Typography variant="body1">
            We are students working on this project as part of our learning process. 
            This project demonstrates a food delivery system built to showcase our skills 
            in web development and full-stack technologies.
        </Typography>
    </Box>
);

export default AboutUs;
