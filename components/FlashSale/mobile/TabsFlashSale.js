import React, { useEffect, useState } from "react";
import EndsIn from "../../Body/mobile/endsIn";
import { useTranslation } from "react-i18next";

const TabsFlashSale = ({ products }) => {
  const [activeTab, setActiveTab] = useState(0);
  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      if (offset > 0) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  const handleActiveTab = (tabIndex) => {
    setActiveTab(tabIndex);
  };
  const { t, i18n } = useTranslation("translation");
  return (
    <div className="pt-[18px] count-down-wrapper count-down-wrapper-center">
      <div
        className={`transition-element ${
          isSticky ? "hiddenn" : ""
        } indexstyle-h52fat-0 fxAnhs`}
      >
        <div className="swiper-container swiper-activity-tab swiper-container-initialized swiper-container-horizontal">
          <div className="swiper-wrapper">
            <div
              onClick={() => handleActiveTab(0)}
              className="pl-6 swiper-slide-flash custom-active-slide swiper-slide-flash-active"
              style={{ marginRight: 5 }}
            >
              <li
                className={`${
                  activeTab
                    ? "multiple-count-down-mobile"
                    : "multiple-count-down-item-mobile"
                } active`}
              >
                <div className="multiple-count-down-title-mobile">
                  {t("main.flash_dales")}
                </div>
              </li>
            </div>
            {/*<div*/}
            {/*  onClick={() => handleActiveTab(1)}*/}
            {/*  className="swiper-slide-flash custom-active-slide swiper-slide-flash-active"*/}
            {/*  style={{ marginRight: 5 }}*/}
            {/*>*/}
            {/*  <li*/}
            {/*    className={`${*/}
            {/*      activeTab ? "multiple-count-down-item-mobile" : "multiple-count-down-mobile"*/}
            {/*    } active`}*/}
            {/*  >*/}
            {/*    <div className="multiple-count-down-title-mobile">FLASH DEALS</div>*/}
            {/*  </li>*/}
            {/*</div>*/}
          </div>
        </div>
      </div>
      <div
        className={`${
          isSticky ? "sticky-header-mobile-second" : "header-mobile-second"
        } flex items-center justify-center w-full`}
      >
        {products?.length > 0 && (
          <div className="flex gap-x-2  w-full justify-center items-center px-1 py-3">
            <div className="flash-sale-title flex items-center  text-xl font-[600]">
              {t("main.ends_in")}:
            </div>
            <EndsIn
              arrow={false}
              time={new Date(products[0]?.flash_deal_details?.end_date)}
            />
          </div>
        )}
      </div>
    </div>
  );
};
export default TabsFlashSale;
