import PanelWrapper from "@/components/PanelWrapper";
import React from "react";
import './index.less'
import Pie3d from "@/components/Pie3d";
import NumberTween from "@/components/NumberTween";
const optionsData = [
  {
    name: "未分配",
    value: 363,
    itemStyle: {
      color: "#E9E9E9",
    },
  },
  {
    name: "已分配",
    value: 290,
    itemStyle: {
      color: "#6a94fd",
    },
  },
];
function CpuStatistics() {
  return (
    <div className="main-left-cpu-statistics">
      <PanelWrapper width={362} height={27} content="CPU统计数据" />
      <div className="cpu-statistics-main">
        <div className="cpu-statistics-left">
          <Pie3d width={250} height={215} data={optionsData} />
          <div className="pie-base-bg"></div>
          <div className="legend-box">
            <div>未分配</div>
            <div>已分配</div>
          </div>
        </div>
        <div className="cpu-statistics-right">
          <div className="statistics-top">
            <div>提供</div>
            <NumberTween value={3555}/>
          </div>

          <div className="statistics-mid-1">
            <div>已分配</div>
            <NumberTween value={44.85}/>
            <div className="statistics-mid-line"></div>
          </div>

          <div className="statistics-mid-2">
            <div>未分配</div>
            <NumberTween value={55.15}/>
            <div className="statistics-mid-line"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CpuStatistics;
