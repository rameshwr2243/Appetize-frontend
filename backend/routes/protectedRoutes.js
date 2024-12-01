const express = require('express');
const router = express.Router();
const authenticate = require('../middlewares/authenticate'); // Import middleware

// Protected route
router.get('/dashboard', authenticate, (req, res) => {
  res.status(200).json({
    message: 'Welcome to the dashboard',
    user: req.user, // Contains user data from JWT
  });
});

// Another protected route
router.get('/profile', authenticate, (req, res) => {
  res.status(200).json({ message: 'This is your profile', user: req.user });
});

module.exports = router;
