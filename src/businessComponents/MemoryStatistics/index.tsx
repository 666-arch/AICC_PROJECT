import PanelWrapper from "@/components/PanelWrapper";
import "./index.less";
import Pie3d from "@/components/Pie3d";
import NumberTween from "@/components/NumberTween";
import ChartPie3D from "@/components/ChartPie3D";
import React, { useEffect, useState, useRef } from "react";
import { ip, port } from "@/util";
import { changeSuccessData, getConfigData } from "@/api";
import websocket from "@/websocket";
const MemoryStatistics: React.FC<IdProps> = ({ id }) => {
  const colors = ["#6a94fd", "#E9E9E9"];
  const [pieDataSource, setPieDataSource] = useState<Array<pieType>>([]);
  const totalNumRef = useRef<number>(0);
  const initData = async (bId?: number) => {
    const params = new FormData();
    params.append("ip", ip);
    params.append("port", port);
    params.append("boxId", id ?? bId);
    const response = await getConfigData(params);
    if (response.code === 200) {
      const dataSource = response.data as { content: string; title: string }[];
      const _pieDataSource = [...pieDataSource];
      const totalNum = dataSource.reduce(
        (sum, item) => sum + Number(item.content),
        0
      );
      totalNumRef.current = totalNum;
      for (let i = 0; i < dataSource.length; i++) {
        const _dataSourceItem = dataSource[i];
        const item = {
          number: Number(_dataSourceItem.content),
          name: _dataSourceItem.title,
          itemStyle: {
            color: colors[i],
          },
          value: Number(
            ((Number(_dataSourceItem.content) / totalNum) * 100).toFixed(2)
          ),
        };
        _pieDataSource.push(item);
      }
      
      setPieDataSource(_pieDataSource);
    }
  };
  useEffect(() => {
    id && initData();
  }, [id]);
  
  return (
    <div className="main-left-memory-statistics">
      <div>
        <PanelWrapper width={382} height={27} content="内存统计数据" />
      </div>
      <div className="memory-statistics-main">
        <div className="memory-statistics-left">
          <ChartPie3D width={250} height={215} data={pieDataSource} />
          <div className="pie-base-bg"></div>
          <div className="legend-box">
            <div>未分配</div>
            <div>已分配</div>
          </div>
        </div>

        <div className="memory-statistics-right">
          <div className="statistics-top">
            <div>提供</div>
            <NumberTween value={totalNumRef.current} isCpu={true} />
          </div>

          <div className="statistics-mid-1">
            <div>已分配</div>
            <NumberTween
              value={
                pieDataSource.find((item) => item.name === "已分配")?.value!
              }
              decimal={2}
            />
            <div className="statistics-mid-line"></div>
          </div>

          <div className="statistics-mid-2">
            <div>未分配</div>
            <NumberTween
              value={
                pieDataSource.find((item) => item.name === "未分配")?.value!
              }
              decimal={2}
            />
            <div className="statistics-mid-line"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MemoryStatistics;
