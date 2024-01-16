import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { store } from "store";
import { Swiper, SwiperSlide } from "swiper/react";
import Product from "./productItem";
import Link from "../../../helpers/Link";
import { useTranslation } from "react-i18next";
const MainCategories = ({ section }) => {
  let loading = useSelector((store) => store.LanguageReducer.loading);
  const lang_code = store.getState().LanguageReducer.langCode;
  let [translations, setTranslations] = useState(
    store.getState().LanguageReducer.data[lang_code]
  );
  useEffect(() => {
    setTranslations(store.getState().LanguageReducer.data[lang_code]);
  }, [loading]);
  const swiperOptions = {
    slidesPerView: 5,
    spaceBetween: 10,
    navigation: true,
  };
  const { t, i18n } = useTranslation("translation");
  return (
    <>
      {section.map((oneCategory, index) => {
        return (
          <div
            key={index}
            className="px-[20px] mx-auto w-full flex flex-col"
            data-id="534"
          >
            <div className="flex justify-between items-center">
              <p />
              <p
                style={{ paddingTop: "20px" }}
                className="flex-grow-0 flex-shrink-0 text-2xl leading-[1.5] font-bold text-center text-[#31353c]"
              >
                {oneCategory.category}
              </p>
              <Link href={`/products/category=${oneCategory.slug}`}>
                <p
                  style={{ paddingTop: "20px" }}
                  className="flex items-center justify-center cursor-pointer flex-grow-0 flex-shrink-0 text-2xl leading-[1.5] font-[600] text-center text-[#31353c]"
                >
                  {t("main.view_more")}
                  <svg
                    stroke="#31353C"
                    viewBox="0 0 32 32"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    className="scale-x-[-1] ml-3"
                  >
                    <path d="m20 8-8 8 8 8" strokeWidth="2"></path>
                  </svg>
                </p>
              </Link>
            </div>
            <div className="flashSwipper swiper2 swiper-initialized swiper-horizontal swiper-pointer-events w-full">
              <Swiper {...swiperOptions}>
                {oneCategory?.products.map((product, index) => (
                  <SwiperSlide
                    style={{
                      border: "0.5px solid #e1d2d2",
                      borderRadius: "8%",
                    }}
                    key={index}
                  >
                    <Product product={product} flashSale={false} />
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </div>
        );
      })}
    </>
  );
};

export default MainCategories;
