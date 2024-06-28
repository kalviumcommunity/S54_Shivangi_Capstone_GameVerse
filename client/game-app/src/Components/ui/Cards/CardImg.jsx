import React from "react";
import "./CardStyles.css";

const CardImg = ({imgSrc, itemName}) => {
  return (
    <>
      <div className="card-container">
        <div className="card">
          <div
            className="front-content"
            style={{ backgroundImage: `url(${imgSrc})` }}
          ></div>
          <div className="content">
            <p className="heading">{itemName}</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default CardImg;
