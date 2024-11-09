// src/App.js
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import PrivateRoute from "./components/PrivateRoute";
import Notes from "./components/Notes"; // Página de notas

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<Login />} />

        {/* Private Routes */}
        <Route element={<PrivateRoute />}>
          <Route path="/notes" element={<Notes />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;


