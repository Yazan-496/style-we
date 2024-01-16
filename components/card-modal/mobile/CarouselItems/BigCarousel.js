import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import CountFlashSale from '../../../Body/desktop/CountFlashSale';
import { Swiper, SwiperSlide } from 'swiper/react';

const OwlCarousel = dynamic(import('react-owl-carousel'), {
    ssr: false,
});

const navComponent = [
    '<div class="z-[1] flex items-center justify-center absolute right-0 cursor-pointer image-swiper_big-swiper__next__ilSFE w-[48px] h-[100px]"><svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M13.5 27L22.5 18L13.5 9" stroke="white" stroke-width="2.25"></path></svg></div>',
    '<div class="z-[2] flex items-center justify-center absolute left-0 cursor-pointer image-swiper_big-swiper__prev__E3NV8 w-[48px] h-[100px]"><svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M22.5 9L13.5 18L22.5 27" stroke="white" stroke-width="2.25"></path></svg></div>',
];
const swiperOptions = {
    slidesPerView: 1,
    Navigation: true,
    Pagination: true,
    spaceBetween: 40,
};
const BigCarousel = ({ products }) => {
    useEffect(() => {
        // console.log(products, "product-details");
    }, [products]);
    return (
        <>
            <div className="h-full flex-grow-0 flex-shrink-0  relative overflow-hidden bg-white image-swiper_big-swiper__RGlVl w-full">
                <Swiper {...swiperOptions}>
                    {products?.images?.map((photo, i) => {
                        return (
                            <SwiperSlide className="h-full  w-full p-4  rounded-[10%] bg-white">
                                <img
                                    key={i}
                                    className=" w-full h-[500px] bg-white object-contain"
                                    alt={photo || 'null'}
                                    src={photo || null}
                                />
                            </SwiperSlide>
                        );
                    })}
                </Swiper>
                {/*<div className="pb-50 h-[50px]">*/}
                {products?.flash_deal_details && (
                    <CountFlashSale Upper={true} pro={products} />
                )}
                {/*</div>*/}
            </div>
        </>
    );
};
export default BigCarousel;
