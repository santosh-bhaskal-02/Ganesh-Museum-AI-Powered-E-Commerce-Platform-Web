import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar.jsx";
import Footer from "./components/Footer/Footer.jsx";
import SidebarRoutes from "./components/AdminController/SidebarRoutes.jsx";
import Login from "./components/Auth/Login.jsx";
import SignUp from "./components/Auth/SignUp.jsx";
import ForgotPassword from "./components/Auth/ForgotPassword.jsx";
import Home from "./components/Home/Home.jsx";

// AdminApp handles all routes under /admin/*
// The <Routes> here are relative to the /admin prefix set by the parent router in App.jsx
function AdminApp() {
  return (
    <>
      <Navbar />
      <div className="w-full">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard/*" element={<SidebarRoutes />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/forgot_password" element={<ForgotPassword />} />
        </Routes>
        <Footer />
      </div>
    </>
  );
}

export default AdminApp;
