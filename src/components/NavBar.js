import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";

const NavBar = () => {
  const { user, logout } = useAuth();

  if (user) {
    return (
      <AppBar position="sticky">
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          <Link to="/" style={{ textDecoration: "none" }}>
            <Typography variant="h6" color="inherit">
              DishApp
            </Typography>
          </Link>
          <Box sx={{ display: "flex", gap: 2 }}>
            <Button color="inherit" component={Link} to="/dishes">
              Dishes
            </Button>

            <Button color="inherit" component={Link} to="/orders">
              Orders
            </Button>

            <Button color="inherit" onClick={logout}>
              Logout
            </Button>
          </Box>
        </Toolbar>
      </AppBar>
    );
  }
};

export default NavBar;
