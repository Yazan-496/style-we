import React, { useEffect, useState } from 'react';
import Product from '../../../../Body/desktop/productItem';
import CartModal from '../../../../Body/mobile/CartModal';
import { useDispatch, useSelector } from 'react-redux';
import { RefreshSvg } from '../../../../svgs';
import { TransClient } from 'helpers/TransClient';

const WishList = ({ WishLists, refresh, setRefresh }) => {
  const [product, setProduct] = useState([]);

  const [qtyState, setQtyState] = useState(1);
  const [openCartModal, setOpenCartModal] = useState(false);
  const cartLoading = useSelector((state) => state?.CartReducer?.cartLoading);
  const addedToCart = useSelector((state) => state?.CartReducer?.addedToCart);
  const [showToast, setShowToast] = useState({});
  const [selectedSize, setSelectedSize] = useState(null);
  const [isSizeRequired, setIsSizeRequired] = useState(
    product?.variation?.length > 0
  );
  useEffect(() => {
    setIsSizeRequired(product?.variation?.length > 0);
  }, [product]);
  const dispatch = useDispatch();

  function handleClose() {
    setOpenCartModal(false);
    dispatch({
      type: 'REMOVE_PRODUCT_CART',
      payload: null,
    });
    setSelectedSize('');
    setIsSizeRequired(false);
  }
  useEffect(() => {
    setIsSizeRequired(product?.variation?.length > 0);
  }, [product]);
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
  }, [WishLists]);
  return (
    <>
      <h3 className="flex gap-x-10 text-[rgb(49,53,60)] text-2xl font-semibold leading-[29px] mb-6 pb-4 border-b-2 border-b-[rgb(93,98,106)] border-solid">
        <span>{TransClient('user.wishlist')}</span> <div className='flex-1' onClick={() => {
        setRefresh(!refresh)
      }}>
        <RefreshSvg />
      </div>
      </h3>

        {WishLists?.length > 0 ? (
          <div className="panes-wrap flex flex-wrap gap-y-3 gap-x-2 p-3 ">
            {WishLists?.map((wish, i) => {
              return (
                <div key={i} className="w-[48%]  border-[1.5px] shadow">
                  <Product
                    setOpenCartModal={() => setOpenCartModal(true)}
                    setProduct={(product) => setProduct(product)}
                    setCloseCartModal={() => setOpenCartModal(false)}
                    setRefresh={(a) => setRefresh(a)} refresh={refresh}
                    product={wish}
                    flashSale={wish?.flash_deal_details}
                  />
                </div>
              );
            })}
          </div>
        ) : (
          <div
            className={`flex flex-col space-y-4 pt-20 h-full items-center justify-center`}
          >
            <img alt="sad" src="/image/catalog/activity/empty-order.png" />
            <span>it is empty here</span>
          </div>
        )}
      {/* <CartModal
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
      /> */}
    </>
  );
};
export default WishList;
