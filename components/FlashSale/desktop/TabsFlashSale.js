import { useState } from "react";

const TabsFlashSale = () => {
  const [activeTab, setActiveTab] = useState(0);
  const handleActiveTab = (tabIndex) => {
    setActiveTab(tabIndex);
  };
  return (
    <div className="z-5 count-down-wrapper count-down-wrapper-center">
      <div className="indexstyle-h52fat-0 fxAnhs">
        <div className="swiper-container swiper-activity-tab swiper-container-initialized swiper-container-horizontal">
          <div className="swiper-wrapper">
            <div
              onClick={() => handleActiveTab(0)}
              className="swiper-slide-flash custom-active-slide swiper-slide-flash-active"
              style={{ marginRight: 5 }}
            >
              <li
                className={`${
                  activeTab ? "multiple-count-down" : "multiple-count-down-item"
                } active`}
              >
                <div className="multiple-count-down-title">FLASH DEALS</div>
                <div className="multiple-count-down-timer">
                  Ends In&nbsp;5D:05H:24M:26S
                </div>
              </li>
            </div>
            <div
              onClick={() => handleActiveTab(1)}
              className="swiper-slide-flash custom-active-slide swiper-slide-flash-active"
              style={{ marginRight: 5 }}
            >
              <li
                className={`${
                  activeTab ? "multiple-count-down-item" : "multiple-count-down"
                } active`}
              >
                <div className="multiple-count-down-title">FLASH DEALS</div>
                <div className="multiple-count-down-timer">
                  Ends In&nbsp;5D:05H:24M:26S
                </div>
              </li>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default TabsFlashSale;
