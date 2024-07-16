import React from "react";
import MainBg from "../../assets/mainBg.png";
import NavBar from "../../Components/NavBar";
import SideNav from "../../Components/SideNav";

const Dashboard = () => {
  return (
    <>
      <div
        className="main min-h-screen ls-content"
        style={{ backgroundImage: `url(${MainBg})` }}
      >
        <NavBar/>
        <SideNav/>
      </div>
    </>
  );
};

export default Dashboard;
