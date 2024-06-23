import React, { useState } from "react";
import MainBg from "../../assets/mainBg.png";
import LoginBg from "../../assets/LoginImg.png";
import LoginB from "../../assets/LoginBackdrop.png";
import "./LoginSignUpStyles.css";
import NavBar from "../../Components/NavBar";
import Footer from "../../Components/Footer";
import Login from "./Login";
import SignUp from "./SignUp";
import { ToastContainer, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const LoginSignup = () => {
  const [currPage, setCurrPage] = useState("signup");
  return (
    <>
      <NavBar />
      <div
        className="main min-h-screen max-h-max ls-content flex justify-center items-center "
        style={{ backgroundImage: `url(${MainBg})` }}
      >
        <img src={LoginBg} className="left-image" alt="Login Background" />
        <div className="ls-right">
          <div className="mt-4">
            <div className="border-b border-gray-200">
              <nav className="-mb-px flex" aria-label="Tabs">
                <button
                  className={`w-1/2 py-4 px-1 text-center text-base font-semibold cursor-pointer border-b-2 ${
                    currPage === "signup"
                      ? "border-bubble-gum text-bubble-gum"
                      : "border-transparent text-gray-400 hover:border-gray-300 hover:text-gray-200"
                  }`}
                  onClick={() => setCurrPage("signup")}
                >
                  REGISTER
                </button>
                <button
                  className={`w-1/2 py-4 px-1 text-center text-base font-semibold cursor-pointer border-b-2 ${
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
          {currPage === "signup" ? <SignUp /> : <Login />}
        </div>
      </div>
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
    </>
  );
};

export default LoginSignup;
