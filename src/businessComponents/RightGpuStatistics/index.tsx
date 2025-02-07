import PanelWrapper from "@/components/PanelWrapper";
import React, { useEffect, useState } from "react";
import "./index.less";
import ProcessBar from "@/components/ProcessBar";
import NumberTween from "@/components/NumberTween";
import { ip, port } from "@/util";
import { getConfigData } from "@/api";
const RightGpuStatistics: React.FC<IdProps> = ({ id }) => {
  const [dataSource, setDataSource] = useState<Array<typeData>>([]);
  const initData = async () => {
    const params = new FormData();
    params.append("ip", ip);
    params.append("port", port);
    params.append("boxId", id);
    const response = await getConfigData(params);
    if (response.code === 200) {
      const data = response.data as typeData[];
      setDataSource(data);
    }
  };
  useEffect(() => {
    id && initData();
  }, [id]);
  return (
    <div className="main-right-gpu-statistics">
      <PanelWrapper width={362} height={27} content="GPU统计数据" />

      <div className="gpu-statistics-bar">
        <div className="gpu-statistics-top">
          <div className="bar-content-1">L40sGPU卡</div>
          <div className="bar-content-2">
            <NumberTween
              value={Number(
                dataSource.find((item) => item.title === "已使用")?.content
              )}
            />
          </div>
        </div>
        <ProcessBar
          width={339}
          height={8}
          value={Number(
            dataSource.find((item) => item.title === "已使用")?.content
          )}
          data={Number(
            dataSource.find((item) => item.title === "提供L40sGPU卡")?.content
          )}
          left="-20"
          right="-40"
        />
      </div>

      <div className="right-gpu-statistics-card">
        <div className="card-gpu-left">
          <div className="card-gpu-left-icon"></div>
          <div className="card-gpu-left-bot"></div>
        </div>
        <div className="card-gpu-right">
          <div className="card-right-gpu-content-1">
            <div>提供L40sGPU卡</div>
            <NumberTween
              value={Number(
                dataSource.find((item) => item.title === "提供L40sGPU卡")
                  ?.content
              )}
            />
          </div>
          <div className="card-right-gpu-content-2">
            <div>计算能力约</div>
            <NumberTween
              value={Number(
                dataSource.find((item) => item.title === "计算能力")?.content
              )}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default RightGpuStatistics;
