import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate from react-router-dom
import { useAuth } from "../context/AuthContext"; // Import useAuth from context
import { FormControl, TextField, Button, Stack } from "@mui/material"; // Material UI components

const Login = () => {
  const { login } = useAuth(); // Destructure the login function from the AuthContext
  const navigate = useNavigate(); // Hook to navigate to other routes

  const [username, setUsername] = useState(""); // State for storing username input
  const [password, setPassword] = useState(""); // State for storing password input
  const [error, setError] = useState(""); // State for capturing login errors

  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent default form submission
    setError(""); // Reset the error message before every login attempt

    try {
      // Call login function from context
      await login(username, password);

      // After successful login, redirect to the dishes page
      navigate("/dishes");
    } catch (error) {
      // Set error message if login fails
      console.error("Login failed:", error);
      setError("Login failed. Please check your credentials.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Username Field */}
      <FormControl fullWidth sx={{ my: 2 }}>
        <TextField
          label="Username"
          variant="outlined"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          fullWidth
        />
      </FormControl>

      {/* Password Field */}
      <FormControl fullWidth sx={{ my: 2 }}>
        <TextField
          label="Password"
          type="password"
          variant="outlined"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          fullWidth
        />
      </FormControl>

      {/* Display error if login fails */}
      {error && <div style={{ color: "red", marginBottom: "10px" }}>{error}</div>}

      {/* Submit Button */}
      <Stack direction="row" spacing={2} sx={{ my: 2 }}>
        <Button type="submit" variant="contained" fullWidth size="large">
          Login
        </Button>
      </Stack>
    </form>
  );
};

export default Login;
