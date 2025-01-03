import PanelWrapper from "@/components/PanelWrapper";
import "./index.less";
import Pie3d from "@/components/Pie3d";
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
      color: "#98B6FF",
    },
  },
];
function MemoryStatistics() {
  return (
    <div className="main-left-memory-statistics">
      <div>
        <PanelWrapper width={382} height={27} content="内存统计数据" />
      </div>
      <div className="memory-statistics-main">
        <div className="memory-statistics-left">
          <Pie3d width={250} height={215} data={optionsData} />
          <div className="pie-base-bg"></div>
          <div className="legend-box">
            <div>未分配</div>
            <div>已分配</div>
          </div>
        </div>

        <div className="memory-statistics-right">
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

export default MemoryStatistics;
