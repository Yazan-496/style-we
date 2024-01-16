import HeaderFlashSale from "./HeaderFlashSale";
import TabsFlashSale from "./TabsFlashSale";
import Product from "../../Body/desktop/productItem";
import React, { useCallback, useEffect, useRef } from "react";
import LoadingComponent from "../../LoadingComponent/desktop";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import LoadingComponentDesktop from "../../LoadingComponent/desktop";

const ProductsListFlashSale = ({ products }) => {
  const dispatch = useDispatch();
  const flashSaleProducts = useSelector(
    (state) => state?.FlashSaleReducer?.flashSaleProducts
  );
  const flashSaleLoading = useSelector(
    (state) => state?.FlashSaleReducer?.flashSaleLoading
  );
  const totalFlashSale = useSelector(
    (state) => state?.FlashSaleReducer?.totalFlashSale
  );
  const viewMoreButtonRef = useRef(null);

  const handleIncreaseOffset = () => {
    if (!flashSaleLoading) {
      // console.log(flashSaleProducts?.length, "flashSaleProducts");
      // console.log(totalFlashSale, "totalFlashSale");
      dispatch({ type: "INCREASE_OFFSET_FLASH_SALE_REDUCER" });
    }
  };
  useEffect(() => {
    window.addEventListener("scroll", function () {
      const buttonElement = viewMoreButtonRef.current;

      if (buttonElement) {
        const buttonRect = buttonElement?.getBoundingClientRect();
        const isButtonVisible = buttonRect.top < window.innerHeight;

        if (isButtonVisible && flashSaleProducts?.length < totalFlashSale) {
          handleIncreaseOffset();
        }
      }
    });
  }, [flashSaleLoading, flashSaleProducts?.length]);
  const { t, i18n } = useTranslation("translation");
  return (
    <>
      {flashSaleLoading && flashSaleProducts?.length === 0 ? (
        <div className="flex items-center justify-center w-full h-[820px]">
          {/* <LoadingComponent /> */}
          ""
        </div>
      ) : !flashSaleLoading && flashSaleProducts?.length === 0 ? (
        <span className="w-full items-center-center justify-center">
          {t("main.no_flash_sale_found")}
        </span>
      ) : (
        <div className="product-list flex flex-wrap">
          {flashSaleProducts?.length > 0 && (
            <>
              {flashSaleProducts?.map((product, index) => {
                return (
                  <div className="p-3 w-[calc(50%)] lg:w-[calc(20%)] h-fit lg:h-[calc(50%-10px)]">
                    <Product
                      key={index}
                      product={product}
                      flashSale={product?.flash_deal_details}
                    />
                  </div>
                );
              })}
              {flashSaleProducts?.length > 0 && flashSaleLoading ? (
                <div
                  className={`${
                    flashSaleLoading ? "" : "hidden"
                  } flex items-center justify-center w-full h-[120px]`}
                >
                  <LoadingComponentDesktop />
                  ""
                </div>
              ) : (
                <div
                  className={`${
                    totalFlashSale < flashSaleProducts?.length ? "hidden" : ""
                  } flex  flex-col items-stretch gap-5 mb-5 w-full items-center justify-center`}
                >
                  <div
                    style={{
                      alignSelf: "center",
                    }}
                    className="p-1 w-[30%] h-[50%] flex items-center justify-center rounded-3xl style_paginationWrapper__YMATm"
                  >
                    <span
                      ref={viewMoreButtonRef}
                      className="hover:underline  cursor-pointer"
                      onClick={handleIncreaseOffset}
                    >
                      {t("main.view_more")}
                    </span>
                  </div>
                </div>
              )}
              <div className="w-full flex items-center justify-center p-5 text-center text-base text-[#868C93]">
                {flashSaleProducts?.length} {t("user.of")} {totalFlashSale}{" "}
                {t("user.products")}
              </div>
            </>
          )}
        </div>
      )}
    </>
  );
};
export default ProductsListFlashSale;
