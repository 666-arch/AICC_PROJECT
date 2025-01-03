import PanelWrapper from '@/components/PanelWrapper'
import React from 'react'
import './index.less'
import NumberTween from '@/components/NumberTween'
function RightCpuStatistics() {
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
            <NumberTween value={1832}/>
          </div>
          <div className="card-right-cpu-content-2">
            <div>计算能力约</div>
            <NumberTween value={84}/>
          </div>
        </div>
      </div>

    </div>
  )
}

export default RightCpuStatistics
