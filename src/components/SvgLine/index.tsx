import { useEffect } from "react";
import "./index.less";

function SvgLine() {
  useEffect(() => {
    const path = document.querySelector(".animated-path");
    if (path) {
      const pathLength = path.getTotalLength();
      path.style.strokeDasharray = pathLength;
      path.style.strokeDashoffset = pathLength;
    }
  }, []);

  return (
    <div className="svg-anim-box">
      <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
        <path
          className="animated-path"
          d="M10 190 L10 10 Q 10 5 15 5 L190 5"
          stroke="black"
          stroke-width="2"
          fill="none"
        />
      </svg>
    </div>
  );
}

export default SvgLine;