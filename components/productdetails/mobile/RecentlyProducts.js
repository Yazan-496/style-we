import { Swiper, SwiperSlide } from "swiper/react";
import Product from "../../Body/mobile/productItem";
import React, { useEffect, useState } from "react";

const RecentlyProduct = ({
  recentlyProduct,
  productId,
  title,
  setCloseCartModal,
  setOpenCartModal,
}) => {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    // console.log(recentlyProduct, "recentlyProduct");
  }, [recentlyProduct]);
  const swiperOptions = {
    slidesPerView: 2,
    spaceBetween: 10,
    navigation: true,
  };
  useEffect(() => {
    const updatedArray = recentlyProduct.filter(
      (product) => parseInt(product?.id) !== parseInt(productId)
    );
    setProducts(updatedArray);
  }, [recentlyProduct, productId]);
  return products?.length > 0 ? (
    <div className="">
      <div className="flex justify-center  items-center self-stretch flex-grow-0 flex-shrink-0 relative">
        <span className="font-[600] text-1xl text-center padding-8">
          {title}
        </span>
      </div>

      <Swiper className="flex justify-center items-center" {...swiperOptions}>
        {products?.map((product) => {
          if (product) {
            return (
              <SwiperSlide className="h-[110%] shadow-xl">
                <Product
                  product={product}
                  setProduct={(product) => console.log(product)}
                  flashSale={product?.flash_deal_details}
                  setOpenCartModal={() => setOpenCartModal(true)}
                  setCloseCartModal={() => setCloseCartModal(false)}
                />
              </SwiperSlide>
            );
          }
        })}
      </Swiper>
    </div>
  ) : null;
};
export default RecentlyProduct;
