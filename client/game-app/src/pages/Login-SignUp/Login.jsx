import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast, Bounce } from "react-toastify";
import axios from "../../utils/axiosConfig";
import { LoginContext } from "../../Context/LoginContext";
import FilledBtn from "../../Components/ui/Buttons/FilledBtn";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const url = import.meta.env.VITE_API_URL;
  const { setIsLoggedIn } = useContext(LoginContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${url}/api/users/login`, {
        username,
        password,
      });
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
          <FilledBtn
            type="submit"
            value="LOGIN"
            styles={{ fontSize: "16px" }}
          />
        </form>
      </div>
      {/* <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        transition={Bounce}
      /> */}
    </>
  );
};

export default Login;
