import { Outlet, useLocation } from "umi";
import "./index.less";
import autofit from "autofit.js";

const Layout = () => {
  return (
    <div id="global-layout" className="global-layout">
      <Outlet />
    </div>
  );
};

export default Layout;
