import PanelWrapper from "@/components/PanelWrapper";
import React, { useEffect, useRef, useState } from "react";
import "./index.less";
import NumberTween from "@/components/NumberTween";
import { getLeftCPU } from "@/api";
import { ip, port } from "@/util";
import ChartPie3D from "@/components/ChartPie3D";
interface IProps {
  id: string;
}
const CpuStatistics: React.FC<IProps> = ({ id }) => {
  const colors = ["#6a94fd", "#E9E9E9"];
  const [pieDataSource, setPieDataSource] = useState<Array<pieType>>([]);
  const totalNumRef = useRef<number>(0);
  const initData = async () => {
    const params = new FormData();
    params.append("ip", ip);
    params.append("port", port);
    params.append("boxId", id);
    const response = await getLeftCPU(params);
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
    initData();
  }, [id]);
  return (
    <div className="main-left-cpu-statistics">
      <PanelWrapper width={362} height={27} content="CPU统计数据" />
      <div className="cpu-statistics-main">
        <div className="cpu-statistics-left">
          <ChartPie3D width={250} height={215} data={pieDataSource} />
          <div className="pie-base-bg"></div>
          <div className="legend-box">
            <div>未分配</div>
            <div>已分配</div>
          </div>
        </div>
        <div className="cpu-statistics-right">
          <div className="statistics-top">
            <div>提供</div>
            <NumberTween value={totalNumRef.current} />
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

export default CpuStatistics;
