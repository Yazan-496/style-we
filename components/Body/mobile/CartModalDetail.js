import ProductDetails from "./ProductDetails";
import { Swiper, SwiperSlide } from "swiper/react";
import React, { useEffect } from "react";
import image from "../../../helpers/image";
import CountFlashSale from "../desktop/CountFlashSale";
import QTY from "../desktop/qty";

const CartModalDetail = ({
  product,
  onClose,
  loading,
  setShowedProduct,
  setShowedProductModal,
  showToast,
  addToCart,
  setSelectedSize,
  selectedSize,
  setIsSizeRequired,
  isSizeRequired,
  setQtyState,
  qtyState,
}) => {
  const swiperOptions = {
    navigation: false,
    slidesPerView: "auto",
    spaceBetween: 10,
  };
  return (
    <div className={`bg-white h-[100%] px-4 rounded-lg relative  `}>
      <button
        className={`sticky object-cover top-4 left-[90%] z-[1050] flex items-center justify-center bg-gray-500 rounded-full text-white`}
      >
        <img
          className="w-5 h-5"
          onClick={() => onClose(false)}
          src="/image/catalog/activity/quick-shop-close.jpg"
          alt={"image"}
        />
      </button>
      {/* {loading && <LoadingComponent />} */}
      {product ? (
        <div className="h-full">
          <Swiper
            className="h-[70%] flex items-center justify-center "
            {...swiperOptions}
          >
            {product?.images?.map((image, i) => {
              return (
                <SwiperSlide
                  key={i}
                  className="h-full flex items-center bg-white justify-center border rounded-[20%]"
                  style={{ width: "260px", display: "flex" }}
                >
                  <div className="h-full w-full">
                    <img
                      onClick={() => {
                        setShowedProductModal(true);
                        setShowedProduct(product);
                      }}
                      className="w-full h-full object-contain"
                      src={image}
                      alt={image}
                    />
                  </div>
                </SwiperSlide>
              );
            })}
            {product?.flash_deal_details && (
              <CountFlashSale Upper={true} pro={product} />
            )}
          </Swiper>
          <div className="w-full">
            <ProductDetails
              product={product}
              addToCart={(product) => addToCart(product)}
              setSelectedSize={(selectedSize) => setSelectedSize(selectedSize)}
              setIsSizeRequired={(isSizeRequired) =>
                setIsSizeRequired(isSizeRequired)
              }
              selectedSize={selectedSize}
              showToast={showToast}
            />
             <QTY
                product={product}
                selectedSize={selectedSize}
                qtyState={qtyState}
                isSizeRequired={isSizeRequired}
                setQtyState={(qtyState) => setQtyState(qtyState)}
              />
          </div>
        </div>
      ) : (
        <div className="h-[90vh] w-full"></div>
      )}
    </div>
  );
};
export default CartModalDetail;
