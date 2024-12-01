const nodemailer = require('nodemailer');
require('dotenv').config(); // Load environment variables

// Cached transporter for efficiency
let transporter;

// Function to get or create a transporter
const getTransporter = () => {
  if (!transporter) {
    transporter = nodemailer.createTransport({
      service: 'gmail', // Gmail service
      auth: {
        user: process.env.GMAIL_USER, // Gmail address from .env
        pass: process.env.GMAIL_PASS, // App password from .env
      },
    });
  }
  return transporter;
};

// Function to send a welcome email
const sendWelcomeEmail = async (toEmail, username) => {
  try {
    // Validate input parameters
    if (!toEmail || typeof toEmail !== 'string') {
      throw new Error('Invalid or missing recipient email address');
    }
    if (!username || typeof username !== 'string') {
      throw new Error('Invalid or missing username');
    }

    // Prepare transporter
    const transporter = getTransporter();

    // Define mail options
    const mailOptions = {
      from: `"Support" <${process.env.GMAIL_USER}>`, // Sender email
      to: toEmail.trim(),
      subject: 'Welcome to Our Service!',
      html: `
        <h3>Hello ${username},</h3>
        <p>Thank you for registering with us! We’re excited to have you on board.</p>
        <p>Best Regards,<br>The Support Team</p>
      `,
    };

    // Verify and send email
    await transporter.verify();  // Verify transporter
    const info = await transporter.sendMail(mailOptions); // Send email

    console.log(`✅ Email successfully sent to: ${toEmail}`);
    console.log('📩 Email details:', info); // Log email info for debugging
  } catch (error) {
    console.error('❌ Error in sendWelcomeEmail:', error.message);
  }
};

module.exports = { sendWelcomeEmail };
