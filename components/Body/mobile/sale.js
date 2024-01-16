"use client";

import EndsIn from "./endsIn";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { store } from "store";
import { Swiper, SwiperSlide } from "swiper/react";
import Product from "./productItem";
import { useTranslation } from "react-i18next";

const Sale = ({ section, setProduct, setOpenCartModal, setCloseCartModal }) => {
  const swiperOptions = {
    navigation: true,
    slidesPerView: "auto",
    spaceBetween: 10,
  };
  let loading = useSelector((store) => store.LanguageReducer.loading);
  const lang_code = store.getState().LanguageReducer.langCode;
  let [translations, setTranslations] = useState(
    store.getState().LanguageReducer.data[lang_code]
  );
  useEffect(() => {
    setTranslations(store.getState().LanguageReducer.data[lang_code]);
  }, [loading]);

  useEffect(() => {
    const style = document.createElement("style");
    style.innerText = `
      .swiper-button-next:after {
        background-color: transparent;
        color: #585555;
        font-weight: bold;
        width: 15px;
        height: 15px;
      }
      .swiper-button-prev:after {
        background-color: transparent;
        color: #585555;
        font-weight: bold;
        width: 15px;
        height: 15px;
      }
    `;
    document.head.appendChild(style);

    return () => {
      document.head.removeChild(style);
    };
  }, []);
  const { t, i18n } = useTranslation("translation");

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
      const endDateA = new Date(a.flash_deal_details?.end_date);
      const endDateB = new Date(b.flash_deal_details?.end_date);
      return endDateA - endDateB;
    });
    // Get the closest end_date (not less than today)
    const closestEndDate = filteredDeals[0]?.flash_deal_details?.end_date;
    return new Date(closestEndDate);
  };

  return (
    <>
      <div className=" home-flash-sale">
        <a
          className="header
    with-countdown
  "
          style={{ backgroundColor: "#ffffff" }}
          href="/all-flash-deals"
        >
          <div className="content">
            <p className="title" style={{ color: "#000000" }}>
              {t("main.flash_sale")}
            </p>
            <div className="countdown-wrap" style={{ opacity: 1 }}>
              <EndsIn
                translations={translations}
                arrow={true}
                time={getLastDate(section)}
              />
            </div>
          </div>
        </a>

        <div className="product-list" data-id="570">
          <div className="relative pt-[12px] style_productSwiper__G7kVx">
            <Swiper
              className="flashSwipper swiper5 swiper-initialized swiper-horizontal swiper-pointer-events w-full"
              {...swiperOptions}
            >
              {section?.map((product, index) => {
                return (
                  checkIfEnded(product?.flash_deal_details?.end_date) && (
                    <SwiperSlide
                      key={index}
                      className="swiper-container swiper-container-initialized swiper-container-horizontal"
                      style={{
                        border: "0.5px solid #e1d2d2",
                        borderRadius: "8%",
                        width: "180.333px",
                        marginRight: 0,
                      }}
                    >
                      <Product
                        product={product}
                        flashSale={true}
                        setOpenCartModal={() => setOpenCartModal(true)}
                        setCloseCartModal={() => setCloseCartModal(false)}
                        setProduct={(product) => setProduct(product)}
                      />
                    </SwiperSlide>
                  )
                );
              })}
            </Swiper>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sale;
