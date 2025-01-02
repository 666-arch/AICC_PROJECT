import PanelWrapper from "@/components/PanelWrapper";
import React from "react";
import './index.less'
function CpuStatistics() {
  return (
    <div className="main-left-cpu-statistics">
      <div>
        <PanelWrapper width={362} height={27} content="CPU统计数据" />
      </div>
      <div className="cpu-statistics-main">
        <div className="cpu-statistics-left"></div>
        <div className="cpu-statistics-right">
          <div className="statistics-top">
            <div>提供</div>
            <div>3555</div>
          </div>

          <div className="statistics-mid-1">
            <div>已分配</div>
            <div>44.85</div>
            <div className="statistics-mid-line"></div>
          </div>

          <div className="statistics-mid-2">
            <div>未分配</div>
            <div>55.15</div>
            <div className="statistics-mid-line"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CpuStatistics;
