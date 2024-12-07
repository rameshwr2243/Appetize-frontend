import React, { useState } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { Box } from '@mui/material';
import ResponsiveAppBar from './components/ResponsiveAppBar';
import Footer from './components/Footer';
import Login from './components/Login';
import Signup from './components/Signup';
import Menu from './components/Menu';
import Cart from './components/Cart';
import Home from './components/Home';
import RestaurantList from './components/RestaurantList';
import Restaurant from './components/Restaurant';
import Profile from './components/Profile';
import DiningOptions from './components/DiningOptions';
import SidebarMenu from './components/SidebarMenu';
import PreOrder from './components/PreOrder';
import CookForm from './components/CookForm';
import DateTimeSelection from './components/DateTimeSelection';
import { CartProvider } from './components/CartContext';
import { AuthProvider, useAuth } from './components/AuthContext'; // Import AuthContext
import ProtectedRoute from './components/ProtectedRoute';
import Logout from './components/Logout';
import InitiatePayment from './components/Payment/InitiatePayment';  // Corrected import

function App() {
  const [orders, setOrders] = useState([]); // State for orders
  const location = useLocation(); // Track current location
  const { isAuthenticated } = useAuth(); // Access authentication state via context

  // Handle adding orders to the cart
  const handleAddOrder = (order) => {
    setOrders((prevOrders) => [...prevOrders, order]);
  };

  // Handle submitting cook details
  const handleCookSubmit = (cookDetails) => {
    console.log('Cook details submitted:', cookDetails);
  };

  return (
    <AuthProvider>
      <CartProvider>
        <ResponsiveAppBar />
        <Box sx={{ display: 'flex', flexDirection: 'row', minHeight: 'calc(100vh - 128px)' }}>
          <SidebarMenu orders={orders} />
          <Box sx={{ flexGrow: 1, padding: '20px' }}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route
                path="/profile"
                element={
                  <ProtectedRoute>
                    <Profile />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/cart"
                element={
                  <ProtectedRoute>
                    <Cart />
                  </ProtectedRoute>
                }
              />
              <Route path="/restaurants" element={<RestaurantList />} />
              <Route path="/restaurants/:id" element={<Restaurant />} />
              <Route path="/restaurants/:restaurantId/menu" element={<Menu onAddOrder={handleAddOrder} />} />
              <Route path="/pre-ordering" element={<PreOrder />} />
              <Route path="/pre-ordering/date-time" element={<DateTimeSelection />} />
              <Route path="/dining-options" element={<DiningOptions />} />
              <Route path="/cook-list" element={<CookForm onSubmit={handleCookSubmit} />} />
              <Route path="/logout" element={<Logout />} />
              <Route
                path="/payment"
                element={
                  <ProtectedRoute>
                    <InitiatePayment />
                  </ProtectedRoute>
                }
              />
            </Routes>
          </Box>
        </Box>
        <Footer />
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
