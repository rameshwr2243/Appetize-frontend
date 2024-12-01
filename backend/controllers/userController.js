const nodemailer = require("nodemailer");
require("dotenv").config();

// Function to send email
const sendWelcomeEmail = async (to, subject, text) => {
  try {
    const transporter = nodemailer.createTransport({
      service: process.env.EMAIL_SERVICE,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: to,
      subject: subject,
      text: text,
    };

    await transporter.sendMail(mailOptions);
    console.log("Email sent successfully");
  } catch (error) {
    console.log("Error sending email:", error);
  }
};

// Function to register a new user and send a welcome email
const registerUser = async (req, res) => {
  const { name, email } = req.body;

  // Save the user to the database (you need to implement this)
  // Assume user registration is successful

  // Send a welcome email
  const subject = "Welcome to Our Food Delivery Platform!";
  const text = `Hi ${name},\n\nThank you for registering with our platform. We are excited to have you!`;

  await sendWelcomeEmail(email, subject, text);

  res.status(201).json({ message: "User registered and email sent!" });
};

module.exports = { registerUser };
