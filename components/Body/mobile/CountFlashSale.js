import { useEffect, useRef, useState } from "react";

const CountFlashSale = ({ pro }) => {
  const [product, setProduct] = useState(pro);
  const intervalRef = useRef(null);
  useEffect(() => {
    const updateTimers = () => {
      const currentDate = new Date();

      const date = new Date(pro?.flash_deal_details?.end_date);
      const remainingTime = date.getTime() - currentDate.getTime();

      if (remainingTime > 0) {
        const remainingSeconds = Math.floor(remainingTime / 1000);
        const remainingMinutes = Math.floor(remainingSeconds / 60);
        const remainingHours = Math.floor(remainingMinutes / 60);
        const remainingDays = Math.floor(remainingHours / 24);

        setProduct({
          days: remainingDays > 9 ? remainingDays : "0" + remainingDays,
          hours:
            remainingHours % 24 > 9
              ? remainingHours % 24
              : "0" + (remainingHours % 24),
          minutes:
            remainingMinutes % 60 > 9
              ? remainingMinutes % 60
              : "0" + (remainingMinutes % 60),
          seconds:
            remainingSeconds % 60 > 9
              ? remainingSeconds % 60
              : "0" + (remainingSeconds % 60),
        });
      } else {
      }
    };

    intervalRef.current = setInterval(updateTimers, 1000);
    return () => {
      clearInterval(intervalRef.current);
    };
  }, []);
  return (
    <div
      className={`relative w-full bottom-0 flex items-center justify-center flash-sale-countdown_small`}
    >
      <span className="day box">
        <i className="val text-xs">{product?.days}</i>
        {/*<i className="unit">h</i>*/}
      </span>
      <span className="semii">:</span>
      <span className="day box">
        <i className="val text-xs">{product?.hours}</i>
        {/*<i className="unit">h</i>*/}
      </span>
      <span className="semii">:</span>
      <span className="day box">
        <i className="val text-xs">{product?.minutes}</i>
        {/*<i className="unit">m</i>*/}
      </span>
      <span className="semii">:</span>
      <span className="day box">
        <i className="val text-xs">{product?.seconds}</i>
        {/*<i className="unit">s</i>*/}
      </span>
    </div>
  );
};
export default CountFlashSale;
