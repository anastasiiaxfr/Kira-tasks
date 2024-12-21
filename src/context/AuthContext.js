import React, { createContext, useContext, useState, useEffect } from "react";
import { registerUser, loginUser } from "../utils/api"; // Import API functions directly
import { jwtDecode } from "jwt-decode";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      //setUser(storedUser);
    }
    setLoading(false);
  }, []);

  const register = async (username, password, role) => {
    try {
      const response = await registerUser(username, password, role);
      console.log("Registration successful:", response.data);

      // Store user data in localStorage and update the context
      const userData = { username, role }; // Store basic user data (could be extended)
      localStorage.setItem("user", JSON.stringify(userData));
      alert(username);
      setUser(userData);
    } catch (error) {
      console.error("Error during registration:", error);
      throw error;
    }
  };

  const login = async (username, password) => {
    try {
      const response = await loginUser(username, password); // Call API to log in
      if (response && response.data && response.data.token) {
        const { token } = response.data;
        localStorage.setItem("token", token); // Store the token in localStorage

        // Decode the JWT token to extract user information
        const decodedUser = jwtDecode(token); // Decode the token to get user data

        // Now store the user object in localStorage, including any information from the token
        const userData = {
          username: username, // Store the username as part of user data
          role: decodedUser.role || "user", // Optionally, store role (if available in the decoded token)
          id: decodedUser.id || null, // Optionally, store user ID (if available in the decoded token)
        };
        localStorage.setItem("user", JSON.stringify(userData)); // Store in localStorage

        // Now, update the context or state with the user data
        setUser(userData); // Update the context with the logged-in user information
      } else {
        console.error("Token not found in the response");
        throw new Error("Token not found in the response");
      }
    } catch (error) {
      console.error("Error during login:", error);
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setUser(null);
  };

  return <AuthContext.Provider value={{ user, register, login, logout, loading }}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
