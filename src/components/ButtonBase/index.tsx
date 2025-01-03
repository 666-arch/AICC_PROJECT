import React from 'react'
import './index.less'
 const ButtonBase = () => {
  const handleClick = () => {
    console.log('aaa');
  }
  return (
    <div className='button-base' onClick={handleClick}>
      <div className='button-base-inner'>动环数据</div>
    </div>
  )
}

export default ButtonBase
