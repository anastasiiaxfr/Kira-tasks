// index.js
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { AuthProvider } from './context/AuthContext'; // Import AuthProvider

const root = ReactDOM.createRoot(document.getElementById('root'));

// Ensure AuthProvider is wrapping the entire App
root.render(
  <AuthProvider>
    <App />
  </AuthProvider>
);
