import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";

const Register = () => {
  const { register } = useAuth();
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [error, setError] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");

    try {
      await register(username, password, role);
      navigate("/dishes");
    } catch (error) {
      setError("Registration failed. Please try again.");
      console.error("Error during registration:", error);
    }
  };

  return (
    <form onSubmit={handleRegister}>
      <FormControl fullWidth sx={{ my: 2 }}>
        <TextField
          id="outlined-basic"
          label="Your Name"
          variant="outlined"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </FormControl>

      <FormControl fullWidth sx={{ my: 2 }}>
        <TextField
          id="outlined-password-input"
          label="Password"
          type="password"
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </FormControl>

      <FormControl fullWidth sx={{ my: 2 }}>
        <InputLabel id="role-select-label">Role</InputLabel>
        <Select labelId="role-select-label" value={role} onChange={(e) => setRole(e.target.value)} label="Role">
          <MenuItem value="admin">Admin</MenuItem>
          <MenuItem value="customer">Customer</MenuItem>
        </Select>
      </FormControl>

      {error && <div style={{ color: "red", marginBottom: "10px" }}>{error}</div>}

      <Stack direction="row" sx={{ my: 2 }}>
        <Button type="submit" variant="contained" fullWidth size="large">
          Register
        </Button>
      </Stack>
    </form>
  );
};

export default Register;
