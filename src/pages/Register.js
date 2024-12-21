import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';


const Register = () => {
  const { register } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    await register(username, password, role);
  };

  return (
      <form onSubmit={handleRegister}>
        {/* Username Field */}
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

        {/* Password Field */}
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

        {/* Role Select Field */}
        <FormControl fullWidth sx={{ my: 2 }}>
          <InputLabel id="role-select-label">Role</InputLabel>
          <Select
            labelId="role-select-label"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            label="Role"
          >
            <MenuItem value="admin">Admin</MenuItem>
            <MenuItem value="customer">Customer</MenuItem>
          </Select>
        </FormControl>

        {/* Submit Button */}
        <Stack direction="row" sx={{ my: 2 }}>
          <Button type="submit" variant="contained" fullWidth size="large" className="btn_lg">
            Register
          </Button>
        </Stack>
      </form>
  );
};

export default Register;
