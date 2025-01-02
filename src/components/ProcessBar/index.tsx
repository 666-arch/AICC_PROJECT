import React, { useEffect, useRef } from "react";
import * as echarts from "echarts/core";
import {
  TooltipComponent,
  LegendComponent,
  PolarComponent,
  TitleComponent,
  GridComponent,
} from "echarts/components";
import { PieChart, BarChart } from "echarts/charts";
import { LabelLayout } from "echarts/features";
import { CanvasRenderer } from "echarts/renderers";

echarts.use([
  TooltipComponent,
  LegendComponent,
  PieChart,
  CanvasRenderer,
  LabelLayout,
  PolarComponent,
  TitleComponent,
  BarChart,
  GridComponent,
]);

interface IProps {
  width: React.CSSProperties["width"];
  height: React.CSSProperties["height"];
  value: number;
}
const ProcessBar: React.FC<IProps> = ({ width, height, value }) => {
  const divRef = useRef<HTMLDivElement>(null);
  const chartRef = useRef<echarts.EChartsType | null>(null);
  useEffect(() => {
    if (divRef.current) {
      chartRef.current = echarts.init(divRef.current, undefined, {
        width,
        height,
      });
    }
  }, []);
  return <div ref={divRef} className="process-bar-chart"></div>;
};

export default ProcessBar;
