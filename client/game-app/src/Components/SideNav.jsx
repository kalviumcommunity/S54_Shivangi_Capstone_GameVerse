import React, { useState, useContext } from "react";
import "./Styles/SideNavStyles.css";
import HomeColor from "../assets/SideNavIcons/Home/fill-color.svg";
import HomeWhite from "../assets/SideNavIcons/Home/fill-white.svg";
import GameColor from "../assets/SideNavIcons/Game/fill-color.svg";
import GameWhite from "../assets/SideNavIcons/Game/fill-white.svg";
import CommunityColor from "../assets/SideNavIcons/Community/fill-color.svg";
import CommunityWhite from "../assets/SideNavIcons/Community/fill-white.svg";
import LeaderboardColor from "../assets/SideNavIcons/Leaderboard/fill-color.svg";
import LeaderboardWhite from "../assets/SideNavIcons/Leaderboard/fill-white.svg";
import ProfileColor from "../assets/SideNavIcons/Profile/fill-color.svg";
import ProfileWhite from "../assets/SideNavIcons/Profile/fill-white.svg";
import LogoutWhite from "../assets/SideNavIcons/Logout/fill-white.svg";

const SideNav = () => {
  const [showSideNav, setShowSideNav] = useState(false);
  const [currPage, setCurrPage] = useState("home");
  return (
    <>
      <div className={"side-nav h-[50vh] inline-flex flex-col justify-between items-center py-4 px-6 absolute top-[25vh]"}>
        {/* Home Icon */}
        <img
          src={`${currPage === "home" ? HomeColor : HomeWhite}`}
          className="cursor-pointer h-[24px]"
          onClick={() => setCurrPage("home")}
          alt="Home-icon"
        />
        {/* Game Icon */}
        <img
          src={`${currPage === "game" ? GameColor : GameWhite}`}
          className="cursor-pointer h-[24px]"
          onClick={() => setCurrPage("game")}
          alt="game-icon"
        />
        {/* Leaderboard Icon */}
        <img
          src={`${
            currPage === "leaderboard" ? LeaderboardColor : LeaderboardWhite
          }`}
          className="cursor-pointer h-[24px]"
          onClick={() => setCurrPage("leaderboard")}
          alt="Leaderboard-icon"
        />
        {/* Community Icon */}
        <img
          src={`${currPage === "community" ? CommunityColor : CommunityWhite}`}
          className="cursor-pointer h-[24px]"
          onClick={() => setCurrPage("community")}
          alt="Community-icon"
        />
        {/* Profile Icon */}
        <img
          src={`${currPage === "profile" ? ProfileColor : ProfileWhite}`}
          className="cursor-pointer h-[24px]"
          onClick={() => setCurrPage("profile")}
          alt="Profile-icon"
        />
        {/* Logout Icon */}
        <img
          src={LogoutWhite}
          className="cursor-pointer h-[20px]"

          alt="Logout-icon"
        />
      </div>
    </>
  );
};

export default SideNav;
