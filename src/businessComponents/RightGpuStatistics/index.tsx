import PanelWrapper from '@/components/PanelWrapper'
import React from 'react'
import './index.less'
function RightGpuStatistics() {
  return (
    <div className='main-right-gpu-statistics'>
      <PanelWrapper width={362} height={27} content="GPU统计数据" />
    </div>
  )
}

export default RightGpuStatistics
