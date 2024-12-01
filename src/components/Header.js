import React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';

const Header = () => {
    return (
        <AppBar position="static" style={{ backgroundColor: '#ffc93c' }}> {/* Changed the color to #ffc93c */}
            <Toolbar>
                <Typography variant="h6" style={{ flexGrow: 1 }}>
                    Food Delivery
                </Typography>
                <Link to="/" style={{ color: 'white', textDecoration: 'none', marginRight: '16px' }}>
                    <Button color="inherit">Home</Button>
                </Link>
                <Link to="/restaurants" style={{ color: 'white', textDecoration: 'none', marginRight: '16px' }}>
                    <Button color="inherit">Restaurants</Button>
                </Link>
                <Link to="/profile" style={{ color: 'white', textDecoration: 'none' }}>
                    <Button color="inherit">Profile</Button>
                </Link>
            </Toolbar>
        </AppBar>
    );
};

export default Header;
