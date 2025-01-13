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
      chartRef.current.setOption({
        grid: {
          top: "0",
          left: "-20",
          right: "0",
          bottom: "0",
          containLabel: true,
        },
        yAxis: [
          {
            type: "category",
            data: [""],
            inverse: true,
            axisTick: {
              show: false,
            },
            axisLabel: {
              margin: 20,
              fontSize: 18,
              color: "#fff",
            },
            axisLine: {
              show: false,
            },
          },
        ],
        xAxis: [
          {
            type: "value",
            axisLabel: {
              show: false,
            },
            axisLine: {
              show: false,
            },
            splitLine: {
              show: false,
            },
          },
        ],
        series: [
          {
            type: "bar",
            barWidth: height,
            data: [value],
            label: {
              show: true,
              position: "insideBottomRight",
              formatter: "{c}",
              distance: 0,
              offset: [125, -20],
              color: "#fff",
              fontSize: 16,
              padding: [5, 15, 10, 15],
            },
            itemStyle: {
              color: new echarts.graphic.LinearGradient(
                1,
                0,
                0,
                0,
                [
                  {
                    offset: 0,
                    color: "#295BD3", // 0% 处的颜色
                  },
                  {
                    offset: 1,
                    color: "#80A4FF", // 100% 处的颜色
                  },
                ],
                false
              ),
              borderRadius: 29,
            },
          },
          {
            type: "bar",
            barWidth: height,
            xAxisIndex: 0,
            barGap: "-100%",
            data: [200],
            itemStyle: {
              color: "#ffffff4b",
              borderRadius: 29,
            },
            zlevel: -1,
          },
        ],
      });
    }
  }, []);
  return <div ref={divRef}></div>;
};

export default ProcessBar;
