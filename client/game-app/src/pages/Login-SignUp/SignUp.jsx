import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import FilledBtn from "../../Components/ui/Buttons/FilledBtn";
import { LoginContext } from "../../Context/LoginContext";
import { ToastContainer, toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Cookies from "js-cookie";

/**
 * SignUp component for user registration
 * @returns {JSX.Element} The SignUp component
 */
const SignUp = () => {
  // Import API URL from environment variables
  const url = import.meta.env.VITE_API_URL;

  // Use Context hook to access login state
  const { isLoggedIn, setIsLoggedIn } = useContext(LoginContext);

  // Use navigate hook from react-router-dom
  const navigate = useNavigate();

  // State variables for form data and OTP mode
  const [formData, setFormData] = useState({
    username: "",
    name: "",
    email: "",
    password: "",
  });
  const [isOTPMode, setIsOTPMode] = useState(false);
  const [email, setEmail] = useState(null);
  const [otp, setOtp] = useState("");

  /**
   * Handler for form submission in signup mode
   * @param {Event} e - The form submission event
   */
  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${url}/api/users/signup`, formData);
      setEmail(response.data.data.email);
      setIsOTPMode(true);
      toast.success("OTP sent to your email. Please verify.", {
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
    } catch (error) {
      console.error("Error:", error);
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

  /**
   * Handler for form submission in OTP verification mode
   * @param {Event} e - The form submission event
   */
  const handleOTPVerification = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${url}/api/users/verify`, {
        email,
        otp,
      });
      Cookies.set("token", response.data.token, { expires: 7 });
      setIsLoggedIn(true);
      toast.success("OTP verified successfully.", {
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
          navigate("/");
        },
      });
    } catch (error) {
      console.error("Error:", error);
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

  /**
   * Handler for form input change
   * @param {Event} e - The input change event
   */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  /**
   * Handler for OTP input change
   * @param {Event} e - The input change event
   */
  const handleOTPChange = (e) => {
    setOtp(e.target.value);
  };

  return (
    <div>
      {/* Render different forms based on OTP mode */}
      {isOTPMode ? (
        // Form for OTP verification
        <form onSubmit={handleOTPVerification} className="otp-form">
          <div className="form-fields">
            <input
              type="text"
              id="otp"
              name="otp"
              placeholder="Enter OTP"
              className="form-input"
              required
              value={otp}
              onChange={handleOTPChange}
            />
            <label htmlFor="otp" className="form-label">
              OTP
            </label>
          </div>
          <FilledBtn
            value="VERIFY OTP"
            styles={{ fontSize: "16px", margin: "20px auto" }}
          />
        </form>
      ) : (
        // Form for signup
        <form onSubmit={handleSignUp} className="ls-form">
          <div className="form-fields">
            {/* Username Field */}
            <input
              type="text"
              id="username"
              name="username"
              placeholder="User Name"
              className="form-input"
              required
              value={formData.username}
              onChange={handleChange}
            />
            <label htmlFor="username" className="form-label">
              UserName
            </label>
          </div>
          <div className="form-fields">
            {/* Name Field */}
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Name"
              className="form-input"
              required
              value={formData.name}
              onChange={handleChange}
            />
            <label htmlFor="name" className="form-label">
              Name
            </label>
          </div>
          <div className="form-fields">
            {/* Email Field */}
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Email"
              className="form-input"
              required
              value={formData.email}
              onChange={handleChange}
            />
            <label htmlFor="email" className="form-label">
              Email
            </label>
          </div>
          <div className="form-fields">
            {/* Password Field */}
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Password"
              className="form-input"
              required
              value={formData.password}
              onChange={handleChange}
            />
            <label htmlFor="password" className="form-label">
              Password
            </label>
          </div>
          {/* Register Btn */}
          <FilledBtn value="REGISTER" styles={{ fontSize: "16px" }} />
        </form>
      )}
    </div>
  );
};

export default SignUp;
