import ChartPie3D from "@/components/ChartPie3D";
import "./index.less";
import NumberTween from "@/components/NumberTween";
import React, { useEffect, useState } from "react";
import { getConfigData } from "@/api";
import { ip, port } from "@/util";
const optionsData = [
  {
    name: "神州问学：",
    value: 57,
    perValue: 0,
    textColor: "#415DFF",
    itemStyle: {
      color: "#80A4FF",
    },
  },
  {
    name: "科技公司：",
    value: 21,
    perValue: 0,
    textColor: "#4187CB",
    itemStyle: {
      color: "#5E9AD3",
    },
  },
  {
    name: "科研机构：",
    value: 14,
    perValue: 0,
    textColor: "#7A56E3",
    itemStyle: {
      color: "#A096FF",
    },
  },
  {
    name: "制造业：",
    value: 8,
    perValue: 0,
    textColor: "#2B60E0",
    itemStyle: {
      color: "#4170E3",
    },
  },
];
const CustomerSource: React.FC<IdProps> = ({ id }) => {
  const textColors = ['#415DFF', '#4187CB', '#7A56E3', '#2B60E0']
  const itemColors = ['#80A4FF', '#5E9AD3', '#A096FF', '#4170E3']
  const [dataSource, setDataSource] = useState<Array<pieType>>([]);
  const initData = async () => {
    const params = new FormData();
    params.append("ip", ip);
    params.append("port", port);
    params.append("boxId", id);
    const response = await getConfigData(params);
    if (response.code === 200) {
      const data = response.data as typeData[];
      console.log("d", data);
      const totalNum = data.reduce(
        (sum, item) => sum + Number(item.content),
        0
      );
      console.log('totalNum', totalNum);
      
      const _dataSource = [...dataSource];
      data.forEach((item, index)=>{
        const _item = {
            name: item.title,
            value: ((Number(item.content) / totalNum) * 100),
            perValue: 0,
            textColor: textColors[index],
            itemStyle: {
                color: itemColors[index]
            }
        }
        _dataSource.push(_item);
      })
      setDataSource(_dataSource);
    }
  };
  useEffect(() => {
    id && initData();
  }, [id]);
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
            data={dataSource}
            left={-60}
            top={-70}
          />
          <div className="pie-base-bg"></div>
        </div>
        <div className="chart-right">
          {dataSource.map((item, index) => {
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
