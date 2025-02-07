import "./index.less";
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
import { useEffect, useRef, useState } from "react";
import SvgLine from "@/components/SvgLine";
import BackgroundVideo from "@/components/BackgroundVideo";
import BtnSvgLine from "@/components/BtnSvgLine";
import { useClickAway } from "ahooks";
import ChartPie3D from "@/components/ChartPie3D";
import { getBoxId } from "@/api";
import { ip, port } from "@/util";
import useGlobalStore, { IdOptions } from "@/store";
import CustomerSource from "@/businessComponents/Customer";
// const optionsData = [
//   {
//     name: "神州问学：",
//     value: 57,
//     textColor: "#415DFF",
//     itemStyle: {
//       color: "#E9E9E9",
//     },
//   },
//   {
//     name: "科技公司：",
//     value: 21,
//     textColor: "#4187CB",
//     itemStyle: {
//       color: "#6a94fd",
//     },
//   },
//   {
//     name: "科研机构：",
//     value: 14,
//     textColor: "#7A56E3",
//     itemStyle: {
//       color: "#6a94fd",
//     },
//   },
//   {
//     name: "制造业：",
//     value: 8,
//     textColor: "#2B60E0",
//     itemStyle: {
//       color: "#6a94fd",
//     },
//   },
// ];
const optionsData = [
  {
    name: "神州问学：",
    // value: 260,
    value: 57,
    perValue: 0,
    textColor: "#415DFF",
    itemStyle: {
      color: "#80A4FF",
    },
  },
  {
    name: "科技公司：",
    // value: 330,
    value: 21,
    perValue: 0,
    textColor: "#4187CB",
    itemStyle: {
      color: "#5E9AD3",
    },
  },
  {
    name: "科研机构：",
    // value: 200,
    value: 14,
    perValue: 0,
    textColor: "#7A56E3",
    itemStyle: {
      color: "#A096FF",
    },
  },
  {
    name: "制造业：",
    // value: 500,
    value: 8,
    perValue: 0,
    textColor: "#2B60E0",
    itemStyle: {
      color: "#4170E3",
    },
  },
];
const HomePage = () => {
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const togglePopup = () => {
    setIsPopupVisible(!isPopupVisible);
  };

  // 使用弹窗 DOM
  const popupRef = useRef<HTMLDivElement>(null);
  const btnRef = useRef<HTMLDivElement>(null);
  useClickAway(() => {
    setIsPopupVisible(false);
  }, [popupRef, btnRef]);

  const [boxIds, setBoxIds] = useState<Array<IdOptions>>([]);
  const initBoxId = async () => {
    try {
      const formData = new FormData();
      formData.append("ip", ip);
      formData.append("port", port);
      const response = await getBoxId(formData);
      if (response.code === 200) {
        const dataList = response.data as IdOptions[];
        setBoxIds(dataList);
      }
    } catch (error) {}
  };
  useEffect(() => {
    initBoxId();
  }, []);

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
          <CpuStatistics
            id={boxIds.find((id) => id.name === "云平台-CPU统计数据")?.id!}
          />
          {/* 内存统计数据 */}
          <MemoryStatistics
            id={boxIds.find((id) => id.name === "云平台-内存统计数据")?.id!}
          />
          {/* GPU统计数据 */}
          <GpuStatistics
            id={boxIds.find((id) => id.name === "云平台-GPU统计数据")?.id!}
          />

          <div style={{ display: "flex", gap: "15px" }}>
            {/* 储存数据 */}
            <StoreSource
              id={boxIds.find((id) => id.name === "云平台-储存数据")?.id!}
            />
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
            <RightCpuStatistics
              id={
                boxIds.find((id) => id.name === "HPC&AI平台-CPU统计数据")?.id!
              }
            />

            {/* GPU统计数据 */}
            <RightGpuStatistics
              id={
                boxIds.find((id) => id.name === "HPC&AI平台-GPU统计数据")?.id!
              }
            />

            <div style={{ display: "flex", gap: "20px" }}>
              <RightStoreSouce />
              <RightStoreCapacity />
            </div>
          </div>

          <div className="home-page-main-right-bot">
            <CustomerSource
              id={boxIds.find((id) => id.name === "客户资源算力使用")?.id!}
            />
          </div>
        </div>

        <div className="button-base " ref={btnRef}>
          <ButtonBase onClick={togglePopup} />
        </div>

        {isPopupVisible ? (
          <div className="home-page-main-modal" ref={popupRef}>
            <DayModal />
          </div>
        ) : (
          <></>
        )}

        {isPopupVisible && <SvgLine />}

        <BtnSvgLine />
      </div>
      <BackgroundVideo />
    </div>
  );
};

export default HomePage;
