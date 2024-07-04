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

/**
 * AllRoutes component is responsible for rendering different routes based on whether the user is logged in or not.
 *
 * @return {JSX.Element} The Routes component containing the different routes.
 */
const AllRoutes = () => {
  // Get the isLoggedIn state from the LoginContext
  const { isLoggedIn } = useContext(LoginContext);

  // Render the appropriate route based on whether the user is logged in or not
  return (
    <Routes>
      {/* If the user is logged in, render the Dashboard component. Otherwise, render the Home component. */}
      <Route path="/" element={isLoggedIn ? <Dashboard /> : <Home />} />

      {/* Render the LoginSignup component for the /login route */}
      <Route path="/login" element={<LoginSignup />} />

      {/* Render the Chatbot component for the /chatbot route */}
      <Route path="/chatbot" element={<Chatbot />} />

      {/* Render any component for testing purposes here*/}
      <Route path="/test" element={<AddImage />} />
    </Routes>
  );
};

export default AllRoutes;
