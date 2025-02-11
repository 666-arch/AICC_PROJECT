import { Outlet, useLocation } from "umi";
import "./index.less";
import autofit from "autofit.js";
import { useEffect } from "react";
import websocket from "@/websocket";
import { changeSuccessData } from "@/api";

const Layout = () => {
  console.log('everoment', process.env.NODE_ENV);
  
  return (
    <div id="global-layout" className="global-layout">
      <Outlet />
    </div>
  );
};

export default Layout;
