import { Swiper, SwiperSlide } from "swiper/react";
import Product from "../../Body/desktop/productItem";
import React, {createRef, useEffect, useRef, useState} from "react";
import NewProduct from "../../common/NewProduct";
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';
import Slider from "react-slick";

const RecentlyProduct = ({ recentlyProduct, productId, title }) => {
  const swiperRef = useRef(null);
  const [products, setProducts] = useState([]);
  useEffect(() => {
    // console.log(products, "products");
    // console.log(recentlyProduct, "recentlyProduct");
  }, [recentlyProduct, products]);
  const swiperOptions = {
    slidesPerView: 2,
    spaceBetween: 10,
    navigation: true,
    pagination: { clickable: true },
    breakpoints: {
      640: {
        slidesPerView: 2,
      },
      641: {
        slidesPerView: 4,
      }
    }
  };

  useEffect(() => {
    const updatedArray = recentlyProduct.filter(
      (product) => product?.id !== productId
    );
    // console.log(updatedArray);
    setProducts(updatedArray);
  }, [recentlyProduct, productId]);


  return products?.length > 0 ? (
    <div className="">
      <div className="flex justify-center  items-center self-stretch flex-grow-0 flex-shrink-0 relative">
        <span className="font-[600] text-1xl text-center padding-8">
          {title}
        </span>
      </div>

      <Swiper 
        {...swiperOptions}
        ref={swiperRef}
        modules={[Navigation, Scrollbar, A11y]}
        className="flex justify-center items-center"
      >
        {products?.map((product, index) => {
          if (product) {
            return (
              <SwiperSlide key={index} className="h-[110%]">
                <div className='p-1'>
                  <NewProduct
                      product={product}
                      imgClass='!h-52 sm:!h-[278px] md:!h-80 lg:!h-[400px] xl:!h-[480px] 2xl:!h-[570px]'
                      flashSale={product?.flash_deal_details}
                  />
                </div>
              </SwiperSlide>
            );
          }
          return null;
        })}
      </Swiper>
    </div>
  ) : null;
};
export default RecentlyProduct;
