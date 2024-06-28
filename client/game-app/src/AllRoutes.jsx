import React, { useContext } from "react";
import Login from "./pages/Login-SignUp/Login";
import SignUp from "./pages/Login-SignUp/SignUp";
import { Route, Routes } from "react-router-dom";
import { LoginContext } from "./Context/LoginContext";
import Dashboard from "./pages/Dashboard/Dashboard";
import Home from "./pages/Home/Home";
import LoginSignup from "./pages/Login-SignUp/LoginSignup";
import FilledBtn from "./Components/ui/Buttons/FilledBtn";
import OutlineBtn from "./Components/ui/Buttons/OutlineBtn";

const AllRoutes = () => {
  const { isLoggedIn } = useContext(LoginContext);
  return (
    <Routes>
      <Route path="/" element={isLoggedIn ? <Dashboard /> : <Home />} />
      <Route path="/login" element={<LoginSignup />} />
      <Route path="/test" element={<OutlineBtn value="PLAY NOW"/>} />
    </Routes>
  );
};

export default AllRoutes;
