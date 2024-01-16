import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";

const CountFlashSale = ({ pro, Upper, h }) => {
  const [product, setProduct] = useState(pro);
  const intervalRef = useRef(null);
  const currentDate = new Date();
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

    // const timer = setTimeout(() => {
    //   updateTimers();
    // }, 1000);
    return () => {
      clearInterval(intervalRef.current);
    };
  }, []);
  useEffect(() => {}, [pro?.flash_deal_details?.end_date]);
  const { t, i18n } = useTranslation("translation");
  return Upper ? (
    <div
      className={`z-10  items-center ProductTagstyle-sc-8t39ll-0 idnvmM items-center truncate ${
        h === 0 ? "" : "h-[40px]"
      } text-black opacity-[0.7]`}
    >
      <div className="contents justify-between truncate">
        {h === 0 ? (
          ""
        ) : (
          <div className="flex space-x-4 justify-start max-left font-[700]">
            {t("main.flash_sale")}
          </div>
        )}
        <div className="flex space-x-4 justify-end max-right font-[700]">
          Ends In: {product?.days}d : {product?.hours}h : {product?.minutes}m :
          {product?.seconds}s
        </div>
      </div>
    </div>
  ) : (
    <div className={` bg-black/50 relative bottom-0 ProductTagstyle-sc-8t39ll-0 idnvmM items-center truncate`}>
      <div className="flex justify-between truncate">
        <div className="flex space-x-4 justify-start max-left">
          <svg width="19" height="18" viewBox="0 0 19 18" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="9.20239" cy="9" r="9" fill="#F3C730"></circle><path d="M12.26 4H8.1184C8.03723 4 7.96411 4.04906 7.93333 4.12417L5.31541 10.5136C5.26149 10.6452 5.35827 10.7895 5.50047 10.7895H8.52995C8.665 10.7895 8.76123 10.9206 8.72076 11.0494L7.44466 15.1128C7.38012 15.3183 7.64145 15.4666 7.78478 15.3058L13.9055 8.43833C14.0204 8.30941 13.9289 8.10526 13.7562 8.10526H11.0721C10.9278 8.10526 10.831 7.95711 10.8889 7.82495L12.4431 4.28031C12.5011 4.14816 12.4043 4 12.26 4Z" fill="#222222"></path></svg>
        </div>
        <div className="flex space-x-4 justify-end max-right">
          {product?.days}D : {product?.hours} : {product?.minutes} :
          {product?.seconds}
        </div>
      </div>
    </div>
  );
};
export default CountFlashSale;
