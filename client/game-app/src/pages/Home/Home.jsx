import React from "react";
import { Link } from "react-router-dom";
import HomeBg from "../../assets/HomeBg.png";
import XboxCon from "../../assets/xbox-gamepad.gif";
import NavBar from "../../Components/NavBar";
import Footer from "../../Components/Footer";
import "./HomeStyles.css";
import PageBreak from "../../assets/PageBreak.png";
import ArcCat from "../../assets/categories/arcade.jpg";
import CardCat from "../../assets/categories/card.png";
import ShootCat from "../../assets/categories/shooting.jpg";
import RaceCat from "../../assets/categories/racing.jpg";
import MultiCat from "../../assets/categories/multiplayer.jpg";
import PuzzCat from "../../assets/categories/puzzle.jpg";
import CardDesc from "../../Components/ui/Cards/CardDesc";
import FilledBtn from "../../Components/ui/Buttons/FilledBtn";

/**
 * Home component that displays the home page of the website.
 *
 * @returns {JSX.Element} The Home component.
 */
const Home = () => {
  return (
    // Main container for the home page
    <div
      className="main max-w-screen home-content"
      style={{ backgroundImage: `url(${HomeBg})` }}
    >
      <NavBar />
      {/* Login background image */}
      <img src={XboxCon} className="center-img" alt="Login Background" />
      <div>
        {/* Heading for welcome message */}
        <div className="home-main-heading">
          WELCOME TO THE
          <br /> MULTIVERSE OF <span className="text-fill-color">GAMING</span>
        </div>
        {/* Paragraph for description */}
        <div
          className="text-white text-center text-2xl"
          style={{ fontFamily: "OndoReg" }}
        >
          Dive into a world of endless excitement.
        </div>
        <Link to="/login">
          {/* Button to join now */}
          <FilledBtn
            value="JOIN NOW"
            styles={{ margin: "50px auto", fontSize: "16px" }}
          />
        </Link>
      </div>

      {/* Image for page break */}
      <img src={PageBreak} className="page-br" alt="Page Break" />

      {/* Heading for top categories */}
      <div className="home-main-heading">
        TOP <span className="text-fill-color">CATEGORIES</span>
      </div>

      {/* Grid for displaying categories */}
      <div className="my-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-10 justify-center justify-items-center mx-auto max-w-max">
        <CardDesc imgSrc={ArcCat} itemTitle="Arcade" btnvalue="VIEW ALL"  btnDest="/login" />
        <CardDesc imgSrc={CardCat} itemTitle="Card" btnvalue="VIEW ALL"  btnDest="/login" />
        <CardDesc imgSrc={ShootCat} itemTitle="Shooting" btnvalue="VIEW ALL"  btnDest="/login" />
        <CardDesc imgSrc={RaceCat} itemTitle="Racing" btnvalue="VIEW ALL"  btnDest="/login" />
        <CardDesc
          imgSrc={MultiCat}
          itemTitle="Multiplayer"
          btnvalue="VIEW ALL"
         btnDest="/login" />
        <CardDesc imgSrc={PuzzCat} itemTitle="Puzzle" btnvalue="VIEW ALL" btnDest="/login"  />
      </div>
      {/* Image for page break */}
      <img src={PageBreak} className="page-br" alt="Page Break" />
      <div className="mx-auto text-center">
        {/* Heading for play your favorite games */}
        <div className="home-main-heading" style={{ marginTop: "88px" }}>
          PLAY YOUR
          <br /> <span className="text-fill-color">FAVORITE </span>GAMES
        </div>
        {/* Paragraph for play your favorite games */}
        <p className="home-lato text-white text-xl">
          DISCOVER BOUNDLESS ADVENTURES IN OUR EXTENSIVE GAME LIBRARY.
        </p>
      </div>
      
      {/* Footer component */}
      <Footer />
    </div>
  );
};

export default Home;
