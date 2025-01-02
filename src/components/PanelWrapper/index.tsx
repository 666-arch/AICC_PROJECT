import React, { useEffect, useRef } from "react";
import "./index.less";
interface IProps {
  width: React.CSSProperties["width"];
  height: React.CSSProperties["height"];
  content: string;
}
const PanelWrapper: React.FC<IProps> = ({ width, height, content }) => {
  const contentRef = useRef<HTMLDivElement>(null)
  useEffect(()=>{
    if (contentRef.current) {
      contentRef.current.style.setProperty('--wrapper-width', 
      `${width}px`);
      contentRef.current.style.setProperty('--content-width', 
      `${contentRef.current.getBoundingClientRect().width}px`);
    }
  },[])
  return <div className="panel-wrapper" style={{ width, height }}>
    <div className="panel-wrapper-content" ref={contentRef}>{content}</div>
  </div>;
};
export default PanelWrapper;