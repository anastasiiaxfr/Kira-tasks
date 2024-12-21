// pages/Home.js
import React, { useState } from "react";
import { Container, Tabs, Tab, Paper } from "@mui/material";
import Register from "../components/RegisterForm"; // Register page
import Login from "../components/LoginForm"; // Login page
import TabPanel from "../components/TabPanel"; // TabPanel component
import { Link } from "react-router-dom";

const Home = () => {
  const [tabValue, setTabValue] = useState(0); // State to manage the active tab

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  return (
    <Container maxWidth="sm" className="page_auth">
      <Link to="/" style={{ textDecoration: "none", color: "inherit", textAlign: "center" }}>
        <h2>Your.Logo</h2>
      </Link>

      <Paper sx={{ p: 3 }} elevation={3}>
        <Tabs value={tabValue} onChange={handleTabChange} centered>
          <Tab label="Sign Up" />
          <Tab label="Sign In" />
        </Tabs>

        {/* Conditional rendering of forms based on tab value */}
        <TabPanel value={tabValue} index={0}>
          <Register />
        </TabPanel>
        <TabPanel value={tabValue} index={1}>
          <Login />
        </TabPanel>
      </Paper>
    </Container>
  );
};

export default Home;
