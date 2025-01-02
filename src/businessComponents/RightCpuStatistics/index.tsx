import PanelWrapper from '@/components/PanelWrapper'
import React from 'react'
import './index.less'
function RightCpuStatistics() {
  return (
    <div className="main-right-cpu-statistics">
      <PanelWrapper width={362} height={27} content="CPU统计数据" />
    </div>
  )
}

export default RightCpuStatistics
