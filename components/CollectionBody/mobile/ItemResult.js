import React, { useEffect, useRef, useState } from "react";
import Product from "../../Body/mobile/productItem";
import LoadingComponent from "../../LoadingComponent/mobile";
import LoadingComponentDesktop from "../../LoadingComponent/desktop";
import { useDispatch, useSelector } from "react-redux";
import CartModal from "../../Body/mobile/CartModal";
import ShowedProduct from "../../Body/mobile/ShowedProduct";
import Toast from "../../../helpers/Toast";
import { useTranslation } from "react-i18next";
import { XSvg } from "../../svgs";
const ItemResult = ({
  Products,
  collections,
  setFinalFilteredItems,
  ItemsProducts,
}) => {
  const productLoading = useSelector(
    (state) => state?.ProductReducer?.productLoading
  );
  const [qtyState, setQtyState] = useState(1);
  const offset = useSelector((state) => state.ProductReducer.offset);
  const dispatch = useDispatch();
  function handleIncreaseOffset() {
    if (!productLoading) {
      dispatch({ type: "INCREASE_OFFSET" });
    }
  }
  const viewMoreButtonRef = useRef(null);

  useEffect(() => {
    window.addEventListener("scroll", function () {
      const buttonElement = viewMoreButtonRef.current;

      if (buttonElement) {
        const buttonRect = buttonElement?.getBoundingClientRect();
        const isButtonVisible = buttonRect.top < window.innerHeight;

        if (isButtonVisible) {
          // console.log("isButtonVisible");
          // console.log(productLoading, "productLoading");
          handleIncreaseOffset();
        }
      }
    });
  }, [productLoading]);
  function handleDecreaseOffset() {
    dispatch({ type: "Decrease_Offset" });
  }
  const [product, setProduct] = useState([]);
  const [openCartModal, setOpenCartModal] = useState(false);
  const [isSizeRequired, setIsSizeRequired] = useState(
    product?.variation?.length > 0
  );
  useEffect(() => {
    setIsSizeRequired(product?.variation?.length > 0)
  }, [product]);
  const [showedProductModal, setShowedProductModal] = useState(false);
  const [showedProduct, setShowedProduct] = useState([]);
  const [selectedSize, setSelectedSize] = useState(
    null
  );

  const paginationLoading = useSelector(
    (state) => state?.ProductReducer?.paginationLoading
  );
  const cartLoading = useSelector((state) => state?.CartReducer?.cartLoading);
  const addedToCart = useSelector((state) => state?.CartReducer?.addedToCart);
  const [showToast, setShowToast] = useState({});
  function handleClose() {
    setProduct(null);
    setOpenCartModal(false);
    dispatch({
      type: "REMOVE_PRODUCT_CART",
      payload: null,
    });
    setSelectedSize("");
    setIsSizeRequired(false);
  }
  const { t, i18n } = useTranslation("translation");
  function addToCart(product) {
    if (isSizeRequired) {
      if (selectedSize) {
        dispatch({
          type: "ADD_TO_CART",
          payload: {
            id: product?.id,
            quantity: qtyState || 1,
            choice_1: selectedSize?.type,
          },
        });
      } else {
        setShowToast({
          show: true,
          message: `${t("main.please_choose_the_size")}`,
        });
        setTimeout(() => {
          setShowToast({ show: false, message: "" });
        }, 4000);
      }
    } else {
      dispatch({
        type: "ADD_TO_CART",
        payload: {
          id: product?.id,
          quantity: qtyState || 1,
        },
      });
    }
  }
  const _closeAfterSuccess = () => {
    if (addedToCart && !cartLoading) {
      handleClose();
      dispatch({ type: "RESET_ADDED_TO_CART" });
    }
  };
  const toastMessage = useSelector((state) => state?.CartReducer.toastMessage);

  useEffect(() => {
    if (addedToCart && !toastMessage) {
      _closeAfterSuccess();
    }
  }, [addedToCart, cartLoading]);
  useEffect(() => {
    // console.log(ItemsProducts.length);
  }, [ItemsProducts]);

  return (
    <div className="collection__list-wrapper product__list-wrapper">
      <div
        className="product-list flex flex-wrap gap-2 w-full mb-5"
        id="collection-masonry"
      >
        {/* {productLoading && !ItemsProducts?.length > 0 && <LoadingComponent />} */}
        {ItemsProducts?.map((product, index) => {
          return (
            <div className="shadow-xl w-[calc(50%-10px)] h-[calc(50%-10px)]">
              <Product
                key={index}
                setProduct={(product) => setProduct(product)}
                product={product}
                setOpenCartModal={() => setOpenCartModal(true)}
                setCloseCartModal={() => setOpenCartModal(false)}
                flashSale={product?.flash_deal_details}
              />
            </div>
          );
        })}
      </div>
      <div className="collection-description">
        <div
          className={`${
            Products?.total_size > ItemsProducts.length && !productLoading
              ? ""
              : "hidden"
          } collection-description__inner`}
        >
          <div
            className={`${
              Products?.products?.length > 0 && paginationLoading
                ? ""
                : "hidden"
            } flex items-center justify-center w-full h-[120px]`}
          >
            <LoadingComponentDesktop />
          </div>
          {Products?.products?.length > 0 && !paginationLoading && (
            <div className="pl-5 bg-gray-50  flex flex-col items-stretch gap-5 mb-5">
              <div
                style={{
                  alignSelf: "center",
                }}
                className="style_paginationWrapper__YMATm"
              >
                <span
                  ref={viewMoreButtonRef}
                  className="cursor-pointer"
                  onClick={handleIncreaseOffset}
                >
                  {t("user.view_more")}
                </span>
              </div>
              <div className="pl-5 bg-gray-50 text-center text-base text-[#868C93]">
                {ItemsProducts.length} {t("user.of")} {Products?.total_size}{" "}
                {t("user.products")}
                {/*A total of {Math.ceil(Products?.total_size / 20)} pages*/}
              </div>
            </div>
          )}
        </div>
      </div>
      <CartModal
        qtyState={qtyState}
        isSizeRequired={isSizeRequired}
        setQtyState={(qtyState) => setQtyState(qtyState)}
        addToCart={(product) => addToCart(product)}
        setSelectedSize={(selectedSize) => setSelectedSize(selectedSize)}
        setIsSizeRequired={(isSizeRequired) =>
          setIsSizeRequired(isSizeRequired)
        }
        selectedSize={selectedSize}
        setShowedProduct={(showedProduct) => setShowedProduct(showedProduct)}
        setShowedProductModal={() => setShowedProductModal(true)}
        setCloseProductModal={() => {
          setShowedProductModal(false);
          setShowedProduct(null);
        }}
        product={product}
        openModal={openCartModal}
        onClose={() => {
          handleClose();
        }}
        showToast={showToast}
      />
      <ShowedProduct
        showedProduct={showedProduct}
        openShowedProduct={showedProductModal}
        onClose={() => {
          setShowedProduct(null);
          setShowedProductModal(false);
        }}
      />
      {showToast?.show && <Toast message={showToast?.message} timeout={4000} />}
      {toastMessage && <Toast message={toastMessage} timeout={4000} />}
    </div>
  );
};
export default ItemResult;
