import Link from "helpers/Link";
import { useEffect } from "react";
import styled from "styled-components";
// import dynamic from "next/dynamic"
// const OwlCarousel = dynamic(import("react-owl-carousel"), {
//   ssr: false
// })

import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { BannerLogo } from "helpers/Loader/Loading";

const SwiperComponents = ({ loading, section }) => {
  const swiperOptions = {
    loop: true,
    slidesPerView: 1,
    spaceBetween: 20,
    navigation: true,
    pagination: { clickable: true },
    autoplay: { delay: 3000 },
    speed: 1500,
  };
  useEffect(() => {}, []);
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
    <div className="px-2 aspect-[2/1]">
      {loading ? (
        <>
          <div
            className="flex flex-row"
            style={{
              height: "40vh",
              width: "100%",
              padding: "0px",
            }}
          >
            <BannerLogo
              width={"100%"}
              height={"40vh"}
              viewBox={"0 0 70% 210"}
            />
          </div>
        </>
      ) : (
        <Swiper
          style={{
            padding: "0px",
          }}
          className="mainSwiper swiper swiper-initialized swiper-horizontal swiper-pointer-events carousel-ad_swiper__hC5U4 swiper-backface-hidden"
          {...swiperOptions}
        >
          {section?.map((item, index) => {
            return (
              <SwiperSlide
                key={index}
                className=" swiper-transform swiper-wrapper"
              >
                <Link className="object-cover h-full w-full h-auto cursor-pointer" href={handleGetUrl(item)}>
                  <ImageFull
                    className=""
                    alt=""
                    src={item.photo || ""}
                    decoding="async"
                    data-nimg="fill"
                  />
                </Link>
              </SwiperSlide>
            );
          })}
        </Swiper>
      )}
    </div>
  );
};

export default SwiperComponents;

const ImageFull = styled.img`
  height: 100%;
`;

const SpanFull = styled.span`
  box-sizing: border-box;
  display: block;
  overflow: hidden;
  width: 100%;
  background: none;
  opacity: 1;
  border: 0;
  margin: 0;
  padding: 0;
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
`;
