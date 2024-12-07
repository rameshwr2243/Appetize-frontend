import React, { useState } from 'react';
import { Box, Button, TextField, Typography, Container, CssBaseline, Snackbar } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import MuiAlert from '@mui/material/Alert';
import { useNavigate } from 'react-router-dom';

const theme = createTheme();

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const Login = () => {
  const [isRegister, setIsRegister] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');

  const navigate = useNavigate();

  // Close snackbar
  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  // Store JWT in localStorage
  const storeToken = (token) => {
    localStorage.setItem('jwtToken', token);
  };

  // Handle login functionality
  const handleLogin = async () => {
    if (!username || !password) {
      setSnackbarMessage('Username and password are required.');
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
      return;
    }

    setLoading(true);

    try {
      const response = await fetch('https://appetize.onrender.com/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (response.ok) {
        console.log('Login successful:', data);
        storeToken(data.token); // Save the token
        navigate('/'); // Redirect to home page
        setSnackbarMessage('Login successful!');
        setSnackbarSeverity('success');
        setSnackbarOpen(true);
      } else {
        console.error('Login failed:', data.message);
        setSnackbarMessage(data.message || 'Login failed. Please try again.');
        setSnackbarSeverity('error');
        setSnackbarOpen(true);
      }
    } catch (error) {
      console.error('Error logging in:', error);
      setSnackbarMessage('Error logging in. Please try again later.');
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
    } finally {
      setLoading(false);
    }
  };

  // Handle registration functionality
  const handleRegister = async () => {
    if (!username || !password) {
      setSnackbarMessage('Username and password are required.');
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
      return;
    }

    setLoading(true);

    try {
      const response = await fetch('https://appetize.onrender.com/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (response.ok) {
        console.log('Registration successful:', data);
        setSnackbarMessage('Registration successful! Please log in.');
        setSnackbarSeverity('success');
        setSnackbarOpen(true);
      } else {
        console.error('Registration failed:', data.message);
        setSnackbarMessage(data.message || 'Registration failed. Please try again.');
        setSnackbarSeverity('error');
        setSnackbarOpen(true);
      }
    } catch (error) {
      console.error('Error registering:', error);
      setSnackbarMessage('Error registering. Please try again later.');
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
    } finally {
      setLoading(false);
    }
  };

  // Toggle between Login and Register forms
  const toggleForm = () => {
    setIsRegister(!isRegister);
    setUsername('');
    setPassword('');
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            padding: '20px',
            backgroundColor: '#fff',
            borderRadius: '10px',
            boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
          }}
        >
          <Typography component="h1" variant="h5">
            {isRegister ? 'Register' : 'Login'}
          </Typography>
          <Box component="form" noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="username"
              label="Username"
              name="username"
              autoComplete="username"
              autoFocus
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              variant="outlined"
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              variant="outlined"
            />
            <Button
              type="button"
              fullWidth
              variant="contained"
              sx={{
                mt: 3,
                mb: 2,
                backgroundColor: '#ffc93c',
                color: '#000',
                '&:hover': {
                  backgroundColor: '#ffb300',
                },
              }}
              onClick={isRegister ? handleRegister : handleLogin}
              disabled={loading}
            >
              {loading ? (isRegister ? 'Registering...' : 'Logging in...') : (isRegister ? 'Register' : 'Login')}
            </Button>
            <Button
              type="button"
              fullWidth
              variant="text"
              sx={{ mt: 1, textTransform: 'none' }}
              onClick={toggleForm}
            >
              {isRegister ? 'Already have an account? Login' : "Don't have an account? Register"}
            </Button>
          </Box>
        </Box>

        <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={handleSnackbarClose}>
          <Alert onClose={handleSnackbarClose} severity={snackbarSeverity} sx={{ width: '100%' }}>
            {snackbarMessage}
          </Alert>
        </Snackbar>
      </Container>
    </ThemeProvider>
  );
};

export default Login;
