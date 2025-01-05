import "./index.less";
import PanelWrapper from "./../../components/PanelWrapper/index";
import MemoryStatistics from "@/businessComponents/MemoryStatistics";
import CpuStatistics from "@/businessComponents/CpuStatistics";
import GpuStatistics from "@/businessComponents/GpuStatistics";
import StoreSource from "@/businessComponents/StoreSource";
import StoreCapacity from "@/businessComponents/StoreCapacity";
import RightCpuStatistics from "@/businessComponents/RightCpuStatistics";
import RightGpuStatistics from "@/businessComponents/RightGpuStatistics";
import RightStoreSouce from "@/businessComponents/RightStoreSouce";
import RightStoreCapacity from "@/businessComponents/RightStoreCapacity";
import Pie3d from "@/components/Pie3d";
import NumberTween from "@/components/NumberTween";
import DayModal from "@/businessComponents/DayModal";
import ButtonBase from "@/components/ButtonBase";
import useGlobalStore from "@/store";
import { useEffect, useRef, useState } from "react";
import SvgLine from "@/components/SvgLine";
import BackgroundVideo from "@/components/BackgroundVideo";
import BtnSvgLine from "@/components/BtnSvgLine";
// import { useClickAway } from 'ahooks';
// const legendList = [
//   {
//     content: "神州同学：",
//     value: 260,
//     color: "#415DFF",
//   },
//   {
//     content: "科技公司：",
//     value: 330,
//     color: "#4187CB",
//   },
//   {
//     content: "科研机构：",
//     value: 200,
//     color: "#7A56E3",
//   },
//   {
//     content: "制造业：",
//     value: 500,
//     color: "#2B60E0",
//   },
// ];
const optionsData = [
  {
    name: "神州同学：",
    value: 260,
    perValue: 0,
    textColor: "#415DFF",
    itemStyle: {
      color: "#80A4FF",
    },
  },
  {
    name: "科技公司：",
    value: 330,
    perValue: 0,
    textColor: "#4187CB",
    itemStyle: {
      color: "#5E9AD3",
    },
  },
  {
    name: "科研机构：",
    value: 200,
    perValue: 0,
    textColor: "#7A56E3",
    itemStyle: {
      color: "#A096FF",
    },
  },
  {
    name: "制造业：",
    value: 500,
    perValue: 0,
    textColor: "#2B60E0",
    itemStyle: {
      color: "#4170E3",
    },
  },
];
const HomePage = () => {
  const [isShowModal, setIsShowModal] = useState<boolean>(false);
  const [isShow, setIsShow] = useState<boolean>(false);
  const totalLengendNum = optionsData.reduce(
    (sum, item) => sum + item.value,
    0
  );
  let totalPercentage = 0;
  optionsData.forEach((item, index) => {
    // let percentage;
    // if (index < optionsData.length - 1) {
    //   percentage = Math.floor((item.value / totalLengendNum) * 100);
    //   totalPercentage += percentage;
    // } else {
    //   percentage = 100 - totalPercentage;
    // }
    // item.perValue = percentage;
    switch (index) {
      case 0:
        item.perValue = 57;
        break;

      case 1:
        item.perValue = 21;
        break;
      case 2:
        item.perValue = 14;
        break;
      case 3:
        item.perValue = 8;
        break;
      default:
        break;
    }
  });

  const [isPopupVisible, setIsPopupVisible] = useState(false);

  // 使用弹窗 DOM
  const popupRef = useRef<HTMLDivElement>(null);

  const togglePopup = (event: any) => {
    debugger;
    setIsPopupVisible(!isPopupVisible);

    console.log("togglePopup", isPopupVisible);
  };

  // const handleClickOutside = (event: any) => {
  //   if (popupRef.current && !popupRef.current.contains(event.target)) {
  //     debugger;
  //     event.stopPropagation();
  //     setIsPopupVisible(false);
  //     console.log("handleClickOutside", isPopupVisible);
  //   }
  // };

  // // 添加事件监听器，监听点击事件
  // useEffect(() => {
  //   document.addEventListener("mousedown", handleClickOutside);
  //   return () => {
  //     document.removeEventListener("mousedown", handleClickOutside);
  //   };
  // }, []);

  // useClickAway(() => {
  //   setIsPopupVisible(false)
  // }, popupRef);

  return (
    <div className="home-page-content">
      <div className="home-page-header">
        <div className="home-page-title">AICC算力数据监测系统</div>
      </div>
      <div className="home-page-main">
        <div className="home-page-main-left">
          <div className="main-left-cloud-platform">
            <div className="main-left-title-box">
              <div className="title-box-icon"></div>
              <div>云平台</div>
            </div>
            <div className="main-left-title-line"></div>
          </div>

          {/* CPU统计数据 */}
          <CpuStatistics />
          {/* 内存统计数据 */}
          <MemoryStatistics />
          {/* GPU统计数据 */}
          <GpuStatistics />

          <div style={{ display: "flex", gap: "15px" }}>
            {/* 储存数据 */}
            <StoreSource />
            {/* 储存容量 */}
            <StoreCapacity />
          </div>
        </div>

        <div className="home-page-main-right">
          <div className="home-page-main-right-top">
            <div className="main-right-AI-platform">
              <div className="main-right-title-box">
                <div className="title-box-icon"></div>
                <div>HPC&AI平台</div>
              </div>
              <div className="main-right-title-line"></div>
            </div>

            {/* CPU统计数据 */}
            <RightCpuStatistics />

            {/* GPU统计数据 */}
            <RightGpuStatistics />

            <div style={{ display: "flex", gap: "20px" }}>
              <RightStoreSouce />
              <RightStoreCapacity />
            </div>
          </div>

          <div className="home-page-main-right-bot">
            <div className="main-right-customer-platform">
              <div className="main-right-title-box">
                <div className="title-box-icon"></div>
                <div>客户资源算力使用</div>
              </div>
              <div className="main-right-title-line"></div>
            </div>

            <div className="main-right-bot-chart">
              <div className="chart-left">
                <Pie3d
                  width={290}
                  height={255}
                  data={optionsData}
                  left={-60}
                  top={-70}
                />
                <div className="pie-base-bg"></div>
              </div>
              <div className="chart-right">
                {optionsData.map((item, index) => {
                  return (
                    <div className="chart-item" key={item.itemStyle.color}>
                      <div
                        style={
                          index !== 3
                            ? {
                                width: "5px",
                                height: "5px",
                                borderRadius: "50%",
                                marginRight: "8px",
                                backgroundColor: item.textColor,
                              }
                            : {
                                width: "5px",
                                height: "5px",
                                borderRadius: "50%",
                                marginLeft: "7px",
                                backgroundColor: item.textColor,
                              }
                        }
                      ></div>
                      <div style={index === 3 ? { paddingLeft: "14px" } : {}}>
                        {item.name}
                      </div>
                      <div
                        style={{
                          color: item.textColor,
                        }}
                      >
                        <NumberTween value={item.perValue} />
                      </div>
                      <div
                        style={{
                          color: item.textColor,
                          fontFamily: " Source Han Sans CN",
                          fontSize: "13px",
                          fontWeight: "350",
                          lineHeight: "11px",
                          marginTop: "8px",
                        }}
                      >
                        %
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        <ButtonBase onClick={togglePopup} />
        {isPopupVisible && (
          <div className="home-page-main-modal" ref={popupRef}>
            <DayModal />
          </div>
        )}

        {isPopupVisible && <SvgLine />}
        <BtnSvgLine />
      </div>
      <BackgroundVideo />
    </div>
  );
};

export default HomePage;