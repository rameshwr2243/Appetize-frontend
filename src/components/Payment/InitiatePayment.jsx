/* global Razorpay */
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

const InitiatePayment = () => {
  const [amount, setAmount] = useState(500); // Example amount in INR
  const history = useHistory(); // To redirect user if not authenticated

  // Check if the user is authenticated
  const isAuthenticated = () => {
    const token = localStorage.getItem("authToken");
    return !!token; // Returns true if the token exists
  };

  // Function to initiate payment
  const initiatePayment = async () => {
    if (!isAuthenticated()) {
      // Redirect to login page if not authenticated
      window.location.href = "/login"; // Direct user to login page
      return;
    }

    try {
      // Step 1: Create order from backend
      const response = await fetch("https://appetize.onrender.com/api/payments/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount }) // Send the amount
      });
      const order = await response.json();

      // Step 2: Ensure Razorpay SDK is loaded
      if (typeof Razorpay === "undefined") {
        console.error("Razorpay SDK not loaded. Ensure it is included in your index.html file.");
        return;
      }

      // Step 3: Open Razorpay Checkout
      const options = {
        key: "rzp_test_fCw6ls2A54GWKg", // Replace with your Razorpay key
        amount: order.amount,
        currency: order.currency,
        name: "Appetize",
        description: "Food Order Payment",
        order_id: order.id, // Order ID from backend
        prefill: {
          name: "Customer Name",
          email: "customer@example.com",
          contact: "9999999999"
        },
        theme: {
          color: "#F37254"
        },
        handler: async function (response) {
          // Step 4: Verify payment
          const verificationResponse = await fetch(
            "https://appetize.onrender.com/api/payments/verify-payment",
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature
              })
            }
          );

          const verificationData = await verificationResponse.json();
          alert(verificationData.message);
        }
      };

      const rzp = new Razorpay(options);
      rzp.open();
    } catch (error) {
      console.error("Payment initiation failed:", error);
    }
  };

  return (
    <div>
      <button onClick={initiatePayment}>Pay Now</button>
    </div>
  );
};

export default InitiatePayment;
