import PanelWrapper from '@/components/PanelWrapper'
import React from 'react'
import './index.less'
import ProcessBar from '@/components/ProcessBar'
import NumberTween from '@/components/NumberTween'
function RightGpuStatistics() {
  return (
    <div className='main-right-gpu-statistics'>
      <PanelWrapper width={362} height={27} content="GPU统计数据" />
      
      <div className="gpu-statistics-bar">
        <div className="gpu-statistics-top">
          <div className="bar-content-1">L40sGPU卡</div>
          <div className="bar-content-2"><NumberTween value={144}/></div>
        </div>
        <ProcessBar width={339} height={8} value={144} data={160} left='-20' right='-40'/>
      </div>
      
      <div className="right-gpu-statistics-card">
        <div className="card-gpu-left">
          <div className="card-gpu-left-icon"></div>
          <div className="card-gpu-left-bot"></div>
        </div>
        <div className="card-gpu-right">
          <div className="card-right-gpu-content-1">
            <div>提供L40sGPU卡</div>
            <NumberTween value={160}/>
          </div>
          <div className="card-right-gpu-content-2">
            <div>计算能力约</div>
            <NumberTween value={112}/>
          </div>
        </div>
      </div>
    </div>
  )
}

export default RightGpuStatistics
