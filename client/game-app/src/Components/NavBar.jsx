import React, { useContext, useEffect, useState } from "react"; 
import { LoginContext } from "../Context/LoginContext.jsx";
import FullLogo from "../assets/FullLogo.png";
import HalfLogo from "../assets/HalfLogo.png";
import Avatar from "../assets/Avatar.png";
import FilledBtn from "./ui/Buttons/FilledBtn.jsx";
import {useNavigate, Link } from "react-router-dom";
import "./Styles/NavBarStyles.css";

const NavBar = () => {
  const { isLoggedIn, setIsLoggedIn, logout } = useContext(LoginContext);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const navigate = useNavigate();


  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };
  return (
    <div>
      {!isLoggedIn ? (
        <div className="navbar" style={{ padding: "16px 48px" }}>
          <div className="flex-1">
            <Link to="/">
              <img
                src={windowWidth >= 420 ? FullLogo : HalfLogo}
                style={{ width: "60%", justifySelf: "start" }}
                alt="gameverse logo"
              />
            </Link>
          </div>
          <div className="flex-none">
            <Link to="/login">
              <FilledBtn value="JOIN NOW" styles={{ fontSize: "14px" }} />
            </Link>
          </div>
        </div>
      ) : (
        <div
          className="navbar justify-between"
          style={{ padding: "16px 50px" }}
        >
          <div className="nav-logo">
            <img src={HalfLogo} style={{ height: "42px" }} alt="" />
          </div>
          <div
            className="nav-search-bar"
            style={{
              background: "rgb(255,255,255,0.2)",
              width: "360px",
              color: "white",
            }}
          >
            <svg className="search-icon" aria-hidden="true" viewBox="0 0 24 24">
              <g>
                <path d="M21.53 20.47l-3.66-3.66C19.195 15.24 20 13.214 20 11c0-4.97-4.03-9-9-9s-9 4.03-9 9 4.03 9 9 9c2.215 0 4.24-.804 5.808-2.13l3.66 3.66c.147.146.34.22.53.22s.385-.073.53-.22c.295-.293.295-.767.002-1.06zM3.5 11c0-4.135 3.365-7.5 7.5-7.5s7.5 3.365 7.5 7.5-3.365 7.5-7.5 7.5-7.5-3.365-7.5-7.5z"></path>
              </g>
            </svg>
            <input type="text" placeholder="Search..." />
          </div>
          <div className="nav-menu flex items-center justify-between w-5/12">
            <a href="" className="nav-menu-items">
              HOME
            </a>
            <a href="" className="nav-menu-items">
              CATEGORIES
            </a>
            <a href="" className="nav-menu-items">
              TRENDING
            </a>
            <a href="" className="nav-menu-items">
              COMMUNITY
            </a>
          </div>
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-10 rounded-full">
                <img alt="User profile picture" src={Avatar} />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
            >
              <li>
                <a className="justify-between">
                  Profile
                  <span className="badge">New</span>
                </a>
              </li>
              <li>
                <a>Settings</a>
              </li>
              <li>
                <a onClick={handleLogout}>Logout</a>
              </li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default NavBar;
