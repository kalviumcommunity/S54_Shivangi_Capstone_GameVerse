import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import FilledBtn from "../../Components/ui/Buttons/FilledBtn";
import { LoginContext } from "../../Context/LoginContext";
import { ToastContainer, toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SignUp = () => {
  const url = import.meta.env.VITE_API_URL;
  const { isLoggedIn, setIsLoggedIn } = useContext(LoginContext);
  const navigate = useNavigate();
  //form to make the request
  const [formData, setFormData] = useState({
    username: "",
    name: "",
    email: "",
    password: "",
  });

  // function to handle signup
  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${url}/api/users/signup`, formData);
      localStorage.setItem("token", response.data.token); // Save token
      setIsLoggedIn(true);
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
          setIsLoggedIn(true);
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

  // function to alter formData
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <div>
      <form onSubmit={handleSignUp} className="ls-form">
        {/* <div className="signup_form"> */}
        <div className="form-fields">
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
        {/* <div className="form-fields"> */}
        <FilledBtn value="REGISTER" styles={{ fontSize: "16px" }} />
        {/* </div> */}
        {/* </div> */}
      </form>
    </div>
  );
};

export default SignUp;
