import { useDispatch, useSelector } from "react-redux";
import React, { useEffect, useState } from "react";
import RecentlyProduct from "../../../productdetails/desktop/RecentlyProducts";
import Product from "../../../Body/mobile/productItem";
import { SwiperSlide } from "swiper/react";
import CartModal from "../../../Body/mobile/CartModal";
import ShowedProduct from "../../../Body/mobile/ShowedProduct";
import Toast from "../../../../helpers/Toast";
import { useTranslation } from "react-i18next";

const AlsoLike = ({ onOpen, recentlyProduct, itemsInCart }) => {
  const [product, setProduct] = useState([]);

  const [openCartModal, setOpenCartModal] = useState(false);
  const [qtyState, setQtyState] = useState(1);
  const [showedProductModal, setShowedProductModal] = useState(false);
  const [showedProduct, setShowedProduct] = useState([]);
  const [filteredRecentlyProducts, setFilteredRecentlyProducts] = useState([]);
  const cartLoading = useSelector((state) => state?.CartReducer?.cartLoading);
  const addedToCart = useSelector((state) => state?.CartReducer?.addedToCart);
  const [showToast, setShowToast] = useState({});
  const [selectedSize, setSelectedSize] = useState(
    null
  );
  const [isSizeRequired, setIsSizeRequired] = useState(
    product?.variation?.length > 0
  );
  useEffect(() => {
    setIsSizeRequired(product?.variation?.length > 0)
  }, [product]);
  const dispatch = useDispatch();

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
    const filteredRecentlyProducts = recentlyProduct.filter(
      (recentProduct) =>
        !itemsInCart?.some(
          (myProduct) => myProduct?.product_id === recentProduct?.id
        )
    );
    setFilteredRecentlyProducts(filteredRecentlyProducts);
  }, [recentlyProduct, itemsInCart]);
  const { t, i18n } = useTranslation("translation");
  return (
    <div
      className="page-identity-cart layout editing-v-1"
      // style={{ paddingBottom: "calc(env(safe-area-inset-bottom))" }}
    >
      {filteredRecentlyProducts?.length > 0 && (
        <div className="component-bottom-recommend one-tab">
          <div className="content-wrap">
            <div className="tabs-wrap">
              <div className="tabs swiper-container swiper-container-initialized swiper-container-horizontal swiper-container-free-mode">
                <div className="tab-list swiper-wrapper">
                  {/*<div className="tab-item swiper-slide  swiper-slide-active">*/}
                  {/*  <p className="text">You Might Like</p>*/}
                  {/*</div>*/}
                  <div className="tab-item swiper-slide active swiper-slide-next dot">
                    <p className="text">{t("user.recently")}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="component-bottom-recommend">
              <div className="pb-[12px] page-identity-cart layout editing-v-1">
                <div className="panes-wrap flex flex-wrap gap-y-3 gap-x-2 p-3 ">
                  {filteredRecentlyProducts?.map((product, i) => {
                    if (product) {
                      return (
                        <div
                          key={i}
                          className="w-[48%] aspect-[2/1] border-[1.5px] shadow"
                        >
                          <Product
                            setOpenCartModal={() => setOpenCartModal(true)}
                            setProduct={(product) => setProduct(product)}
                            setCloseCartModal={() => setOpenCartModal(false)}
                            product={product}
                            flashSale={product?.flash_deal_details}
                          />
                        </div>
                      );
                    }
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

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

export default AlsoLike;
