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
import { useEffect, useState } from "react";
import SvgLine from "@/components/SvgLine";
import BackgroundVideo from "@/components/BackgroundVideo";
import BtnSvgLine from "@/components/BtnSvgLine";
const legendList = [
  {
    content: "神州同学：",
    value: 57,
    color: "#415DFF",
  },
  {
    content: "科技公司：",
    value: 57,
    color: "#4187CB",
  },
  {
    content: "科研机构：",
    value: 57,
    color: "#7A56E3",
  },
  {
    content: "制造业：",
    value: 57,
    color: "#2B60E0",
  },
];
const optionsData = [
  {
    name: "神州同学：",
    value: 260,
    itemStyle: {
      color: "#80A4FF",
    },
  },
  {
    name: "科技公司：",
    value: 330,
    itemStyle: {
      color: "#5E9AD3",
    },
  },
  {
    name: "科研机构：",
    value: 200,
    itemStyle: {
      color: "#A096FF",
    },
  },
  {
    name: "制造业：",
    value: 500,
    itemStyle: {
      color: "#4170E3",
    },
  },
];
const HomePage = () => {
  const [isShowModal, setIsShowModal] = useState<boolean>(false);
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
                {legendList.map((item, index) => {
                  return (
                    <div className="chart-item" key={item.content}>
                      <div
                        style={{
                          width: "5px",
                          height: "5px",
                          borderRadius: "50%",
                          marginRight: "8px",
                          backgroundColor: item.color,
                        }}
                      ></div>
                      <div>{item.content}</div>
                      <div
                        style={{
                          color: item.color,
                        }}
                      >
                        <NumberTween value={item.value} />
                      </div>
                      <div
                        style={{
                          color: item.color,
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
        {/* 弹窗 */}
        {isShowModal ? (
          <div className="home-page-main-modal">
            <DayModal setIsShowModal={setIsShowModal} />
          </div>
        ) : null}
        {isShowModal && <SvgLine />}

        <ButtonBase setIsShowModal={setIsShowModal} />
        <BtnSvgLine/>

      </div>
      <BackgroundVideo/>
    </div>
  );
};

export default HomePage;
