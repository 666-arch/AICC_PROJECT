import React from 'react'
import './index.less'
import PanelWrapper from '@/components/PanelWrapper'
function GpuStatistics() {
  return (
    <div className='main-left-gpu-statistics'>
      <PanelWrapper width={362} height={27} content="GPU统计数据" />

      <div className='gpu-statistics-bar'>
        <div className='gpu-statistics-top'>
            <div className='bar-content-1'>L40sGPU卡</div>
            <div className='bar-content-2'>84</div>
        </div>
        <div className='gpu-statistics-bot'></div>
      </div>

      <div className='gpu-statistics-card'>
        <div className='card-left'></div>
        <div className='card-right'>
            <div className='card-right-content-1'>
                <div>提供L40sGPU卡</div>
                <div>120</div>
            </div>
            <div className='card-right-content-2'>
                <div>计算能力约</div>
                <div>84</div>
            </div>
        </div>
      </div>
    </div>
  )
}

export default GpuStatistics
