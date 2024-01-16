"use client";
import React, { useEffect, useState } from 'react';
import Title from 'components/common/Title';
import FlashSaleCard from 'components/common/FlashSaleCard';
import CartModal from 'components/modal/CartModal';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';
import store from '../../../store';

const FlashSale = ({ flashSaleArr }) => {
    const [modals, setModals] = useState(false);
    const [modalData, setModalData] = useState();
    const [sitting, setSitting] = useState(null);
    useEffect(() => {
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
    return (
        <section className={`${sitting?.starting_sitting?.is_flash_deals ? "" : "hidden"} mx-auto container py-5`}>
            <Title />
            <div className='w-full md:px-4 lg:px-6 2xl:px-8 3xl:px-10 flex justify-center items-center pt-3 relative'>
                <div className='w-full flex flex-row justify-center items-center'>
                    <Swiper
                        spaceBetween={10}
                        loop={true}
                        slidesPerView='auto'
                        navigation={true}
                        autoplay={{
                            delay: 2500,
                            disableOnInteraction: true,
                        }}
                        modules={[Autoplay, Navigation]}
                        className='flashSlider'
                    >
                        {flashSaleArr.map((item) => (
                            <SwiperSlide key={item.id}>
                                <FlashSaleCard
                                    img={item.thumbnail}
                                    text={item.name}
                                    salePrice={item.offer_price}
                                    price={item.price}
                                    discount={item.discount}
                                    url={item.slug}
                                    imgVariantSmall={true}
                                    actionCb={() => {
                                        setModalData(item);
                                        setModals(!modals);
                                    }}
                                    groupClass='w-40 md:w-52 lg:w-60 3xl:w-[260px] p-2'
                                />
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            </div>
            <CartModal
                closeStateCb={() => {
                    setModals(false);
                }}
                viewState={modals}
                data={modalData}
            />
        </section>
    );
};

export default FlashSale;
