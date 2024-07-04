import React, { useState, useEffect } from "react";
import MainBg from "../../assets/mainBg.png";
import LoginBg from "../../assets/LoginImg.png";
import "./LoginSignUpStyles.css";
import NavBar from "../../Components/NavBar";
import Footer from "../../Components/Footer";
import Login from "./Login";
import SignUp from "./SignUp";
import { ToastContainer, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import GoogleSignInButton from "./GoogleSignInButton";

/**
 * LoginSignup component that renders the login and signup pages.
 * @returns {JSX.Element} The LoginSignup component.
 */
const LoginSignup = () => {
  // State variables
  const [currPage, setCurrPage] = useState("signup"); // Current page state
  const [windowWidth, setWindowWidth] = useState(window.innerWidth); // Window width state

  // Resize event listener
  useEffect(() => {
    // Handle window resize
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    // Add event listener
    window.addEventListener("resize", handleResize);

    // Remove event listener on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // Render LoginSignup component
  return (
    <div style={{ backgroundImage: `url(${MainBg})` }} className="main">
      <NavBar />
      <div className="main min-h-screen ls-content flex justify-center items-center flex-wrap flex-col md:flex-row">
        <img
          src={LoginBg}
          className={windowWidth < 600 ? "left-image-res" : "left-image"}
          alt="Login Background"
        />
        <div className={windowWidth < 786 ? "ls-right-res" : "ls-right"}>
          <div className="mt-4">
            <div className="border-b border-gray-200">
              <nav className="-mb-px flex" aria-label="Tabs">
                {/* Register button */}
                <button
                  className={`w-1/2 py-4 px-1 text-center text-base font-bold cursor-pointer border-b-2 ${
                    currPage === "signup"
                      ? "border-bubble-gum text-bubble-gum"
                      : "border-transparent text-gray-400 hover:border-gray-300 hover:text-gray-200"
                  }`}
                  onClick={() => setCurrPage("signup")}
                >
                  REGISTER
                </button>
                {/* Login button */}
                <button
                  className={`w-1/2 py-4 px-1 text-center text-base font-bold cursor-pointer border-b-2 ${
                    currPage === "login"
                      ? "border-bubble-gum text-bubble-gum"
                      : "border-transparent text-gray-400 hover:border-gray-300 hover:text-gray-200"
                  }`}
                  onClick={() => setCurrPage("login")}
                >
                  LOGIN
                </button>
              </nav>
            </div>
          </div>
          {/* Render signup or login component based on currPage state */}
          {currPage === "signup" ? <SignUp /> : <Login />}
          <GoogleSignInButton />
        </div>
      </div>
      {/* Toast container */}
      <ToastContainer
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
      />
      <Footer />
    </div>
  );
};

export default LoginSignup;
