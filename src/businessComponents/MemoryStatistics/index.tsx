import PanelWrapper from "@/components/PanelWrapper";
import "./index.less";
import Pie3d from "@/components/Pie3d";
import NumberTween from "@/components/NumberTween";
import ChartPie3D from "@/components/ChartPie3D";
const optionsData = [
  {
    name: "未分配",
    value: 55.15,
    itemStyle: {
      color: "#E9E9E9",
    },
  },
  {
    name: "已分配",
    value: 44.85,
    itemStyle: {
      color: "#6a94fd",
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
          {/* <Pie3d width={250} height={215} data={optionsData} /> */}
          <ChartPie3D width={250} height={215} data={optionsData}/>
          <div className="pie-base-bg"></div>
          <div className="legend-box">
            <div>未分配</div>
            <div>已分配</div>
          </div>
        </div>

        <div className="memory-statistics-right">
          <div className="statistics-top">
            <div>提供</div>
            <NumberTween value={38695} isCpu={true}/>
          </div>

          <div className="statistics-mid-1">
            <div>已分配</div>
            <NumberTween value={33.50} decimal={2}/>
            <div className="statistics-mid-line"></div>
          </div>

          <div className="statistics-mid-2">
            <div>未分配</div>
            <NumberTween value={66.50} decimal={2}/>
            <div className="statistics-mid-line"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MemoryStatistics;
