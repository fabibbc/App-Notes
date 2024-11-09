// src/context/AuthContext.js
import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token") || null);

  useEffect(() => {
    if (token) {
      console.log('Token found: ', token);  // Confirm token value
      axios.defaults.headers.common["x-auth-token"] = token;
      console.log('Fetching user');
      fetchUser();
    }
  }, [token]);

  const fetchUser = async () => {
    console.log('Fetching user...');
    try {
      const response = await axios.get("http://localhost:5000/api/auth");
      console.log(response);
      setUser(response.data);
    } catch (error) {
      console.log("User not authenticated", error);
      setUser(null);
    }
  };

  const login = async (credentials) => {
    console.log(credentials)
    const response = await axios.post("http://localhost:5000/api/auth/login", credentials);
    console.log(response);
    localStorage.setItem("token", response.data.token);
    setToken(response.data.token);
    setUser(response.data.user);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
    setUser(null);    
    delete axios.defaults.headers.common["x-auth-token"];
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
