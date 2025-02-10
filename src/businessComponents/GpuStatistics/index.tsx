import ProcessBar from "@/components/ProcessBar";
import "./index.less";
import PanelWrapper from "@/components/PanelWrapper";
import NumberTween from "@/components/NumberTween";
import React, { useEffect, useState } from "react";
import { ip, port } from "@/util";
import { getConfigData } from "@/api";
import websocket from "@/websocket";
const GpuStatistics: React.FC<IdProps> = ({ id }) => {
  const [barDataSource, setBarDataSource] = useState<Array<typeData>>([]);
  const initData = async (bId?: number) => {
    const params = new FormData();
    params.append("ip", ip);
    params.append("port", port);
    params.append("boxId", id ?? bId);
    const response = await getConfigData(params);
    if (response.code === 200) {
      const data = response.data as typeData[];
      setBarDataSource(data);
    }
  };
  useEffect(() => {
    id && initData();
  }, [id]);
  

  return (
    <div className="main-left-gpu-statistics">
      <PanelWrapper width={362} height={27} content="GPU统计数据" />

      <div className="gpu-statistics-bar">
        <div className="gpu-statistics-top">
          <div className="bar-content-1">L40sGPU卡</div>
          <div className="bar-content-2">
            <NumberTween value={Number(barDataSource.find(item=>item.title === '已使用')?.content)} />
          </div>
        </div>
        <ProcessBar width={339} height={8} value={Number(barDataSource.find(item=>item.title === '已使用')?.content)} data={Number(barDataSource.find(item=>item.title === '提供L40sGPU卡')?.content)} />
      </div>

      <div className="gpu-statistics-card">
        <div className="card-left">
          <div className="card-left-icon"></div>
          <div className="card-left-bot"></div>
        </div>
        <div className="card-right">
          <div className="card-right-content-1">
            <div>提供L40sGPU卡</div>
            <NumberTween value={Number(barDataSource.find(item=>item.title === '提供L40sGPU卡')?.content)} />
          </div>
          <div className="card-right-content-2">
            <div>计算能力约</div>
            <NumberTween value={Number(barDataSource.find(item=>item.title === '计算能力')?.content)} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default GpuStatistics;
