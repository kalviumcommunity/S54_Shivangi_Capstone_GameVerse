import React, { useContext } from "react";
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
import FavGames from "../../assets/favGames.png";
import FavGamesRes from "../../assets/favGamesRes.png";
import { WindowWidthContext } from "../../Context/WindowWidthContext";
import OutlineBtn from "../../Components/ui/Buttons/OutlineBtn";
import JoinNowAd from "../../assets/JoinNowAd.png";
import JoinNowAdRes from "../../assets/JoinNowAdRes.png";
const Home = () => {
  const windowWidth = useContext(WindowWidthContext);
  return (
    <div
      className="main max-w-screen home-content"
      style={{ backgroundImage: `url(${HomeBg})` }}
    >
      <NavBar />
      <img src={XboxCon} className="center-img" alt="Login Background" />
      <div>
        <div className="home-main-heading">
          WELCOME TO THE
          <br /> MULTIVERSE OF <span className="text-fill-color">GAMING</span>
        </div>
        <div
          className="text-white text-center text-2xl"
          style={{ fontFamily: "OndoReg" }}
        >
          Dive into a world of endless excitement.
        </div>
        <Link to="/login">
          <FilledBtn
            value="JOIN NOW"
            styles={{ margin: "50px auto", fontSize: "16px" }}
          />
        </Link>
      </div>

      <img src={PageBreak} className="page-br" alt="Page Break" />

      <div className="home-main-heading">
        TOP <span className="text-fill-color">CATEGORIES</span>
      </div>

      <div className="my-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-10 justify-center justify-items-center mx-auto max-w-max">
        <CardDesc
          imgSrc={ArcCat}
          itemTitle="Arcade"
          btnvalue="VIEW ALL"
          btnDest="/login"
        />
        <CardDesc
          imgSrc={CardCat}
          itemTitle="Card"
          btnvalue="VIEW ALL"
          btnDest="/login"
        />
        <CardDesc
          imgSrc={ShootCat}
          itemTitle="Shooting"
          btnvalue="VIEW ALL"
          btnDest="/login"
        />
        <CardDesc
          imgSrc={RaceCat}
          itemTitle="Racing"
          btnvalue="VIEW ALL"
          btnDest="/login"
        />
        <CardDesc
          imgSrc={MultiCat}
          itemTitle="Multiplayer"
          btnvalue="VIEW ALL"
          btnDest="/login"
        />
        <CardDesc
          imgSrc={PuzzCat}
          itemTitle="Puzzle"
          btnvalue="VIEW ALL"
          btnDest="/login"
        />
      </div>
      <img src={PageBreak} className="page-br" alt="Page Break" />
      <div>
        <div className="mx-auto text-center">
          <div className="home-main-heading" style={{ marginTop: "10px" }}>
            PLAY YOUR
            <br /> <span className="text-fill-color">FAVORITE </span>GAMES
          </div>
          <p className="home-lato text-white text-xl">
            DISCOVER BOUNDLESS ADVENTURES IN OUR EXTENSIVE GAME LIBRARY.
          </p>
        </div>

        <img
          src={windowWidth >= 550 ? FavGames : FavGamesRes}
          alt=""
          className={`fav-games my-10 mx-auto ${
            windowWidth >= 550 ? "" : "px-6"
          }`}
        />
        <div className="flex justify-center mx-auto my-5 flex-wrap">
          <FilledBtn value="VIEW ALL" styles={{margin: "auto 20px"}} />
          <OutlineBtn value="PLAY NOW" styles={{margin: "auto 20px"}} />
        </div>
      </div>

      <img src={windowWidth>=770?JoinNowAd:JoinNowAdRes} alt="" className="mx-auto my-16 px-6 has-[max-height:80vh]"/>

      <img src={PageBreak} className="page-br" alt="Page Break" />

      <Footer />
    </div>
  );
};

export default Home;
