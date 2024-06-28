import React from "react";
import "./BtnStyles.css"

const OutlineBtn = ({ value }) => {
  return (
    <div>
      <button type="submit" className="outline-btn">
        <span className="text-fill-color btn-span">{value}</span>
      </button>
    </div>
  );
};

export default OutlineBtn;
