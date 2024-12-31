import React from "react";
import "./index.less";
interface IProps {
  width: React.CSSProperties["width"];
  height: React.CSSProperties["height"];
  content: string;
}
const PanelWrapper: React.FC<IProps> = ({ width, height, content }) => {
  return <div className="panel-wrapper" style={{ width, height }}>
    <div className="panel-wrapper-icon"></div>
    <div className="panel-wrapper-content">{content}</div>
  </div>;
};

export default PanelWrapper;
