import { Outlet, useLocation } from "umi";
import "./index.less";
import autofit from "autofit.js";
import { useEffect } from "react";
import websocket from "@/websocket";

const Layout = () => {
  useEffect(() => {
    websocket.initWebSocket();
    websocket.setOnReceivedUdp(() => {
      location.reload();
    });
  }, []);
  return (
    <div id="global-layout" className="global-layout">
      <Outlet />
    </div>
  );
};

export default Layout;
