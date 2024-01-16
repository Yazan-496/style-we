import React, { useEffect, useState } from "react";
import HTMLRenderer from "helpers/HTMLRenderer";
import { PlusSvg, SvgLoader } from "../../svgs";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import store from '../../../store';
import { TransClient } from "helpers/TransClient";

const ItemDetails = ({ product }) => {
  const [isOpen, setIsOpen] = useState({
    details: true,
    return_and_exchange: false,
    shipping: false,
  });
  const [sitting, setSitting] = useState(null);
  useEffect(() => {
    // Start Add Product To RECENTLY_PRODUCTS
    const recentlyViewedProducts = JSON.parse(sessionStorage.getItem('RECENTLY_PRODUCT')) || [];
    const isProductInRecentlyViewed = recentlyViewedProducts.some(item => item.id === product.id);

    if (!isProductInRecentlyViewed) {
      const updatedProducts = [...recentlyViewedProducts, product];
      sessionStorage.setItem('RECENTLY_PRODUCT', JSON.stringify(updatedProducts));
    }
    // End Add Product To RECENTLY_PRODUCTS
    let sit = JSON.parse(sessionStorage.getItem("SITTING"));
    if (sitting) {
      setSitting(sit)
    } else {
      sit = JSON.parse(sessionStorage.getItem("SITTING"));
      setSitting(sit)
    }
    const unsubscribe = store.subscribe(() => {
      const updatedSitting = JSON.parse(sessionStorage.getItem("SITTING"));
      if (updatedSitting) {
        setSitting(updatedSitting)
      }
    });
    return () => {
      unsubscribe();
    };
  }, []);
  const toggleSection = (section) => {
    setIsOpen((prevState) => ({
      ...prevState,
      [section]: !prevState[section],
    }));
    let sit = JSON.parse(sessionStorage.getItem("SITTING"));
    if (sitting) {
      setSitting(sit)
    } else {
      sit = JSON.parse(sessionStorage.getItem("SITTING"));
      setSitting(sit)
    }
    const unsubscribe = store.subscribe(() => {
      const updatedSitting = JSON.parse(sessionStorage.getItem("SITTING"));
      if (updatedSitting) {
        setSitting(updatedSitting)
      }
    });
    return () => {
      unsubscribe();
    };
  };
  const { t, i18n } = useTranslation("translation");
  return (
    <div className=" flex items-center w-full justify-center mt-4">
      <div className=" h-px bg-[#e0e1e3] " />
      <div className="flex flex-col w-full">
        <div className="border-t-[3px] w-full ">
          <div className="flex flex-col justify-center items-start self-stretch flex-grow-0 flex-shrink-0 py-3">
            <div dir={TransClient("user.dir")} className="flex justify-between items-center self-stretch flex-grow-0 flex-shrink-0 relative cursor-pointer">
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
        <div className="border-t-[3px] w-full ">
          <div className="flex flex-col justify-center items-start self-stretch flex-grow-0 flex-shrink-0 py-3">
            <div dir={TransClient("user.dir")} className="flex justify-between items-center self-stretch flex-grow-0 flex-shrink-0 relative cursor-pointer">
              <h3 className="flex-grow-0 flex-shrink-0 cm-goods-detail-title-2">
                {t("user.return_and_exchange")}
              </h3>
              <div onClick={() => toggleSection("return_and_exchange")}>
                <PlusSvg />
              </div>
            </div>
          </div>

          {isOpen.return_and_exchange && (
            <HTMLRenderer htmlContent={sitting?.sitting?.return_and_exchange}/>
          )}
        </div>
        <div className="border-t-[3px] w-full ">
          <div className="flex flex-col justify-center items-start self-stretch flex-grow-0 flex-shrink-0 py-3">
            <div dir={TransClient("user.dir")} className="flex justify-between items-center self-stretch flex-grow-0 flex-shrink-0 relative cursor-pointer">
              <h3 className="flex-grow-0 flex-shrink-0 cm-goods-detail-title-2">
                {t("user.shipping")}
              </h3>
              <div onClick={() => toggleSection("shipping")}>
                <PlusSvg />
              </div>
            </div>
          </div>

          {isOpen.shipping && (
            <HTMLRenderer htmlContent={sitting?.sitting?.shipping} />
          )}
        </div>
      </div>

      <div className=" h-px bg-[#e0e1e3] " />
    </div>
  );
};
export default ItemDetails;
