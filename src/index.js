import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom'; // Importing BrowserRouter
import './index.css';
import App from './App';
import { AuthProvider } from './components/AuthContext'; // <-- Import the AuthProvider
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthProvider>  {/* Wrap your App with AuthProvider */}
      <BrowserRouter> {/* Wrap App in BrowserRouter */}
        <App />
      </BrowserRouter>
    </AuthProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
