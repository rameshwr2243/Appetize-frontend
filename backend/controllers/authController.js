const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { sendWelcomeEmail } = require('../utils/mailer'); // Importing the mailer function

// Function to ensure the admin user is created
const ensureAdminExists = async () => {
  try {
    const adminExists = await User.findOne({ username: 'admin@fooddomain.com' });
    if (!adminExists) {
      console.log('Creating default admin account...');
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash('admin123', salt);

      const admin = new User({
        username: 'admin@fooddomain.com',
        password: hashedPassword,
        role: 'admin',
      });

      await admin.save();
      console.log('Default admin account created: admin@fooddomain.com');
    } else {
      console.log('Admin account already exists.');
    }
  } catch (error) {
    console.error('Error ensuring admin account:', error.message);
  }
};

// Register User
const registerUser = async (req, res) => {
  const { username, password } = req.body; // Expecting username to be the email
  console.log('Registering user:', username);

  try {
    // Ensure the admin account exists
    await ensureAdminExists();

    // Check if the user already exists
    const userExists = await User.findOne({ username });
    if (userExists) {
      console.log('User already exists');
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create user
    const user = await User.create({ username, password: hashedPassword });
    if (user) {
      console.log('User created successfully');

      // Send welcome email after successful registration
      await sendWelcomeEmail(username, username); // username is both email and the display name

      return res.status(201).json({ _id: user._id, username: user.username });
    } else {
      console.log('Failed to create user');
      return res.status(400).json({ message: 'Invalid user data' });
    }
  } catch (error) {
    console.error('Server error during registration:', error.message);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Login User
const loginUser = async (req, res) => {
  const { username, password } = req.body;
  console.log('Logging in user:', username);

  try {
    // Check if the user exists
    const user = await User.findOne({ username });
    if (!user) {
      console.log('User not found');
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Check password
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      console.log('Password does not match');
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    console.log('Login successful');

    const jwt = require('jsonwebtoken');

// Generate JWT token
const token = jwt.sign(
  { _id: user._id, username: user.username, role: user.role },
  process.env.JWT_SECRET, // Correct environment variable name
  { expiresIn: '1h' } // Token expires in 1 hour
);

// Send response with the JWT token
return res.status(200).json({
  message: 'Login successful',
  token,
  user: { _id: user._id, username: user.username, role: user.role }
});

  } catch (error) {
    console.error('Server error during login:', error.message);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

module.exports = { registerUser, loginUser };
