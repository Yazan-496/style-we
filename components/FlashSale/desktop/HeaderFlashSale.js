import { SvgFlash } from "components/svgs";
import { useTranslation } from "react-i18next";
import EndsIn from "../../Body/mobile/endsIn";
import React from "react";

const HeaderFlashSale = ({ products }) => {
  const { t, i18n } = useTranslation("translation");
  // console.log(products[0]?.flash_deal_details?.end_date);
  return (
    <header className="indexstyle-gqfl8m-0 yNmMB flex items-center justify-center flex-col lg:flex-row">
      <div className="pt-3">
        <SvgFlash />
      </div>
      <p className="flash-sale-title flex items-center ">
        {t("main.flash_sale")}
      </p>
      <div
        className=" countdown-wrap flex items-center pt-4 p-3 space-x-4"
        style={{ opacity: 1 }}
      >
        {products?.length > 0 && (
          <div className="flex justify-center items-center flex-col lg:flex-row ">
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
    </header>
  );
};
export default HeaderFlashSale;
