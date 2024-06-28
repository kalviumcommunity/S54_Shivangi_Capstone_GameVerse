import React from "react";
import "./CardStyles.css";
import FilledBtn from "../Buttons/FilledBtn";
import { Link } from "react-router-dom";


const CardDesc = ({ imgSrc, itemTitle, btnvalue, btnDest }) => {
  return (
    <div className="desc-card">
      <img src={imgSrc} alt="" />
      <p>{itemTitle}</p>
      <Link to={btnDest}>
        <FilledBtn value={btnvalue} styles={{ margin: '20px auto 0 auto', width: "100%", fontSize: "14px" }} />
      </Link>
    </div>
  );
};

export default CardDesc;
