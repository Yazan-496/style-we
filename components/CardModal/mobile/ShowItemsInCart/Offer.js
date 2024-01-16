import React from "react";
import { useTranslation } from "react-i18next";

const Offer = ({ items, priceForFree }) => {
  const { t, i18n } = useTranslation("translation");
  return items?.show_message_reset_for_shipping_free && (
    <div className="flex justify-between items-center flex-grow-0 flex-shrink-0 w-full bg-white px-4 py-3">
      <div className="flex justify-start items-center text-center">
        <p className="green space-x-4 flex items-center justify-center">
          <i className="text-green-700 leading-[24px] text-2xl iconfont icon-icon_shipped icon-cart" />
          {items?.rest_for_free_shipping > 0 ? (
            <span className="text-sm">
              {t("header.buy")}
              <span className="text-sm font-bold notranslate px-1">
                {items?.rest_for_free_shipping || 150}{" "}
                {t("header.language.aed")}
              </span>
              {t("header.more_to")} {t("header.enjoy")}
              <span className="text-sm font-bold">
                {t("header.free_shipping")}
              </span>
              !
            </span>
          ) : (
            <span className="text-sm">
              <span className="text-sm font-bold">
                {t("header.enjoy")} {t("header.free_shipping")}
              </span>
              !
            </span>
          )}
        </p>
      </div>
    </div>
  );
};
export default Offer;
