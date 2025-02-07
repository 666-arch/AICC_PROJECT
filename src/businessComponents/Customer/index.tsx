import ChartPie3D from "@/components/ChartPie3D";
import "./index.less";
import NumberTween from "@/components/NumberTween";
import React from "react";
const optionsData = [
  {
    name: "神州问学：",
    // value: 260,
    value: 57,
    perValue: 0,
    textColor: "#415DFF",
    itemStyle: {
      color: "#80A4FF",
    },
  },
  {
    name: "科技公司：",
    // value: 330,
    value: 21,
    perValue: 0,
    textColor: "#4187CB",
    itemStyle: {
      color: "#5E9AD3",
    },
  },
  {
    name: "科研机构：",
    // value: 200,
    value: 14,
    perValue: 0,
    textColor: "#7A56E3",
    itemStyle: {
      color: "#A096FF",
    },
  },
  {
    name: "制造业：",
    // value: 500,
    value: 8,
    perValue: 0,
    textColor: "#2B60E0",
    itemStyle: {
      color: "#4170E3",
    },
  },
];
const CustomerSource: React.FC<IdProps> = ({ id }) => {
  
   return (
    <>
      <div className="main-right-customer-platform">
        <div className="main-right-title-box">
          <div className="title-box-icon"></div>
          <div>客户资源算力使用</div>
        </div>
        <div className="main-right-title-line"></div>
      </div>

      <div className="main-right-bot-chart">
        <div className="chart-left">
          <ChartPie3D
            width={290}
            height={255}
            data={optionsData}
            left={-60}
            top={-70}
          />
          <div className="pie-base-bg"></div>
        </div>
        <div className="chart-right">
          {optionsData.map((item, index) => {
            return (
              <div className="chart-item" key={item.itemStyle.color}>
                <div
                  style={
                    index !== 3
                      ? {
                          width: "5px",
                          height: "5px",
                          borderRadius: "50%",
                          marginRight: "8px",
                          backgroundColor: item.textColor,
                        }
                      : {
                          width: "5px",
                          height: "5px",
                          borderRadius: "50%",
                          marginLeft: "14px",
                          backgroundColor: item.textColor,
                        }
                  }
                ></div>
                <div style={index === 3 ? { paddingLeft: "8px" } : {}}>
                  {item.name}
                </div>
                <div
                  style={{
                    color: item.textColor,
                  }}
                >
                  <NumberTween value={item.value} />
                </div>
                <div
                  style={{
                    color: item.textColor,
                    fontFamily: " Source Han Sans CN",
                    fontSize: "13px",
                    fontWeight: "350",
                    lineHeight: "11px",
                    marginTop: "8px",
                  }}
                >
                  %
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default CustomerSource;
