import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import HTMLRenderer from "helpers/HTMLRenderer";
import { PlusSvg } from "../../svgs";
import { useTranslation } from "react-i18next";

const ItemDetails = ({ product }) => {
  const [isOpen, setIsOpen] = useState({
    details: true,
    Shipping_Returns: false,
    Shipping_to: false,
  });
  const [shipping, setShipping] = useState(null);
  const [returnExchange, setReturnExchange] = useState(null);
  const syncInfo = useSelector((state) => state.AuthReducer.syncInfo);
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const info = JSON.parse(localStorage.getItem('CUSTOMER_INFO_STORAGE'));
      setShipping(info?.customerInfo?.shipping);
      setReturnExchange(info?.customerInfo?.return_and_exchange);
    }
  }, [syncInfo]);
  const toggleSection = (section) => {
    setIsOpen((prevState) => ({
      ...prevState,
      [section]: !prevState[section],
    }));
  };
  const { t, i18n } = useTranslation("translation");
  return (
    <div className=" flex items-center justify-end mt-4">
      <div className="self-stretch flex-grow-0 flex-shrink-0 h-px " />
      <div className="flex flex-col w-full">
        <div className="px-8  p-1 w-full">
          <div className="flex flex-col justify-center items-start self-stretch flex-grow-0 flex-shrink-0 py-3">
            <div className="flex justify-between items-center self-stretch flex-grow-0 flex-shrink-0 relative cursor-pointer">
              <h3 className="flex-grow-0 flex-shrink-0 cm-goods-detail-title-2">
                {t("user.product_details")}
              </h3>
              <div onClick={() => toggleSection("details")}>
                <PlusSvg />
              </div>
            </div>
          </div>

          {isOpen.details && <HTMLRenderer htmlContent={product?.details} />}
        </div>
        <div className="  px-8 p-1 w-full">
          <div className="flex flex-col justify-center items-start self-stretch flex-grow-0 flex-shrink-0 py-3">
            <div className="flex justify-between items-center self-stretch flex-grow-0 flex-shrink-0 relative cursor-pointer">
              <h3 className="flex-grow-0 flex-shrink-0 cm-goods-detail-title-2">
                {t("user.shipping_returns")}
              </h3>
              <div onClick={() => toggleSection("Shipping_Returns")}>
                <PlusSvg />
              </div>
            </div>
          </div>

          {isOpen.Shipping_Returns && (
            <HTMLRenderer htmlContent={returnExchange} />
          )}
        </div>
        <div className="px-8 p-1 w-full">
          <div className="flex flex-col justify-center items-start self-stretch flex-grow-0 flex-shrink-0 py-3">
            <div className="flex justify-between items-center self-stretch flex-grow-0 flex-shrink-0 relative cursor-pointer">
              <h3 className="flex-grow-0 flex-shrink-0 cm-goods-detail-title-2">
                {t("user.shipping_to")}
              </h3>
              <div onClick={() => toggleSection("Shipping_to")}>
                <PlusSvg />
              </div>
            </div>
          </div>

          {isOpen.Shipping_to && (
            <HTMLRenderer htmlContent={shipping} />
          )}
        </div>
      </div>
    </div>
  );
};
export default ItemDetails;
