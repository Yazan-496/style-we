import React, { useState } from "react";
import { RefreshSvg } from '../../../svgs';

const Coupons = ({refresh, setRefresh}) => {
  const [activeTab, setActiveTab] = useState("Unused");

  const handleActiveTab = (tab) => {
    setActiveTab(tab);
  };
  return (
    <>
      <h3 className="flex gap-x-10 text-[rgb(49,53,60)] text-2xl font-semibold leading-[29px] mb-6 pb-4 border-b-2 border-b-[rgb(93,98,106)] border-solid">
        <span>My Coupons</span>
        <div className='flex-1' onClick={() => {
          setRefresh(!refresh)
        }}>
          <RefreshSvg />
        </div>
      </h3>
      <div className="layout-container">
        <div className="indexstyle-hvg5dr-0 iVNrrO">
          <ul className=" flex mb-5">
            <li
              onClick={() => handleActiveTab("Unused")}
              className={`${
                activeTab === "Unused"
                  ? "bg-[rgb(51,51,51)] border text-white border-solid border-[rgb(51,51,51)] cursor-pointer text-sm leading-[50px] text-center w-[182px]"
                  : "border text-[rgb(51,51,51)] cursor-pointer text-sm leading-[50px] text-center w-[182px] border-solid border-[rgb(204,204,204)]"
              } `}
            >
              Unused
            </li>
            <li
              onClick={() => handleActiveTab("Used")}
              className={`${
                activeTab === "Used"
                  ? "bg-[rgb(51,51,51)] border text-white border-solid border-[rgb(51,51,51)] cursor-pointer text-sm leading-[50px] text-center w-[182px]"
                  : "border text-[rgb(51,51,51)] cursor-pointer text-sm leading-[50px] text-center w-[182px] border-solid border-[rgb(204,204,204)]"
              } `}
            >
              Used
            </li>
            <li
              onClick={() => handleActiveTab("expired")}
              className={`${
                activeTab === "expired"
                  ? "bg-[rgb(51,51,51)] border text-white border-solid border-[rgb(51,51,51)] cursor-pointer text-sm leading-[50px] text-center w-[182px]"
                  : "border text-[rgb(51,51,51)] cursor-pointer text-sm leading-[50px] text-center w-[182px] border-solid border-[rgb(204,204,204)]"
              } `}
            >
              Expired
            </li>
          </ul>
          <div className=" px-0 py-[60px]">
            <img
              alt=""
              className="w-full h-full mb-[15px] border-none"
              src="/image/catalog/activity/no-coupon.png"
            />
          </div>
        </div>
      </div>
    </>
  );
};
export default Coupons;
