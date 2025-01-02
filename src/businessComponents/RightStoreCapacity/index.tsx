import PanelWrapper from '@/components/PanelWrapper'
import './index.less'
import Pie3d from '@/components/Pie3d'
const optionsData = [
  {
    name: "未分配",
    value: 260,
    itemStyle: {
      color: "#E9E9E9",
    },
  },
  {
    name: "已分配",
    value: 300,
    itemStyle: {
      color: "#98B6FF",
    },
  },
];
function RightStoreCapacity() {
  return (
    <div className='main-right-store-capacity'>
      <PanelWrapper width={170.5} height={27} content="储存容量" />
      <div className='right-capacity-num'>32</div>
      <Pie3d width={165} height={157} data={optionsData} left={6} top={-45}/>
      <div className='right-capacity-desc'>提供50TNAS存储容量</div>
    </div>
  )
}

export default RightStoreCapacity
