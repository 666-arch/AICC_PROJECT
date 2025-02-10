import PanelWrapper from '@/components/PanelWrapper'
import React, { useEffect, useState } from 'react'
import './index.less'
import NumberTween from '@/components/NumberTween'
import { ip, port } from '@/util'
import { getConfigData } from '@/api'
const RightCpuStatistics:React.FC<IdProps> = ({ id }) => {
  const [dataSource, setDataSource] = useState<Array<typeData>>([])
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
    <div className="main-right-cpu-statistics">
      <PanelWrapper width={362} height={27} content="CPU统计数据" />

      <div className="right-cpu-statistics-card">
        <div className="card-cpu-left">
          <div className="card-cpu-left-icon"></div>
          <div className="card-cpu-left-bot"></div>
        </div>
        <div className="card-cpu-right">
          <div className="card-right-cpu-content-1">
            <div>提供</div>
            <NumberTween value={Number(dataSource.find(item=>item.title === '核CPU')?.content)}/>
          </div>
          <div className="card-right-cpu-content-2">
            <div>计算能力约</div>
            <NumberTween value={Number(dataSource.find(item=>item.title === '计算能力')?.content)} decimal={2}/>
          </div>
        </div>
      </div>

    </div>
  )
}

export default RightCpuStatistics
