import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';

const Navbar = () => {
  const { user, logout } = useAuth();

  return (
    <header>
      <Container maxWidth="lg">
        <Stack
          direction="row"
          spacing={2}
          sx={{
            justifyContent: { xs: "center", md: "space-between" }, // Center on small screens, space-between on md and larger
            alignItems: "center",
          }}
        >
          <Link to="/" className="logo" style={{ fontWeight: 'bold', fontSize: '24px' }}>Your.Logo</Link>
          {user ? (
            <>
              <Link to="/dishes">Dishes</Link>
              <Link to="/orders">Orders</Link>
              <Button variant="outlined" onClick={logout}>Logout</Button>
            </>
          ) : (
            <Stack direction="row" spacing={2}>
              <Link to="/login">
                <Button variant="contained" >Login</Button>
              </Link>
              <Link to="/register">
                <Button variant="contained">Register</Button>
              </Link>
            </Stack>
          )}
        </Stack>
      </Container>
    </header>
  );
};

export default Navbar;
