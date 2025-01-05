import React from "react";
import "./index.less";
function BtnSvgLine() {
  return (
    <div className="btn-svg-line">
      <svg width="20" height="146" xmlns="http://www.w3.org/2000/svg">
        <line x1="10" y1="146" x2="10" y2="0" className="line" />
      </svg>
    </div>
  );
}

export default BtnSvgLine;
