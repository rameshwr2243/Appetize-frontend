import React, { useState, useEffect } from 'react';
import { Box, Typography } from '@mui/material';

// Import images
import image1 from '../images/image1.jpg'; // Adjust the path according to your project structure
import image2 from '../images/image2.jpg';
import image3 from '../images/image3.jpg';
import image4 from '../images/image4.jpg';
import image5 from '../images/image5.jpg';

const images = [
    image1,
    image2,
    image3,
    image4,
    image5
];

const ImageSlider = () => {
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
        }, 5000); // Change image every 5 seconds

        return () => clearInterval(interval); // Cleanup on unmount
    }, []);

    return (
        <Box sx={{ position: 'relative', overflow: 'hidden', width: '100%', height: '500px' }}>
            <img
                src={images[currentIndex]}
                alt={`Slide ${currentIndex + 1}`}
                style={{ width: '100%', height: '100%', objectFit: 'contain' }} // Use 'contain' to fit the image within the container
            />
            <Typography 
                variant="h6" 
                sx={{ position: 'absolute', bottom: 20, left: 20, color: '#fff', backgroundColor: 'rgba(0, 0, 0, 0.5)', padding: 1 }}
            >
            </Typography>
        </Box>
    );
};

export default ImageSlider;
