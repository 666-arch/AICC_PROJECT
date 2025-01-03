import NumberTween from "@/components/NumberTween";
import "./index.less";
import React, { useEffect, useRef } from "react";
import useGlobalStore from "@/store";
interface IProps {
  setIsShowModal: (isShow: boolean) => void;
}
const DayModal: React.FC<IProps> = ({ setIsShowModal }) => {
  const modalRef = useRef<HTMLDivElement>(null);

  const list = [
    {
      content: "温度",
      value: 10,
      rate: "℃",
    },
    {
      content: "湿度",
      value: 10,
      rate: "RH",
    },
    {
      content: "电流/机柜",
      value: 10,
      rate: "A",
    },
    {
      content: "电量",
      value: 10,
      rate: "KWh",
    },
  ];
  useEffect(() => {
    const handleClickOutside = (event: any) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setIsShowModal(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  return (
    <div className="day-modal" ref={modalRef}>
      <div className="day-modal-title">日均</div>
      <div className="day-modal-main">
        {list.map((item, index) => {
          return (
            <div className="day-item" key={item.content}>
              <div className={`icon-${index + 1}`}></div>
              <div className="day-item-data">
                <div>{item.content}</div>
                <div className="data-desc">
                  <NumberTween value={item.value} />
                  <div className={`rate-${index + 1}`}>{item.rate}</div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default DayModal;
