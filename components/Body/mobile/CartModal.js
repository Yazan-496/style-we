import React, { useEffect, useState } from 'react';
import { CloseIconSvg } from 'components/svgs';
import CartModalDetail from './CartModalDetail';
import Product from './productItem';
import { useDispatch, useSelector } from 'react-redux';
import ItemDetailCard from '../../card-modal/mobile/ItemDetailCard';
import { useTranslation } from 'react-i18next';
import { HeartSVG } from '../../svgs';

const CartModal = ({
  addToCart,
  product,
  onClose,
  openModal,
  setShowedProduct,
  setCloseProductModal,
  setShowedProductModal,
  setSelectedSize,
  selectedSize,
  setIsSizeRequired,
  showToast,
  isSizeRequired,
  setQtyState,
  qtyState,
}) => {
  const cartProduct = useSelector((state) => state?.CartReducer?.cartProduct);
  const cartLoading = useSelector((state) => state?.CartReducer?.cartLoading);
  const handleAddToCart = () => {
    addToCart(product);
  };
  const [check, setCheck] = useState(product?.is_favourite);
  const dispatch = useDispatch();

  function setFavorite() {
    dispatch({
      type: 'FAVORITE_PRODUCT',
      payload: { id: product?.id, isFavorite: check },
    });
    setCheck(!check);
  }

  useEffect(() => {
    setCheck(false);
    if (product?.is_favourite) {
      setCheck(true);
    } else {
      setCheck(false);
    }
  }, [product]);
  const { t, i18n } = useTranslation('translation');
  return (
    <div className={`${openModal ? ' pure-modal-backdrop' : ''} `}>
      <div
        className={` modal-overlay-cart ${openModal ? 'open' : ''} `}
        id=""
        style={{}}
      >
        <div
          className={`h-[90%] overflow-y-auto relative modal-content-cart ${
            openModal ? 'open' : ''
          } `}
        >
          <div className="h-full">
            <CartModalDetail
              qtyState={qtyState}
              isSizeRequired={isSizeRequired}
              setQtyState={(qtyState) => setQtyState(qtyState)}
              setShowedProduct={(showedProduct) =>
                setShowedProduct(showedProduct)
              }
              setShowedProductModal={() => setShowedProductModal(true)}
              setCloseProductModal={() => setCloseProductModal(false)}
              product={cartProduct}
              loading={cartLoading}
              openModal={openModal}
              selectedSize={selectedSize}
              setSelectedSize={(selectedSize) => setSelectedSize(selectedSize)}
              setIsSizeRequired={(isSizeRequired) =>
                setIsSizeRequired(isSizeRequired)
              }
              onClose={() => onClose(false)}
              showToast={showToast}
            />
          </div>
        </div>
        <div className="overflow-hidden sticky w-full bottom-0 bg-[white] shadow z-[9999] opacity-1 flex p-2">
          <span
            onClick={() => setFavorite()}
            className="p-1 components-ajax-quick-shop__collect "
          >
            <HeartSVG size={'big'} check={check} />
          </span>
          <div
            onClick={handleAddToCart}
            className="text-white rounded-[10px]
           bg-[#141414] text-white
           flex-1 h-[40px] leading-10
            uppercase font-[700]
            text-center
            primary-btn-active"
          >
            {t('user.add_to_cart')}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartModal;
