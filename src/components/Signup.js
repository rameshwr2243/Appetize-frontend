import React, { useState } from 'react';
import { Box, Button, TextField, Typography } from '@mui/material';

const Signup = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');

    const handleSignup = (e) => {
        e.preventDefault();
        // Mock signup logic here (replace with actual logic)
        console.log({ username, password, email });
        alert('Signup successful! Please login.');
    };

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                height: '100vh',
            }}
        >
            <Typography variant="h4">Sign Up</Typography>
            <form onSubmit={handleSignup}>
                <TextField
                    label="Username"
                    variant="outlined"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                    sx={{ marginBottom: '15px' }}
                />
                <TextField
                    label="Email"
                    variant="outlined"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    sx={{ marginBottom: '15px' }}
                />
                <TextField
                    label="Password"
                    variant="outlined"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    sx={{ marginBottom: '15px' }}
                />
                <Button variant="contained" type="submit">Sign Up</Button>
            </form>
        </Box>
    );
};

export default Signup;
