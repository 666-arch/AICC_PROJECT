import React, { useEffect } from "react";
import "./index.less";
interface IProps extends React.HTMLAttributes<HTMLDivElement> {}
const ButtonBase: React.FC <IProps>= ({
  onClick,
}) => {
  const handleClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    onClick && onClick(event);
  };
  return (
    <div className="button-base" onClick={handleClick}>
      <div className="button-base-inner">动环数据</div>
    </div>
  );
};

export default ButtonBase;