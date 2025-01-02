import React from "react";
import './index.less'
interface IProps {
  width: React.CSSProperties['width'];
  height: React.CSSProperties['height'];
  content: string;
  num: number;
}
const SubWrapper: React.FC<IProps> = ({
  width,
  height,
  content,
  num
}) => {
  return (
    <div className="sub-wrapper">
      <div>已分配</div>
      <div>44.85</div>
      <div className="statistics-mid-line"></div>
    </div>
  );
}

export default SubWrapper;
