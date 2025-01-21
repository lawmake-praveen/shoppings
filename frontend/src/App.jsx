import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./styles/common.scss";
import "./styles/Auth.scss";
import "./styles/Dashboard.scss";
import Login from "./pages/auth/Login";
import Dashboard from "./pages/Dashboard";
import Navbar from "./components/Navbar";
import Register from "./pages/auth/Register";

function App() {
  return (
    <div className="app">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" exact element={<Login />} />
          <Route path="/register" exact element={<Register />} />
          <Route path="/dashboard" exact element={<Dashboard />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
