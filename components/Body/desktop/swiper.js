import Link from "helpers/Link";
import { useEffect, useState } from "react";
import styled from "styled-components";
import Image from "next/legacy/image";
// import dynamic from "next/dynamic"
// const OwlCarousel = dynamic(import("react-owl-carousel"), {
//   ssr: false
// })

import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import ImageLoader from "helpers/Loader/ImageLoader";

const SwiperComponents = ({ loading, section }) => {
  const swiperOptions = {
    loop: true,
    slidesPerView: 1,
    spaceBetween: 40,
    navigation: true,
    pagination: { clickable: true },
    autoplay: { delay: 5000 },
    speed: 1500,
  };
  function handleGetUrl(item) {
    let updatedUrl = item.url.replace(/https?:\/\/www\.clearance\.ae\/?/g, "/");
    if (updatedUrl.includes("www.clearance.ae")) {
      updatedUrl = item.url.replace("www.clearance.ae", "/");
    }
    if (item.resource_type === "brand") {
      updatedUrl = `/products/brands=${item.resource_id}`;
    }
    if (item.resource_type === "flash_deals") {
      updatedUrl = `/all-flash-deals`;
    }
    if (item.resource_type === "product") {
      updatedUrl = `/product/${item.resource_slug}`;
    }
    if (item.resource_type === "search") {
      updatedUrl = `/products/search_text=${item.search_keyword}`;
    }
    if (item.resource_type === "category") {
      updatedUrl = `/products/category=${item.resource_slug}`;
    }
    return updatedUrl;
  }

  return (
    <>
      <Swiper
        style={{}}
        className="px-[35px] mt-[140px] mainSwiper swiper swiper-initialized swiper-horizontal swiper-pointer-events carousel-ad_swiper__hC5U4 swiper-backface-hidden"
        {...swiperOptions}
      >
        {section?.map((item, index) => {
          return (
            <SwiperSlide
              key={index}
              className="object-contain flex items-center justify-center swiper-transform swiper-wrapper"
            >
              <Link className="object-cover block min-h-[60vh] w-[100%] cursor-pointer" href={handleGetUrl(item)}>
                <Image
                  loader={ImageLoader}
                  className="object-cover"
                  alt=""
                  loading={"eager"}
                  layout="responsive"
                  width={110}
                  height={50}
                  src={item.desktop_photo || item.photo || ""}
                />
              </Link>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </>
  );
};

export default SwiperComponents;
