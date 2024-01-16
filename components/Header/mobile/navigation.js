"use client";
import React, { useEffect, useState } from "react";
import Link from "helpers/Link";
import NavElement from "./navElement";
import dynamic from "next/dynamic";
import { LoaderCategory } from "helpers/Loader/Loading";

const OwlCarousel = dynamic(import("react-owl-carousel"), {
  ssr: false,
});
const Navigation = ({ loading, categories }) => {
  const [load, setLoad] = useState([1, 1, 1, 1, 1, 1, 1]);
  return (
    <>
      <div className="cm-layout-max-mobile mx-auto flex justify-center items-center gap-2">
        <div
          id="slider-container"
          className="horizontal-nav-wrapper swiper-container swiper-container-initialized swiper-container-horizontal swiper-container-free-mode"
        >
          {loading ? (
            <div className="pt-[10px] flex flex-row space-x-4">
              {load.map((one, i) => {
                return (
                  <div key={i}>
                    <LoaderCategory
                      width={"100%"}
                      height={30}
                      viewBox={"0 0 100% 810"}
                    />
                  </div>
                );
              })}
            </div>
          ) : (
            <OwlCarousel
              autoWidth={true}
              items={4}
              margin={10}
              dots={false}
              nav={false}
              navElement="div"
              className="w-max min-w-full flex justify-center items-center"
            >
              {categories?.map((category, index) => (
                <div
                  key={index}
                  id={`category-num-${index}`}
                  className="horizontal-nav swiper-wrapper"
                >
                  <Link
                    key={index}
                    href={`/products/category=${category?.slug}`}
                  >
                    <li
                      className={`horizontal-nav-item active swiper-slide ${
                        category?.category === "HOME"
                          ? "swiper-slide-active"
                          : ""
                      }`}
                    >
                      <a
                        style={{
                          fontFamily: "Helvetica",
                          fontWeight: "600",
                          fontSize: "17px",
                        }}
                        className={`whitespace-nowrap group-hover:text-[color:var(--cm-color-hover-link)] ${
                          category?.isRed ? "text-red-600" : "text-black-600"
                        } `}
                      >
                        {category?.category}{" "}
                        <span className="truncate text-sm relative left-0">
                          ({category?.num_available_product})
                        </span>
                      </a>
                    </li>
                  </Link>
                </div>
              ))}
            </OwlCarousel>
          )}
        </div>
      </div>
      <div>
        {categories?.map((category, index) => {
          if (category.sub_categories && category.sub_categories.length > 0) {
            return (
              <NavElement
                category={category}
                parentCategory={category.category}
                index={index}
                key={`${index}-sub`}
              />
            );
          }
        })}
      </div>
    </>
  );
};

export default Navigation;
