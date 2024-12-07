import React from 'react';
import { Box, Typography } from '@mui/material';
import image6 from '../images/image6.png'; // Adjust the path according to your project structure
import AboutUs from './AboutUs'; // Import the AboutUs component

const Home = () => (
    <Box sx={{ textAlign: 'center', padding: '0' }}>
        <Box sx={{ 
            position: 'relative', 
            height: '60vh', // Reduced height to fit the logo better
            display: 'flex', 
            justifyContent: 'center', 
            alignItems: 'center',
            overflow: 'hidden' // Prevent overflow
        }}>
            <img 
                src={image6} 
                alt="Appetite Logo" 
                style={{ 
                    width: 'auto', // Adjust width to maintain aspect ratio
                    height: '80%', // Adjust height to make it fit properly
                    objectFit: 'contain', // Ensure the image fits inside the box without distortion
                    position: 'absolute',
                    top: '50%', // Vertically center the logo
                    left: '50%', // Horizontally center the logo
                    transform: 'translate(-50%, -50%)' // Adjust position based on its own size
                }} 
            />
        </Box>
        
        {/* About Us Section */}
        <AboutUs />
    </Box>
);

export default Home;
