// Home.js
import React from 'react';
import { Box, Typography } from '@mui/material';
import image6 from '../images/image6.png'; // Adjust the path according to your project structure
import ImageSlider from './ImageSlider'; // Import the ImageSlider component
import AboutUs from './AboutUs'; // Import the AboutUs component

const Home = () => (
    <Box sx={{ textAlign: 'center', padding: '0' }}>
        <Box sx={{ 
            position: 'relative', 
            height: '100vh', // Full viewport height
            display: 'flex', 
            justifyContent: 'center', 
            alignItems: 'center',
            overflow: 'hidden' // Prevent overflow
        }}>
            <img 
                src={image6} 
                alt="Appetite Logo" 
                style={{ 
                    width: '100%', // Full width
                    height: '100%', // Full height
                    objectFit: 'cover', // Cover the entire area
                    position: 'absolute',
                    top: 0,
                    left: 0
                }} 
            />
        </Box>
        
        {/* Image Slider */}
        <ImageSlider />
        
        {/* About Us Section */}
        <AboutUs />
    </Box>
);

export default Home;
