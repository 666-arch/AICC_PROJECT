import React, { useEffect } from "react";
import "./index.less";
interface IProps {
  setIsShowModal: (isShow: boolean) => void;
  isShowModal: boolean;
}
const ButtonBase: React.FC<IProps> = ({ setIsShowModal, isShowModal }) => {
  return (
    <div className="button-base" onClick={() => setIsShowModal(!isShowModal)}>
      <div className="button-base-inner">动环数据</div>
    </div>
  );
};

export default ButtonBase;