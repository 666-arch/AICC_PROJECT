import ProcessBar from "@/components/ProcessBar";
import "./index.less";
import PanelWrapper from "@/components/PanelWrapper";
import NumberTween from "@/components/NumberTween";
function GpuStatistics() {
  return (
    <div className="main-left-gpu-statistics">
      <PanelWrapper width={362} height={27} content="GPU统计数据" />

      <div className="gpu-statistics-bar">
        <div className="gpu-statistics-top">
          <div className="bar-content-1">L40sGPU卡</div>
          <div className="bar-content-2"><NumberTween value={84}/></div>
        </div>
        <ProcessBar width={339} height={8} value={84} data={120}/>
      </div>

      <div className="gpu-statistics-card">
        <div className="card-left">
          <div className="card-left-icon"></div>
          <div className="card-left-bot"></div>
        </div>
        <div className="card-right">
          <div className="card-right-content-1">
            <div>提供L40sGPU卡</div>
            <NumberTween value={120}/>
          </div>
          <div className="card-right-content-2">
            <div>计算能力约</div>
            <NumberTween value={84}/>
          </div>
        </div>
      </div>
    </div>
  );
}

export default GpuStatistics;
