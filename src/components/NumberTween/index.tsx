import { Tween, update } from "@tweenjs/tween.js";
import { useEffect, useState } from "react";

interface IProps extends React.AllHTMLAttributes<HTMLDivElement> {
  value: number | string;
  duration?: number;
  delay?: number; // 新增延迟时间入参
  /**
   * @description 保留小数位数
   */
  decimal?: number;
  /**
   * @description 取整
   * @default true
   */
  floor?: boolean;
  /**
   * @description 取正数
   * @default true
   */
  positive?: boolean;
  isCpu?: boolean;
}
const NumberTween: React.FC<IProps> = ({
  value = 0,
  duration = 1000,
  delay = 0,
  decimal,
  floor = false,
  positive = false,
  isCpu = false,
  ...rest
}) => {
  const [innerValue, setInnerValue] = useState<string>("0");
  useEffect(() => {
    const timer = setTimeout(() => {
      let baseDecimal = 1;
      if (decimal) {
        for (let i = 0; i < decimal; i++) {
          baseDecimal = baseDecimal * 10;
        }
      }
      const num = Number(value);
      let realNum = isNaN(num)
        ? 0
        : decimal
        ? Number(Math.round(num * 10) / 10)
        : // ? Number(Math.floor(num * baseDecimal) / baseDecimal)
        floor
        ? Math.round(num)
        : num;
      positive && num < 0 && (realNum = 0);
      tweenNumber(realNum, setInnerValue, duration);
    }, delay);
    return () => clearTimeout(timer);
  }, [value, delay, floor, decimal, positive]);

  const animate = () => {
    if (update()) {
      requestAnimationFrame(animate);
    }
  };

  const tweenNumber = (
    value: number,
    setState: React.Dispatch<React.SetStateAction<string>>,
    duration: number
  ) => {
    // 切分整数与小数部分
    const valueArr = `${value}`.split(".");
    const fixedNumber = valueArr.length === 2 ? valueArr[1].length : 0;
    new Tween({
      number: 0,
    })
      .to(
        {
          number: value,
        },
        duration
      )
      .onUpdate((tween: any) => {
        setState(tween.number.toFixed(fixedNumber));
      })
      .start();
    animate();
  };

  return <div {...rest}>{innerValue}{isCpu ? 'G' : ''}</div>;
};

export default NumberTween;
