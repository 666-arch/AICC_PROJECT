import { Outlet, useLocation } from "umi";
import "./index.less";
import autofit from "autofit.js";
import { useEffect } from "react";
import websocket from "@/websocket";
import { changeSuccessData } from "@/api";

const Layout = () => {
  //update_78
  const fetchDataForItem = async (item: string) => {
    const params = new FormData();
    params.append("boxId", item);
    await changeSuccessData(params);
  }
  const fetchDataForArray = async (items: Array<string>) => {
    try {
      const response = await Promise.all(items.map(fetchDataForItem))
      return response
    } catch (error) {
    }
  }
  useEffect(() => {
    websocket.initWebSocket();
    const handleUdpMessage = (data: string) => {
      if (data === "update_78") {
        const jsonData = localStorage.getItem("boxId");
        if (!jsonData) return;
        try {
          const boxIds = JSON.parse(jsonData);
          const uniqueBoxIds = Array.from(new Set(boxIds)) as string[];
          fetchDataForArray(uniqueBoxIds);
        } catch (e) {
          console.error("解析boxId失败:", e);
        }
      }
    };
    websocket.setOnReceivedUdp(handleUdpMessage);
  }, []);
  return (
    <div id="global-layout" className="global-layout">
      <Outlet />
    </div>
  );
};

export default Layout;
