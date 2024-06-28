import React from "react";
import "./CardStyles.css";
import FilledBtn from "../Buttons/FilledBtn";

const CardDesc = ({imgSrc, itemTitle, btnvalue}) => {
  return (
    <div className="desc-card">
      <img src={imgSrc} alt="" />
      <p>{itemTitle}</p>
      <FilledBtn value={btnvalue} styles={{margin: '20px auto 0 auto', width: "100%", fontSize: "14px"}}/>
    </div>
  );
};

export default CardDesc;
