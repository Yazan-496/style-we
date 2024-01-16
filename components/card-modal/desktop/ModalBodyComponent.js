import React, { useEffect, useState } from 'react';
import CarouselItemsCard from './CarouselItems';
import ItemDetailCard from './ItemDetailCard';
import { store } from 'store';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { useRouter } from 'next/navigation';
import { HeartSVG, SvgLoader } from '../../svgs';

const ModalBodyComponent = ({
  setLoading,
                              loading,
  product,
  addToCart,
  showToast,
  setSelectedSize,
  selectedSize,
  setIsSizeRequired,
  isSizeRequired,
  setQtyState,
  qtyState,
}) => {
  const [check, setCheck] = useState(product?.is_favourite);
  const router = useRouter();
  const handleAddToCart = async () => {
    setLoading(true);
    addToCart(product);
  };
  useEffect(() => {
    if (product?.is_favourite) {
      setCheck(true);
    }
  }, [product]);
  const shippingCart = useSelector((store) => store.CartReducer.shippingCart);
  const addedToCart = useSelector((store) => store.CartReducer.addedToCart);
  const [buy, setBuy] = useState(false);
  function handleBuy() {
    setBuy(true);
    addToCart(product);
  }
  function setFavorite() {
    dispatch({
      type: 'FAVORITE_PRODUCT',
      payload: { id: product?.id, isFavorite: check },
    });
    setCheck(!check);
  }
  const dispatch = useDispatch();
  useEffect(() => {
    if (addedToCart && buy) {
      dispatch({ type: 'RESET_ADDED_TO_CART' });
      dispatch({ type: 'START_LOADING_PRODUCT' });
      router.push('/payment-method');
    }
  }, [buy, addedToCart]);
  const syncInfo = useSelector((state) => state.AuthReducer.syncInfo);
  const [syncLoading, setSyncLoading] = useState(true)
  useEffect(() => {
    if (typeof window !== "undefined") {
      const customerInfo = JSON.parse(localStorage.getItem("CUSTOMER_INFO_STORAGE"))
      if (customerInfo?.customerInfo){
        setSyncLoading(false)
      }
      else{
        setSyncLoading(true)
      }
    }
  }, [syncInfo]);
  const { t, i18n } = useTranslation('translation');
  return (
    <div className="flex h-full flex-col px-2 pb-[10px] w-full max-h-[-webkit-fill-available] overflow-auto">
      <div className="sm:h-[90%] flex flex-col lg:flex-row justify-between w-full h-full gap-6">
        <div className=" overflow-y-auto overflow-x-hidden lg:overflow-auto md:overflow-auto ">
        <CarouselItemsCard product={product} />

        <div className="relative flex-1 w-full lg:w-[432px]">
          <ItemDetailCard
              isSizeRequired={isSizeRequired}
              qtyState={qtyState}
              setQtyState={(qtyState) => setQtyState(qtyState)}
              product={product}
              showToast={showToast}
              selectedSize={selectedSize}
              setSelectedSize={(selectedSize) => setSelectedSize(selectedSize)}
              setIsSizeRequired={(isSizeRequired) => setIsSizeRequired(isSizeRequired)}
          />
          {/*<div className="lg:hidden h-[60px] w-full bottom-0" />*/}
        </div>
        </div>
        <div className="md:right-[20%] sm:fixed lg:absolute md:absolute flex justify-center self-stretch flex-grow-0 flex-shrink-0 gap-4 lg:bottom-0 md:bottom-0 bottom-20 lg:right-0 pb-2 purchase-btn mt-2 pt-2 bg-white bg-opacity-95 flex-grow items-end w-full lg:w-[50%] md:w-[50%]">
          {product?.in_stock ? (
            <div> 
              <button
                disabled={loading}
                onClick={handleAddToCart}
                className="bg-black flex justify-center items-center overflow-auto rounded disabled:opacity-80 disabled:cursor-not-allowed hover:opacity-80 active:opacity-90 active:shadow-[inset_0px_0px_8px_rgba(0,0,0,0.25)] group cm-btn-primary flex-grow h-12 gap-1"
              >
                <div className="inline-block truncate opacity-1 group-active:opacity-90 p-2">
                  <p className="text-white flex-grow-0 flex-shrink-0 text-lg font-bold">
                    {loading ? <SvgLoader /> : t('user.add_to_cart')}
                  </p>
                </div>
              </button>
            </div>
          ) : (
          <div
              disabled={loading}
              className="bg-black/50 flex justify-center items-center overflow-auto rounded disabled:opacity-80 disabled:cursor-not-allowed hover:opacity-80 active:opacity-90 active:shadow-[inset_0px_0px_8px_rgba(0,0,0,0.25)] group cm-btn-primary flex-grow h-12 gap-1"
            >
              <div className="inline-block truncate opacity-1 group-active:opacity-90">
                <p className="text-white flex-grow-0 flex-shrink-0 text-lg font-bold">
                  {t('user.out_of_stock')}
                </p>
              </div>
            </div>
          )}

          <button
              onClick={() => setFavorite()}
              className="flex justify-center items-center overflow-auto rounded disabled:opacity-20 disabled:cursor-not-allowed hover:opacity-80 active:opacity-90 active:shadow-[inset_0px_0px_8px_rgba(0,0,0,0.25)] group cm-btn-second border h-12 px-3"
          >
            <div onClick={() => setFavorite()} className="inline-block truncate opacity-1 group-active:opacity-90 bg-gray-100">
              <HeartSVG check={check} />
            </div>
          </button>
        </div>

      </div>
    </div>
  );
};
export default ModalBodyComponent;
