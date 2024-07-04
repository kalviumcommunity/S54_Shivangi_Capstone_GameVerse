import React from "react";
import BtnBg from "../../../assets/colorStyle.jpg";
import "./BtnStyles.css";

const FilledBtn = ({ value, styles, action, imgSrc}) => {
  return (
    <button
      type="submit"
      className="fill-btn"
      style={{
        backgroundImage: `url(${BtnBg})`,
        ...styles,
      }}
      onClick={action}
    > {imgSrc && <img src={imgSrc} className="btn-img btn-span" alt=""/>}
      <span className="btn-span">{value}</span>
    </button>
  );
};

export default FilledBtn;
