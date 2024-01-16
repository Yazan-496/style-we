"use client";

import Image from "next/legacy/image";
import EndsIn from "./endsIn";
import React, { useEffect, useRef, useState } from "react";
import Link from "helpers/Link";
import { useSelector } from "react-redux";
import { store } from "store";
import { Swiper, SwiperSlide } from "swiper/react";
import Product from "./productItem";
import { useTranslation } from "react-i18next";

const Sale = ({ section }) => {
  let loading = useSelector((store) => store.LanguageReducer.loading);
  const lang_code = store.getState().LanguageReducer.langCode;
  let [translations, setTranslations] = useState(
    store.getState().LanguageReducer.data[lang_code]
  );
  const [date, setDate] = useState(null);
  useEffect(() => {
    setTranslations(store.getState().LanguageReducer.data[lang_code]);
  }, [loading]);

  const swiperOptions = {
    navigation: true,
    slidesPerView: 6,
    spaceBetween: 20,
  };

  const checkIfEnded = (end_date) => {
    const currentDate = new Date();
    const endDate = new Date(end_date);
    return currentDate < endDate;
  };
  const getLastDate = (section) => {
    const currentDate = new Date();
    const filteredDeals = section.filter((deal) => {
      const endDate = new Date(deal.flash_deal_details?.end_date);
      return endDate >= currentDate;
    });
    // Sort the filtered deals by end_date in ascending order
    filteredDeals.sort((a, b) => {
      const endDateA = new Date(a?.flash_deal_details?.end_date);
      const endDateB = new Date(b?.flash_deal_details?.end_date);
      return endDateA - endDateB;
    });
    // Get the closest end_date (not less than today)
    const closestEndDate = filteredDeals[0]?.flash_deal_details?.end_date;
    return new Date(closestEndDate);
  };
  const { t, i18n } = useTranslation("translation");
  return (
    <div className="">
      <div data-id="570">
        <Link href="/all-flash-deals">
            <div className="header flex justify-between items-center pt-[40px] pb-[16px] px-[40px] cursor-pointer flash-sale-ad_titleBgWrap__1EcSI fdghdufgh">
              <h4 className="font-bold text-[28px] leading-8 asdewqeq">
                {t("main.flash_sale")}
              </h4>

              {/*{date && (*/}
              <EndsIn translations={translations} time={getLastDate(section)} />
              {/*)}*/}
            </div>
        </Link>
        <div
          className="flash-sale-ad_productsWrap__eelrn pb-[28px]"
          data-id="570"
        >
          <div className="relative px-[40px] pt-[12px] style_productSwiper__G7kVx">
            <Swiper
              className="flashSwipper swiper5 swiper-initialized swiper-horizontal swiper-pointer-events w-full"
              {...swiperOptions}
            >
              {section?.map((product, index) => {
                return (
                  checkIfEnded(product?.flash_deal_details?.end_date) && (
                    <SwiperSlide
                      key={index}
                      className="swiper-slide cursor-pointer"
                      style={{
                        border: "0.5px solid #e1d2d2",
                        borderRadius: "8%",
                        width: "113.333px",
                        marginRight: 24,
                      }}
                    >
                      <Product product={product} flashSale={true} />
                    </SwiperSlide>
                  )
                );
              })}
            </Swiper>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sale;
