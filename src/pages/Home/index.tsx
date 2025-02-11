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
import DayModal from "@/businessComponents/DayModal";
import ButtonBase from "@/components/ButtonBase";
import { useEffect, useRef, useState } from "react";
import SvgLine from "@/components/SvgLine";
import BackgroundVideo from "@/components/BackgroundVideo";
import BtnSvgLine from "@/components/BtnSvgLine";
import { useClickAway } from "ahooks";
import { changeSuccessData, getBoxId, getConfigData } from "@/api";
import { ip, port } from "@/util";
import { IdOptions } from "@/store";
import CustomerSource from "@/businessComponents/Customer";
import websocket from "@/websocket";
const HomePage = () => {
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const togglePopup = () => setIsPopupVisible(!isPopupVisible);

  // 使用弹窗 DOM
  const popupRef = useRef<HTMLDivElement>(null);
  const btnRef = useRef<HTMLDivElement>(null);
  useClickAway(() => {
    setIsPopupVisible(false);
  }, [popupRef, btnRef]);

  const [boxIds, setBoxIds] = useState<Array<IdOptions> | undefined>([]);
  const initBoxId = async () => {
    try {
      const formData = new FormData();
      formData.append("ip", ip);
      formData.append("port", port);
      const response = await getBoxId(formData);
      if (response.code === 200) {
        const dataList = response.data as IdOptions[];
        localStorage.setItem(
          "boxId",
          JSON.stringify(dataList.map((item) => item.id))
        );
        setBoxIds(dataList);
      }
    } catch (error) {}
  };

  useEffect(() => {
    initBoxId();
  }, []);
  const [dataVersion, setDataVersion] = useState(0);

  //update_78
  const fetchDataForItem = async (item: string) => {
    const params = new FormData();
    params.append("boxId", item);
    await changeSuccessData(params);
  };
  const fetchDataForArray = async (items: Array<string>) => {
    try {
      const response = await Promise.all(items.map(fetchDataForItem));
      return response;
    } catch (error) {}
  };

  useEffect(() => {
    websocket.initWebSocket();
    const handleUdpMessage = (data: string) => {
      const isUpdate78 = data === "update_78";
      try {
        const jsonData = isUpdate78 ? localStorage.getItem("boxId") : data;
        if (!jsonData) {
          return;
        }
        const boxIds = JSON.parse(jsonData);
        const uniqueBoxIds = isUpdate78 ? Array.from(new Set(boxIds)) : boxIds;
        // 调用 fetchDataForArray 加载数据
        fetchDataForArray(uniqueBoxIds);
        // 如果不是 update_78，更新 dataVersion
        if (!isUpdate78) {
          setDataVersion((prev) => prev + 1);
        }
      } catch (e) {
        console.error("处理 UDP 消息失败:", e);
      }
    };
    websocket.setOnReceivedUdp(handleUdpMessage);
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
            dataVersion={dataVersion}
            id={boxIds?.find((id) => id.name === "云平台-CPU统计数据")?.id!}
          />
          {/* 内存统计数据 */}
          <MemoryStatistics
            dataVersion={dataVersion}
            id={boxIds?.find((id) => id.name === "云平台-内存统计数据")?.id!}
          />
          {/* GPU统计数据 */}
          <GpuStatistics
            dataVersion={dataVersion}
            id={boxIds?.find((id) => id.name === "云平台-GPU统计数据")?.id!}
          />

          <div style={{ display: "flex", gap: "15px" }}>
            {/* 储存数据 */}
            <StoreSource
              dataVersion={dataVersion}
              id={boxIds?.find((id) => id.name === "云平台-储存数据")?.id!}
            />
            {/* 储存容量 */}
            <StoreCapacity
              dataVersion={dataVersion}
              id={boxIds?.find((id) => id.name === "云平台-储存容量")?.id!}
            />
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
              dataVersion={dataVersion}
              id={
                boxIds?.find((id) => id.name === "HPC&AI平台-CPU统计数据")?.id!
              }
            />

            {/* GPU统计数据 */}
            <RightGpuStatistics
              dataVersion={dataVersion}
              id={
                boxIds?.find((id) => id.name === "HPC&AI平台-GPU统计数据")?.id!
              }
            />

            <div style={{ display: "flex", gap: "20px" }}>
              <RightStoreSouce
                dataVersion={dataVersion}
                id={
                  boxIds?.find((id) => id.name === "HPC&AI平台-储存数据")?.id!
                }
              />
              <RightStoreCapacity
                dataVersion={dataVersion}
                id={
                  boxIds?.find((id) => id.name === "HPC&AI平台-储存容量")?.id!
                }
              />
            </div>
          </div>

          <div className="home-page-main-right-bot">
            <CustomerSource
              dataVersion={dataVersion}
              id={boxIds?.find((id) => id.name === "客户资源算力使用")?.id!}
            />
          </div>
        </div>

        <div className="button-base " ref={btnRef}>
          <ButtonBase onClick={togglePopup} />
        </div>

        {isPopupVisible ? (
          <div className="home-page-main-modal" ref={popupRef}>
            <DayModal id={boxIds?.find((id) => id.name === "动环数据")?.id!} />
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
