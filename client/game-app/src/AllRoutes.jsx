import React, { useContext } from "react";
import { Route, Routes } from "react-router-dom";
import { LoginContext } from "./Context/LoginContext";
import { Navigate } from "react-router-dom";
import Dashboard from "./pages/Dashboard/Dashboard";
import Home from "./pages/Home/Home";
import LoginSignup from "./pages/Login-SignUp/LoginSignup";
import Chatbot from "./pages/ChatBot/ChatBot";
import AddImage from "./Components/AddImage/AddImage";

const ProtectedRoute = ({ element }) => {
  const { isLoggedIn } = useContext(LoginContext);
  return isLoggedIn ? element : <Navigate to="/login" />;
};

const AllRoutes = () => {
  const { isLoggedIn } = useContext(LoginContext);

  return (
    <Routes>
      <Route path="/" element={isLoggedIn ? <Navigate to="/dashboard" /> : <Home />} />
      <Route path="/dashboard" element={<ProtectedRoute element={<Dashboard />} />} />
      <Route path="/login" element={<LoginSignup />} />
      <Route path="/chatbot" element={<ProtectedRoute element={<Chatbot />}/>} />
      <Route path="/test" element={<ProtectedRoute element={<AddImage />}/>} />
    </Routes>
  );
};

export default AllRoutes;
