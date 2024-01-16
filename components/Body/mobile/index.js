import Navigation from "../../Header/mobile/navigation";
import Swiper from "./swiper";
import Categories from "./categories";
import Sale from "./sale";
import MainCategories from "./MainCategories";
import Products from "./products";
import CartModal from "./CartModal";
import React, { useEffect, useState } from "react";
import { LoaderCategories } from "helpers/Loader/Loading";
import ShowedProduct from "./ShowedProduct";
import { useDispatch, useSelector } from "react-redux";
import ModalBodyComponent from "../../card-modal/desktop/ModalBodyComponent";
import LoadingComponent from "../../LoadingComponent/desktop";
import Toast from "../../../helpers/Toast";
import HeaderMobile from "../../Header/mobile/Header";
import { useTranslation } from "react-i18next";
const Body = ({
  loading,
  mainBanners,
  footerBanners,
  featuredProducts,
  flashSale,
  categories,
  mainCategories,
}) => {
  const [openCartModal, setOpenCartModal] = useState(false);
  const [qtyState, setQtyState] = useState(1);
  const [showedProductModal, setShowedProductModal] = useState(false);
  const [product, setProduct] = useState([]);
  const cartLoading = useSelector((state) => state?.CartReducer?.cartLoading);
  const addedToCart = useSelector((state) => state?.CartReducer?.addedToCart);
  const [showedProduct, setShowedProduct] = useState([]);
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
  const cartProduct = useSelector((state) => state?.CartReducer?.cartProduct);

  useEffect(() => {
    if (typeof window !== "undefined") {
      if (openCartModal || showedProductModal) {
        // Add overflow hidden to the body when the modal is open
        document.body.style.overflow = "hidden";
      } else {
        // Restore the default overflow when the modal is closed
        document.body.style.overflow = "auto";
      }

      return () => {
        // Restore the default overflow when the component unmounts
        document.body.style.overflow = "auto";
      };
    }
  }, [openCartModal, showedProductModal]);
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
  }, [isSizeRequired]);

  return (
    <>
      {/*<Navigation loading={loading} categories={categories} />*/}
      <div
        className={`${
          openCartModal ? "blur-[6px] " : ""
        }  page-identity-home layout home-page`}
      >
        <div className={`pt-0 mt-0 item-wrap`}>
          <Swiper loading={loading} section={mainBanners} />
          <Categories loading={loading} section={categories} />
          {/*{footerBanners ? <BannerNoSwipper section={footerBanners} /> : null}*/}
          {featuredProducts ? (
            <Products
              setProduct={(product) => setProduct(product)}
              setOpenCartModal={() => setOpenCartModal(true)}
              setCloseCartModal={() => setOpenCartModal(false)}
              section={featuredProducts}
            />
          ) : (
            <LoaderCategories count={2} />
          )}
          {flashSale ? (
            <Sale
              setOpenCartModal={() => setOpenCartModal(true)}
              section={flashSale}
              setProduct={(product) => setProduct(product)}
              setCloseCartModal={() => setOpenCartModal(false)}
            />
          ) : (
            <LoaderCategories count={2} />
          )}
          {mainCategories ? (
            <MainCategories
              setOpenCartModal={() => setOpenCartModal(true)}
              section={mainCategories?.categories}
              setProduct={(product) => setProduct(product)}
              setCloseCartModal={() => setOpenCartModal(false)}
            />
          ) : (
            <LoaderCategories count={2} />
          )}
          {/*{section.isSale ? <Sale section={section} /> : null}*/}
          {/*{section.isPhotos === 1 ? <Photos section={section} /> : null}*/}
          {/*/!*{section.isProducts ? <Products section={section} /> : null}*!/*/}
          {/*{section.hasMore ? <LoadMore /> : null}*/}
          {/*/!*{section ? <RelatedSearches /> : null}*!/*/}
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
      {/*<RecommendedTabs />*/}
      {showToast?.show && <Toast message={showToast?.message} timeout={4000} />}
      {toastMessage && <Toast message={toastMessage} timeout={4000} />}
    </>
  );
};

export default Body;
