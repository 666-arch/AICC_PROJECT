import { Outlet, useLocation } from "umi";
import "./index.less";
import { useEffect } from "react";
import autofit from "autofit.js";

const Layout = () => {
  const { pathname } = useLocation();
  // useEffect(() => {
  //   if (document.getElementById("global-layout")) {
  //     autofit.init({
  //       el: "#global-layout",
  //       dh: 1080,
  //       dw: 1920,
  //       resize: true,
  //     });
  //   }
  // });
  const nodeLayoutContent = () => {
    return (
      <div id="global-layout" className="global-layout">
        <Outlet />
      </div>
    );
  };
  return <>{nodeLayoutContent()}</>;
};

export default Layout;
