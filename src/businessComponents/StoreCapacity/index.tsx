import React, { useEffect } from "react";
import "./index.less";
import PanelWrapper from "@/components/PanelWrapper";
import Pie3d from "@/components/Pie3d";
import NumberTween from "@/components/NumberTween";
const optionsData = [
  {
    name: "未分配",
    value: 260,
    itemStyle: {
      color: "#E9E9E9",
    },
  },
  {
    name: "已分配",
    value: 300,
    itemStyle: {
      color: "#6a94fd",
    },
  },
];
function StoreCapacity() {
  return (
    <div className="main-left-store-capacity">
      <PanelWrapper width={170.5} height={27} content="储存容量" />
      <div className='capacity-num'><NumberTween value={9}/></div>
      <Pie3d width={165} height={157} data={optionsData} left={6} top={-45}/>
      <div className="pie-base-bg"></div>
      <div className='capacity-desc'>提供100T对象存储容量</div>
    </div>
  );
}

export default StoreCapacity;
