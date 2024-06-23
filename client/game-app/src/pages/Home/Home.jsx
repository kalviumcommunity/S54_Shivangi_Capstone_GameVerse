import React from "react";
import MainBg from "../../assets/mainBg.png";
import XboxCon from "../../assets/xbox-gamepad.gif"
import "./HomeStyles.css"

const Home = () => {
  return (
    <>
      <div
        className="main max-w-screen home-content"
        style={{ backgroundColor: '#211144'}}
      >
        <img src={XboxCon} className="center-img" alt="Login Background" />
      </div>
    </>
  );
};

export default Home;
