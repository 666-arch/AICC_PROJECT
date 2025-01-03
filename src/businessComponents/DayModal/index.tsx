import React from 'react'

function DayModal() {
  const list = [
    {
        icon: '',
        content: '温度',
        value: ''
    },
    {
        icon: '',
        content: '湿度',
        value: ''
    },
    {
        icon: '',
        content: '电流/机柜',
        value: ''
    },
    {
        icon: '',
        content: '电量',
        value: ''
    },
  ]
  return (
    <div className='day-modal'>
      <div className='day-modal-title'></div>
      <div className='day-modal-main'>
        <div></div>
      </div>
    </div>
  )
}

export default DayModal
