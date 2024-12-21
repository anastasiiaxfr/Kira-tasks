import React from "react";
import Register from "../components/RegisterForm";
import { Container } from "@mui/material"; // Material UI components

const RegisterPage = () => {
  return (
    <Container className="page_auth" maxWidth="sm">
      <h1>Register</h1>
      <Register />
    </Container>
  );
};

export default RegisterPage;
