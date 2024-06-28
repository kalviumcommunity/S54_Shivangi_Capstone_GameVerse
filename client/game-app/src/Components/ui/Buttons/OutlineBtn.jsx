import React from "react";

const OutlineBtn = ({ value }) => {
  return (
    <div>
      <button type="submit" className="outline-btn">
        <span className="text-fill-color">{value}</span>
      </button>
    </div>
  );
};

export default OutlineBtn;
