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
import AutocompleteSearch from "./Components/Search/AutocompleteSearch";
import Chatbot from "./pages/ChatBot/ChatBot";
import AddImage from "./Components/AddImage/AddImage";

const AllRoutes = () => {
  const { isLoggedIn } = useContext(LoginContext);
  return (
    <Routes>
      <Route path="/" element={isLoggedIn ? <Dashboard /> : <Home />} />
      <Route path="/login" element={<LoginSignup />} />
      <Route path="/chatbot" element={<Chatbot />} />
      <Route path="/test" element={<AddImage />} />
    </Routes>
  );
};

export default AllRoutes;
