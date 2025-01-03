import React from "react";
import "./index.less";
import useGlobalStore from "@/store";
interface IProps {
  setIsShowModal: (isShow: boolean) => void;
}
const ButtonBase: React.FC<IProps> = ({ setIsShowModal }) => {
  return (
    <div className="button-base" onClick={() => setIsShowModal(true)}>
      <div className="button-base-inner">动环数据</div>
    </div>
  );
};

export default ButtonBase;