import React, { useContext } from 'react';
import { Box, Typography, Button } from '@mui/material';
import { CartContext } from './CartContext';
import { useAuth } from './AuthContext'; // Importing useAuth from AuthContext to access user info and logout

const Profile = () => {
    const { state } = useContext(CartContext); // Cart data context
    const { user, logout } = useAuth(); // `user` provides user role and `logout` for logout functionality

    // Dummy data for order counts (replace with actual API calls or logic)
    const adminOrderCount = 25; // Example: Total orders for admin to view
    const userOrderCount = state.cart.length; // Orders made by the logged-in user

    const handleLogout = () => {
        logout();
        console.log("Logged out");
    };

    const handleHelp = () => {
        alert("Help section coming soon!");
    };

    return (
        <Box sx={{ padding: 2 }}>
            <Typography variant="h4">User Profile</Typography>

            {/* Display information based on the role */}
            {user.role === 'admin' ? (
                <Box>
                    <Typography variant="h6">Admin Dashboard</Typography>
                    <Typography>Total Orders Today: {adminOrderCount}</Typography>
                    {/* You can also calculate monthly orders if needed */}
                </Box>
            ) : (
                <Box>
                    <Typography variant="h6">Your Orders</Typography>
                    <Typography>Total Orders: {userOrderCount}</Typography>
                    <Box sx={{ margin: 1 }}>
                        {state.cart.length > 0 ? (
                            state.cart.map((item, index) => (
                                <Typography key={index}>
                                    {item.name} - ${item.price}
                                </Typography>
                            ))
                        ) : (
                            <Typography>No orders placed yet.</Typography>
                        )}
                    </Box>
                </Box>
            )}

            {/* Help and Logout Buttons */}
            <Box sx={{ margin: 1 }}>
                <Button variant="contained" color="primary" onClick={handleHelp}>
                    Help
                </Button>
            </Box>
            <Box sx={{ margin: 1 }}>
                <Button variant="contained" color="secondary" onClick={handleLogout}>
                    Logout
                </Button>
            </Box>
        </Box>
    );
};

export default Profile;
