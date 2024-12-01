import React from 'react';
import { Box, Typography } from '@mui/material';

const Footer = () => {
    return (
        <Box 
            component="footer" 
            textAlign="center" 
            py={3} 
            style={{ backgroundColor: '#ffc93c', color: '#000000', position: 'relative', bottom: 0, width: '100%' }} // Updated colors
        >
            <Typography variant="body1">© 2024 Food Delivery Copy Rights Reserved</Typography>
        </Box>
    );
};

export default Footer;
