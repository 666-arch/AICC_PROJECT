import NumberTween from "@/components/NumberTween";
import React, { useEffect, useRef, useState } from "react";
import "./index.less";
// interface IProps {
//   setIsShowModal: (isShow: boolean) => void;
//   isShowModal: boolean;
// }
const DayModal: React.FC = () => {
  const modalRef = useRef<HTMLDivElement>(null);
  const list = [
    {
      content: "温度",
      value: 22.89,
      rate: "℃",
    },
    {
      content: "湿度",
      value: 50.67,
      rate: "RH",
    },
    {
      content: "电流/机柜",
      value: 12.31,
      rate: "A",
    },
    {
      content: "电量",
      value: 2190,
      rate: "KWh",
    },
  ];
  // useEffect(() => {
  //   const handleClickOutside = (event: any) => {
  //     if (modalRef.current && !modalRef.current.contains(event.target)) {
  //       modalRef.current.style.display = 'none';
  //     }
  //   };
  //   document.addEventListener("mousedown", handleClickOutside);
  //   return () => {
  //     document.removeEventListener("mousedown", handleClickOutside);
  //   };
  // }, []);
  return (
    <div className="day-modal" ref={modalRef} >
      <div className="day-modal-title">日均</div>
      <div className="day-modal-line"></div>
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
