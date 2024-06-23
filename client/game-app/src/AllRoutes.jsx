import React, { useContext } from "react";
import Login from "./pages/Login-SignUp/Login";
import SignUp from "./pages/Login-SignUp/SignUp";
import { Route, Routes } from "react-router-dom";
import { LoginContext } from "./Context/LoginContext";
import Dashboard from "./pages/Dashboard/Dashboard";
import Home from "./pages/Home/Home";
import LoginSignup from "./pages/Login-SignUp/LoginSignup";
import FilledBtn from "./Components/ui/Buttons/FilledBtn";

const AllRoutes = () => {
  const { isLoggedIn } = useContext(LoginContext);
  return (
    <Routes>
      <Route path="/" element={isLoggedIn ? <Dashboard /> : <Home />} />
      <Route path="/login" element={<LoginSignup />} />
      <Route path="/check" element={<FilledBtn value="view-all"/>} />
    </Routes>
  );
};

export default AllRoutes;
