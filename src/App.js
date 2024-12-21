import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext";
import { Container, Box } from "@mui/material";

import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Dishes from "./pages/Dishes";
import Orders from "./pages/Orders";
import NotFound from "./pages/NotFound";
import "./styles/globals.sass";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();
  if (loading) return <div>Loading...</div>;
  return user ? children : <Navigate to="/" />;
};

const App = () => {
  const { user, loading } = useAuth();

  useEffect(() => {
    if (user) {
      if (user.role === "admin") {
        window.location.replace("/dishes");
      } else if (user.role === "user") {
        window.location.replace("/orders");
      }
    }
  }, [user]);

  if (loading) return <div>Loading...</div>;

  return (
    <AuthProvider>
      <Router>
        <Container maxWidth="sm" className="page_auth">
          <Routes>
            <Route
              path="/dishes"
              element={
                <PrivateRoute>
                  <Dishes />
                </PrivateRoute>
              }
            />
            <Route
              path="/orders"
              element={
                <PrivateRoute>
                  <Orders />
                </PrivateRoute>
              }
            />
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Container>
      </Router>
    </AuthProvider>
  );
};

export default App;
