import NumberTween from "@/components/NumberTween";
import React, { useEffect, useRef, useState } from "react";
import "./index.less";
import { ip, port } from "@/util";
import { getConfigData } from "@/api";
interface dataType {
  content: string;
  value: number;
  rate: string;
}
const DayModal: React.FC<IdProps> = ({ id }) => {
  const [dataSource, setDataSource] = useState<Array<dataType>>([]);
  const modalRef = useRef<HTMLDivElement>(null);
  const initData = async () => {
    const rates = ["℃", "RH", "A", "KWh"];
    const params = new FormData();
    params.append("ip", ip);
    params.append("port", port);
    params.append("boxId", id);
    const response = await getConfigData(params);
    if (response.code === 200) {
      const data = response.data as typeData[];
      const _dataSource = [...dataSource];
      data.forEach((item, index) => {
        const _item = {
          content: item.title,
          value: Number(item.content),
          rate: rates[index],
        };
        _dataSource.push(_item);
      });
      setDataSource(_dataSource);
    }
  };
  useEffect(() => {
    id && initData();
  }, [id]);
  return (
    <div className="day-modal" ref={modalRef}>
      <div className="day-modal-title">日均</div>
      <div className="day-modal-line"></div>
      <div className="day-modal-main">
        {dataSource.map((item, index) => {
          return (
            <div className="day-item" key={item.content}>
              <div className={`icon-${index + 1}`}></div>
              <div className="day-item-data">
                <div>{item.content}</div>
                <div className="data-desc">
                  <NumberTween
                    value={item.value}
                    decimal={item.content !== "电量" ? 2 : 0}
                  />
                  <div className={`rate-${index + 1}`}>{item.rate}</div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default DayModal;
