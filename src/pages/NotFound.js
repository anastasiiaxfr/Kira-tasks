// pages/NotFound.js
import React from 'react';
import { Box } from '@mui/material';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        textAlign: 'center',
      }}
    >

      <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
        <h2>Your.Logo</h2>
      </Link>
      <h1>404 - Page Not Found</h1>
    </Box>
  );
};

export default NotFound;
