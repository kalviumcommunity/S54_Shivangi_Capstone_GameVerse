import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast, Bounce } from "react-toastify";
import axios from "../../utils/axiosConfig";
import { LoginContext } from "../../Context/LoginContext";
import FilledBtn from "../../Components/ui/Buttons/FilledBtn";
import "react-toastify/dist/ReactToastify.css";
import Cookies from "js-cookie";

/**
 * Login component for user authentication.
 * @returns {JSX.Element} The Login component.
 */
const Login = () => {
  // API endpoint URL
  const url = import.meta.env.VITE_API_URL;
  // Context from LoginContext
  const { setIsLoggedIn } = useContext(LoginContext);
  // State variables for username and password
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  // Navigate hook for routing
  const navigate = useNavigate();

  /**
   * Handles the user login form submission.
   * @param {Event} e - The form submission event.
   */
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      // Send POST request to login API endpoint
      const response = await axios.post(`${url}/api/users/login`, {
        username,
        password,
      });
      // Set the JWT token in a cookie
      Cookies.set("token", response.data.token, { expires: 7 });
      // Update the login state
      setIsLoggedIn(true);
      // Display success toast message
      toast.success(response.data.message, {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Bounce,
        onClose: () => {
          // Redirect to home page on toast close
          navigate("/");
        },
      });
    } catch (error) {
      // Display error toast message
      console.log("Error:", error.response.data.message);
      toast.error(error.response.data.message, {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Bounce,
      });
    }
  };

  return (
    <>
      <div>
        <form onSubmit={handleLogin} className="ls-form">
          {/* Username input field */}
          <div className="form-fields">
            <input
              type="text"
              id="username"
              name="username"
              placeholder="User Name"
              className="form-input"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <label htmlFor="username" className="form-label">
              UserName
            </label>
          </div>
          {/* Password input field */}
          <div className="form-fields">
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Password"
              className="form-input"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <label htmlFor="password" className="form-label">
              Password
            </label>
          </div>
          {/* Login button */}
          <FilledBtn
            type="submit"
            value="LOGIN"
            styles={{ fontSize: "16px" }}
          />
        </form>
      </div>
    </>
  );
};

export default Login;
