import React from "react";
import "./index.less";
import PanelWrapper from "@/components/PanelWrapper";
import Pie3d from "@/components/Pie3d";
import NumberTween from "@/components/NumberTween";
const optionsData = [
  {
    name: "未分配",
    value: 600,
    itemStyle: {
      color: "#E9E9E9",
    },
  },
  {
    name: "已分配",
    value:210,
    itemStyle: {
      color: "#6a94fd",
    },
  },
];
function RightStoreSouce() {
  return (
    <div className="main-right-store-source">
      <PanelWrapper width={170.5} height={27} content="储存数据" />
      <div className="right-source-num">
        <NumberTween value={19} />
      </div>
      <Pie3d width={165} height={157} data={optionsData} left={6} top={-45} />
      <div className="pie-base-bg"></div>
      <div className="right-source-desc">提供1.27P并行文件存储容量</div>
    </div>
  );
}

export default RightStoreSouce;
