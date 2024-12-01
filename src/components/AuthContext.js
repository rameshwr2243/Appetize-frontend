import React, { createContext, useContext, useState, useEffect } from 'react';

export const AuthContext = createContext(); // Create the AuthContext

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('jwtToken');
    if (token) {
      setIsAuthenticated(true); // Set to true if token exists
    }
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext); // Custom hook to access auth context
