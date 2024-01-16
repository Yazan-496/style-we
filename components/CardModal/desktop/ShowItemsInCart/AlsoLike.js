import { useDispatch, useSelector } from 'react-redux';
import React, { useEffect, useState } from 'react';
import RecentlyProduct from '../../../productdetails/desktop/RecentlyProducts';
import CartProduct from '../../../Body/desktop/CartProductItem';
import { SwiperSlide } from 'swiper/react';
import CartModal from '../../../Body/mobile/CartModal';
import ShowedProduct from '../../../Body/mobile/ShowedProduct';
import Toast from '../../../../helpers/Toast/Big';
import { TransClient } from 'helpers/TransClient';
import NewProduct from "../../../common/NewProduct";

const AlsoLike = ({ onOpen, recentlyProduct, itemsInCart,onCLose }) => {
  const [product, setProduct] = useState([]);

  const dispatch = useDispatch();
  const toastMessage = useSelector((state) => state?.CartReducer.toastMessage);
  const WishListReducer = useSelector(
    (state) => state?.ProductReducer?.WishList
  );
  const sync = useSelector(
    (state) => state?.ProductReducer?.sync
  );
  useEffect(() => {
    console.log(WishListReducer, sync, 'aaaaaaaaa')
    dispatch({
      type: 'GET_FAVORITE_PRODUCTS',
    });
  }, [sync]);
  const [openCartModal, setOpenCartModal] = useState(false);
  const [showedProductModal, setShowedProductModal] = useState(false);
  const [showedProduct, setShowedProduct] = useState([]);
  const [filteredRecentlyProducts, setFilteredRecentlyProducts] = useState([]);
  const cartLoading = useSelector((state) => state?.CartReducer?.cartLoading);
  const addedToCart = useSelector((state) => state?.CartReducer?.addedToCart);
  const [showToast, setShowToast] = useState({});
  const [selectedSize, setSelectedSize] = useState(null);
  const [isSizeRequired, setIsSizeRequired] = useState(
    product?.variation?.length > 0
  );
  const [qtyState, setQtyState] = useState(1);
  useEffect(() => {
    setIsSizeRequired(product?.variation?.length > 0);
  }, [product]);

  function handleClose() {
    setProduct(null);
    setOpenCartModal(false);
    dispatch({
      type: 'REMOVE_PRODUCT_CART',
      payload: null,
    });
    setSelectedSize('');
    setIsSizeRequired(false);
  }
  function addToCart(product) {
    if (isSizeRequired) {
      if (selectedSize) {
        dispatch({
          type: 'ADD_TO_CART',
          payload: {
            id: product?.id,
            quantity: qtyState || 1,
            choice_1: selectedSize?.type,
          },
        });
      } else {
        setShowToast({
          show: true,
          message: `${t('main.please_choose_the_size')}`,
        });
        setTimeout(() => {
          setShowToast({ show: false, message: '' });
        }, 4000);
      }
    } else {
      dispatch({
        type: 'ADD_TO_CART',
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
      dispatch({ type: 'RESET_ADDED_TO_CART' });
    }
  };

  useEffect(() => {
    if (addedToCart) {
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
  return (
    <div
      className="w-full"
      // style={{ paddingBottom: "calc(env(safe-area-inset-bottom))" }}
    >
      {filteredRecentlyProducts?.length > 0 && (
          <div className="w-full flex flex-col items-center justify-center">
                    <p className="text-center w-full">{TransClient('user.recently_viewed')}</p>
            <div className={`grid grid-cols-2 sm:grid-cols-2 md:grid-cols-2 gap-1`}>
                  {filteredRecentlyProducts?.map((product, i) => {
                    return (
                        <div key={i} className='p-1'>
                          <NewProduct
                              isInCart={true}
                              onCLose={onCLose}
                              product={product}
                              imgClass='!h-72 sm:!h-[278px] md:!h-80 lg:!h-[380px] xl:!h-[440px] 2xl:!h-[490px]'
                          />
                        </div>
                    );
                  })}
                </div>
          </div>
      )}
      <hr />
      {WishListReducer?.length > 0 && (
          <div className="w-full flex flex-col items-center justify-center">
                    <p className="text-center w-full">{TransClient('user.wishlist')}</p>
            <div className={`grid grid-cols-2 sm:grid-cols-2 md:grid-cols-2 gap-1`}>
                  {WishListReducer?.map((product, i) => {
                    return (
                      <div key={i} className='p-1'>
                        <NewProduct
                            product={product}
                            imgClass='!h-72 sm:!h-[278px] md:!h-80 lg:!h-[380px] xl:!h-[440px] 2xl:!h-[490px]'
                        />
                      </div>
                    );
                  })}
                </div>
          </div>
      )}
      {/*<CartModal*/}
      {/*  qtyState={qtyState}*/}
      {/*  isSizeRequired={isSizeRequired}*/}
      {/*  setQtyState={(qtyState) => setQtyState(qtyState)}*/}
      {/*  addToCart={(product) => addToCart(product)}*/}
      {/*  setSelectedSize={(selectedSize) => setSelectedSize(selectedSize)}*/}
      {/*  setIsSizeRequired={(isSizeRequired) =>*/}
      {/*    setIsSizeRequired(isSizeRequired)*/}
      {/*  }*/}
      {/*  selectedSize={selectedSize}*/}
      {/*  setShowedProduct={(showedProduct) => setShowedProduct(showedProduct)}*/}
      {/*  setShowedProductModal={() => setShowedProductModal(true)}*/}
      {/*  setCloseProductModal={() => {*/}
      {/*    setShowedProductModal(false);*/}
      {/*    setShowedProduct(null);*/}
      {/*  }}*/}
      {/*  product={product}*/}
      {/*  openModal={openCartModal}*/}
      {/*  onClose={() => {*/}
      {/*    handleClose();*/}
      {/*  }}*/}
      {/*  showToast={showToast}*/}
      {/*/>*/}
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
