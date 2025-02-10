import PanelWrapper from '@/components/PanelWrapper'
import Pie3d from '@/components/Pie3d'
import './index.less'
import NumberTween from '@/components/NumberTween';
import ChartPie3D from '@/components/ChartPie3D';
import React, { useEffect, useRef, useState } from 'react';
import { getConfigData } from '@/api';
import { ip, port } from '@/util';
const RightStoreCapacity: React.FC<IdProps> = ({ id }) => {
  const preValueRef = useRef<number>(0)
  const [dataSource, setDataSource] = useState<Array<pieType>>([]);
  const initData = async () => {
    const params = new FormData();
    params.append("ip", ip);
    params.append("port", port);
    params.append("boxId", id);
    const response = await getConfigData(params);
    if (response.code === 200) {
      const data = response.data as typeData[];
      const _dataSource: pieType[] = [
        {
          value: 100 - Number(data[0].content),
          itemStyle: {
            color: "#E9E9E9",
          },
        },
        {
          value: Number(data[0].content),
          itemStyle: {
            color: "#6a94fd",
          },
        },
      ];
      preValueRef.current = _dataSource[1].value
      setDataSource(_dataSource);
    }
  };
  useEffect(() => {
    id && initData();
  }, [id]);
  return (
    <div className='main-right-store-capacity'>
      <PanelWrapper width={170.5} height={27} content="储存容量" />
      <div className='right-capacity-num'><NumberTween value={preValueRef.current} /></div>
      <ChartPie3D width={165} height={157} data={dataSource} left={6} top={-45}/>
      <div className="pie-base-bg"></div>
      <div className='right-capacity-desc'>提供50TNAS存储容量</div>
    </div>
  )
}

export default RightStoreCapacity
