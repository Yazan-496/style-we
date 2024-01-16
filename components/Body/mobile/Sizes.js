import { useEffect } from "react";
import { useTranslation } from "react-i18next";

const Sizes = ({
  product,
  setSelectedSize,
  selectedSize,
  setIsSizeRequired,
  showToast,
}) => {
  const handleSizeSelect = (size) => {
    if (size) {
      setSelectedSize(size);
    }
  };
  useEffect(() => {
    product?.variation?.length > 0 &&
      setIsSizeRequired(product?.variation?.length > 0);
  }, [product]);
  useEffect(() => {
    setIsSizeRequired(product?.variation?.length > 0)
  }, [product]);
  useEffect(() => {
    // console.log(showToast, "showToast");
  }, [showToast]);

  const { t, i18n } = useTranslation("translation");
  return (
    <div
      id="components-product-options-quick-shop"
      className={`${
        showToast?.show ? "bg-red-200" : ""
      }  components-product-options`}
    >
      {product?.variation?.length > 0 && (
        <div className="components-product-options__wrap" id="option-mark-size">
          <div className="components-product-options__label">
            {t("user.sizes")} :
          </div>
          <div
            id="components-product-options__size-wrap"
            className="components-product-options__content swiper-container notranslate"
          >
            <div className="swiper-wrapper">
              {product?.variation?.map((size, i) => {
                return (
                  size?.qty > 0 && (
                    <div
                      key={i}
                      onClick={() => handleSizeSelect(size)}
                      className={` cursor-pointer
                      components-product-options__square-item swiper-slide ${
                          selectedSize?.type === size?.type
                          ? " bg-[#31353C] text-white "
                          : " text-gray-600"
                      } 
                    `}
                      style={{ padding: "0px 7px" }}
                    >
                      {size?.type}({size?.qty})
                    </div>
                  )
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default Sizes;
