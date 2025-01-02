import PanelWrapper from '@/components/PanelWrapper'
import React from 'react'
import './index.less'
import ProcessBar from '@/components/ProcessBar'
function RightGpuStatistics() {
  return (
    <div className='main-right-gpu-statistics'>
      <PanelWrapper width={362} height={27} content="GPU统计数据" />
      
      <div className="right-gpu-statistics-bar">
        <div className="right-gpu-statistics-top">
          <div className="right-bar-content-1">L40sGPU卡</div>
          <div className="right-bar-content-2">84</div>
        </div>
        <ProcessBar width={362} height={8} value={10} />
      </div>
      
    </div>
  )
}

export default RightGpuStatistics
