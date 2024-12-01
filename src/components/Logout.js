import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Snackbar } from '@mui/material';
import MuiAlert from '@mui/material/Alert';
import { useAuth } from './AuthContext';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const Logout = () => {
  const navigate = useNavigate();
  const { setIsAuthenticated } = useAuth(); // Auth context
  const [snackbarOpen, setSnackbarOpen] = React.useState(true);

  // Logout logic
  useEffect(() => {
    // Remove JWT token from localStorage
    localStorage.removeItem('jwtToken');
    // Set authentication state to false
    setIsAuthenticated(false);
    // Redirect to login page after a short delay
    setTimeout(() => {
      navigate('/login');
    }, 1500); // Show message before redirect
  }, [navigate, setIsAuthenticated]);

  // Snackbar close handler
  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  return (
    <>
      <Snackbar open={snackbarOpen} autoHideDuration={1500} onClose={handleSnackbarClose}>
        <Alert onClose={handleSnackbarClose} severity="success" sx={{ width: '100%' }}>
          You have been logged out successfully.
        </Alert>
      </Snackbar>
    </>
  );
};

export default Logout;
