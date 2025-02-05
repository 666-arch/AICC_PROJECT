import NumberTween from '@/components/NumberTween';
import './index.less'
import PanelWrapper from '@/components/PanelWrapper'
import Pie3d from '@/components/Pie3d'
import ChartPie3D from '@/components/ChartPie3D';
// const optionsData = [
//   {
//     name: "未分配",
//     value: 560,
//     itemStyle: {
//       color: "#E9E9E9",
//     },
//   },
//   {
//     name: "已分配",
//     value: 260,
//     itemStyle: {
//       color: "#6a94fd",
//     },
//   },
// ];

const optionsData = [
  {
    name: "未分配",
    value: 55.15,
    itemStyle: {
      color: "#E9E9E9",
    },
  },
  {
    name: "已分配",
    value: 44.85,
    itemStyle: {
      color: "#6a94fd",
    },
  },
];
function StoreSource() {
  return (
    <div className='main-left-store-source'>
      <PanelWrapper width={170.5} height={27} content="储存数据" />
      <div className='source-num'><NumberTween value={26}/></div>
      {/* <Pie3d width={165} height={157} data={optionsData} left={6} top={-45}/> */}
      <ChartPie3D width={165} height={157} data={optionsData} left={6} top={-45}/>
      <div className="pie-base-bg"></div>
      <div className='source-desc'>提供 0.9P块存储容量</div>
    </div>
  )
}

export default StoreSource
