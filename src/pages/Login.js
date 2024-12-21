import React from "react";
import Login from "../components/LoginForm";
import { Container } from "@mui/material"; // Material UI components

const LoginPage = () => {
  return (
    <Container className="page_auth" maxWidth="sm">
      <h1>Login</h1>
      <Login />
    </Container>
  );
};

export default LoginPage;
