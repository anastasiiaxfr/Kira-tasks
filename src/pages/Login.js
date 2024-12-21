import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { FormControl, TextField, Button, Stack } from "@mui/material";

const Login = () => {
  const { login } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    await login(username, password);  // Call the login function from context
  };

  return (
    <form onSubmit={handleLogin}>
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

      {/* Submit Button */}
      <Stack direction="row" spacing={2} sx={{ my: 2 }}>
        <Button type="submit" variant="contained" fullWidth size="large" className="btn_lg">
          Login
        </Button>
      </Stack>
    </form>
  );
};

export default Login;
