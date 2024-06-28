import React from "react";
import MainBg from "../../assets/mainBg.png";

const Dashboard = () => {
  return (
    <>
      <div
        className="main min-h-screen ls-content"
        style={{ backgroundImage: `url(${MainBg})` }}
      >
      </div>
    </>
  );
};

export default Dashboard;
