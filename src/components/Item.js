import React from 'react';
import { Box, Button, Typography } from '@mui/material';

const Item = ({ item, addToCart }) => {
    return (
        <Box sx={{ border: '1px solid #ccc', padding: 2, borderRadius: 2, textAlign: 'center' }}>
            <Typography variant="h6">{item.name}</Typography>
            <Typography variant="body2">${item.price.toFixed(2)}</Typography>
            <Button variant="contained" color="primary" onClick={() => addToCart(item)}>
                Add to Cart
            </Button>
        </Box>
    );
};

export default Item;
