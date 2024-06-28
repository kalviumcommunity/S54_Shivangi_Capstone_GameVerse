import React from "react";
import MainBg from "../../assets/mainBg.png";
import NavBar from "../../Components/NavBar";

const Dashboard = () => {
  return (
    <>
      <div
        className="main min-h-screen ls-content"
        style={{ backgroundImage: `url(${MainBg})` }}
      >
        <NavBar/>
      </div>
    </>
  );
};

export default Dashboard;
