import "./index.less";
import PanelWrapper from "./../../components/PanelWrapper/index";
import MemoryStatistics from "@/businessComponents/MemoryStatistics";
import CpuStatistics from "@/businessComponents/CpuStatistics";
import GpuStatistics from "@/businessComponents/GpuStatistics";
import StoreSource from "@/businessComponents/StoreSource";
import StoreCapacity from "@/businessComponents/StoreCapacity";
const HomePage = () => {
  return (
    <div className="home-page-content">
      <div className="home-page-header">
        <div className="home-page-title">AICC算力数据监测系统</div>
      </div>
      <div className="home-page-main">
        <div className="home-page-main-left">
          <div className="main-left-cloud-platform">
            <div className="main-left-title-box">
              <div className="title-box-icon"></div>
              <div>云平台</div>
            </div>
            <div className="main-left-title-line"></div>
          </div>

          {/* 内存统计数据 */}
          <MemoryStatistics/>
          {/* CPU统计数据 */}
          <CpuStatistics/>
          {/* GPU统计数据 */}
          <GpuStatistics/>

          {/* 储存数据 */}
          
          <div style={{display:'flex', gap:'15px'}}>
            {/* 储存数据 */}
            <StoreSource/>
            {/* 储存容量 */}
            <StoreCapacity/>
          </div>          
        </div>

        <div className="home-page-main-right">
          <div className="home-page-main-right-top"></div>
          <div className="home-page-main-right-bot"></div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
