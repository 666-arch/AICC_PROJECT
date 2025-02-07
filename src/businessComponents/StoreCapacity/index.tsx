import React, { useEffect, useState } from "react";
import "./index.less";
import PanelWrapper from "@/components/PanelWrapper";
import Pie3d from "@/components/Pie3d";
import NumberTween from "@/components/NumberTween";
import ChartPie3D from "@/components/ChartPie3D";
import { ip, port } from "@/util";
import { getConfigData } from "@/api";
const StoreCapacity: React.FC<IdProps> = ({ id }) => {
  const [dataSource, setDataSource] = useState<Array<pieType>>([]);
  const initData = async () => {
    const params = new FormData();
    params.append("ip", ip);
    params.append("port", port);
    params.append("boxId", id);
    const response = await getConfigData(params);
    if (response.code === 200) {
      console.log("d", response.data);
      const data = response.data as typeData[];
      const totalNum = Number(data[0].content) + Number(data[0].subtitle);
      const _dataSource = [
        {
          value: (Number(data[0].content) / totalNum) * 100,
          itemStyle: {
            color: "#E9E9E9",
          },
        },
        {
          value: (Number(data[0].subtitle) / totalNum) * 100,
          itemStyle: {
            color: "#6a94fd",
          },
        },
      ];
      setDataSource(_dataSource);
    }
  };
  useEffect(() => {
    id && initData();
  }, [id]);
  return (
    <div className="main-left-store-capacity">
      <PanelWrapper width={170.5} height={27} content="储存容量" />
      <div className="capacity-num">
        <NumberTween value={9} />
      </div>
      <ChartPie3D
        width={165}
        height={157}
        data={dataSource}
        left={6}
        top={-45}
      />
      <div className="pie-base-bg"></div>
      <div className="capacity-desc">提供100T对象存储容量</div>
    </div>
  );
};

export default StoreCapacity;
