import React from "react";
import RadialB from "../../../assets/RadialBlur1.png";

const RadialBlur = ({ styles }) => {
  return (
    <>
      <img src={RadialB} alt="" style={{ ...styles, position: "absolute" }} />
    </>
  );
};

export default RadialBlur;
