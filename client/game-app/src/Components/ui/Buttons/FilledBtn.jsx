import React from "react";
import BtnBg from "../../../assets/colorStyle.jpg";
import "./BtnStyles.css";

const FilledBtn = ({ value, styles }) => {
  return (
    <button
      type="submit"
      className="fill-btn"
      style={{
        ...styles,
        backgroundImage: `url(${BtnBg})`,
      }}
    >
      <span className="btn-span">{value}</span>
    </button>
  );
};

export default FilledBtn;
