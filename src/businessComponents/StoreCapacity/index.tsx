import React, { useEffect } from "react";
import "./index.less";
import PanelWrapper from "@/components/PanelWrapper";
function StoreCapacity() {
  return (
    <div className="main-left-store-capacity">
      <PanelWrapper width={170.5} height={27} content="储存容量" />
    </div>
  );
}

export default StoreCapacity;
