import React, { useState , useEffect} from 'react';
import {ArrowSvgUp, SvgCheckbox, SvgLoader} from '../../../svgs';
import { useTranslation } from 'react-i18next';
import Link from '../../../../helpers/Link';
import Coupon from '../../../PaymentMethod/components/Coupon';
import ShoppingBag from '../../../PaymentMethod/components/ShoppingBag';
import { useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import store from '../../../../store';
import {useCart} from "../../../context/CartContext";

const ButtonCheckout = ({
  total,
  selected,
  setSelectAll,
  selectAll,
  items,
  saved,
  shippingCart,
  isMobile,
                          onCLose
}) => {
  const router = useRouter()
  const hasNonZeroOrNegativeShippingDays = shippingCart?.cart?.some(product => product.shipping_days !== 0 && product.shipping_days !== -1);
  let maxShippingDays = -1;
  if (hasNonZeroOrNegativeShippingDays) {
    shippingCart?.cart.forEach(product => {
      if (product.shipping_days > maxShippingDays) {
        maxShippingDays = product.shipping_days;
      }
    });
  }
  useEffect (() => {
    router.refresh();
  },[maxShippingDays]);
  console.log('maxShippingDays',maxShippingDays !== -1);
  const { t, i18n } = useTranslation('translation');
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(true);
  const {removeFromCart, loadingProvider, changeQuantity} = useCart()
  const cartLoading = useSelector((state) => state?.CartReducer?.cartLoading);

  const [discount, setDiscount] = useState(shippingCart?.coupon_discount);
  const handleClickShoppingBag = () => {
    setIsOpen(!isOpen);
  }
  const currentDate = new Date();
  const deliveryDate = new Date(currentDate);
  deliveryDate.setDate(currentDate.getDate() + maxShippingDays);
  useEffect(() => {
    setDiscount(shippingCart?.coupon_discount);
    const unsubscribe = store.subscribe(() => {
      setDiscount(shippingCart?.coupon_discount);
    });
    return () => {
      unsubscribe();
    };
  }, [shippingCart]);
  useEffect(() => {
   console.log(cartLoading, "cartLoading")
  }, [cartLoading]);

  const [couponDiscountExist, setcouponDiscountExist] = useState(false)
  const [showCoupon, setShowCoupon] = useState(true);
  const couponLocalStorage = localStorage.getItem('COUPON');
  useEffect(() => {
    if(shippingCart?.coupon_discount !== 0){
      setShowCoupon(true);
    }else if (couponLocalStorage == null && shippingCart.coupon_discount === 0) {
      setShowCoupon(true);
    }else if (couponLocalStorage != null && shippingCart.coupon_discount === 0){
        dispatch({ type: "APPLY_COUPON", payload: couponLocalStorage });
        setShowCoupon(false);
    }
    // console.log(shippingCart?.cart, "shippingCart");
  }, [shippingCart,router]);
  return (
    <div className={`${shippingCart?.cart?.length > 0 ? "" : "hidden"} h-auto w-full lg:w-[480px] md:w-[480px] 
      fixed flex flex-col justify-start items-center bottom-0 px-4
      bg-white z-50 border-t border-[#00000014]`}>
      {discount === 0 && (
        <div className={``} onClick={handleClickShoppingBag}>
          <ArrowSvgUp rotate={!isOpen ? 0 : 180} />
        </div>
      )}
      <div className="p-2 w-full justify-center items-center flex flex-col gap-2">
        <div className=" flex justify-end">
          <span className="text-[14px] leading-[18px] text-[#5d626a]">
            {t('user.save')}:{' '}
            <span className="notranslate">
              {shippingCart?.total_discount_on_product || 0}{' '}
              {t('header.language.aed')}
            </span>
          </span>
        </div>
        <div className="flex flex-col items-center justify-center relative">
          <div className="hidden flex justify-start items-center h-8 relative gap-2">
            <div
              onClick={() => setSelectAll(!selectAll)}
              className="w-[20px] h-[20px]"
            >
              <SvgCheckbox click={selected === items?.length} />
            </div>
            <p className="flex-grow text-[16px] leading-[18px] text-left text-[#31353c]">
              Selected&nbsp;
              <span className="notranslate">({selected || 0})</span>
            </p>
          </div>
          <div className="flex-1 overflow-hidden flex justify-end gap-1">
            <span className="flex-grow-0 flex-shrink-0 text-xl text-left text-[#31353c]">
              {t('user.shipping_cost')}:
            </span>
            <div className="flex justify-start items-center flex-grow-0 flex-shrink-0 relative gap-2">
              <p className="flex-grow-0 flex-shrink-0 text-xl font-bold text-left text-red-600 notranslate">
                {shippingCart?.total_shipping_cost_formated || 0}
              </p>
            </div>
          </div>

          <div className="flex-1 overflow-hidden flex justify-end gap-1">
            <span className="flex-grow-0 flex-shrink-0 text-xl text-left text-[#31353c]">
              {t('user.total')}:
            </span>
            <div className="flex justify-start items-center flex-grow-0 flex-shrink-0 relative gap-2">
              <p className="flex-grow-0 flex-shrink-0 text-xl font-bold text-left text-red-600 notranslate">
                {shippingCart?.total || 0} {t('header.language.aed')}
              </p>
            </div>
          </div>
          {(maxShippingDays !== -1 && maxShippingDays !== 0) && (
              <div className="flex-1 overflow-hidden flex justify-end gap-1 bg-green-500 text-white p-1 rounded">
            <span className="flex-grow-0 flex-shrink-0 text-xl text-left text-green">
              {t('user.recieve_it_on_or_before')}:
            </span>
                <div className="flex justify-start items-center flex-grow-0 flex-shrink-0 relative gap-2">
                  <p className="flex-grow-0 flex-shrink-0 text-xl font-bold text-left text-green notranslate">
                    {deliveryDate.toLocaleDateString()}
                  </p>
                </div>
              </div>
          )}
          {discount !== 0 && !cartLoading ? (
            <div className="flex-1 overflow-hidden flex justify-end gap-1">
              <span className="flex-grow-0 flex-shrink-0 text-xl text-left text-[#31353c]">
                {t('user.coupon')} {t('user.discount')}:
              </span>
              <div className="flex justify-start items-center flex-grow-0 flex-shrink-0 relative gap-2">
                <p className="flex-grow-0 flex-shrink-0 text-xl font-bold text-left text-red-600 notranslate">
                  <del className="text-red-600">  
                    {discount} AED
                  </del>
                </p>
              </div>
            </div>
           ) : cartLoading ? (
              <div className="flex-1 overflow-hidden flex justify-end gap-1">
              <span className="flex-grow-0 flex-shrink-0 text-xl text-left text-[#31353c]">
                {t('user.coupon')} {t('user.discount')}:
              </span>
                <div className="flex justify-start items-center flex-grow-0 flex-shrink-0 relative gap-2">
                  <p className="flex-grow-0 flex-shrink-0 text-xl font-bold text-left text-red-600 notranslate">
                    <div className="text-red-600">
                      <SvgLoader color={'#dc2626'} />
                    </div>
                  </p>
                </div>
              </div>
          ) : null}
        </div>
      </div>
      {showCoupon && (
        <div
          className={`${
            discount > 0 ? 'hidden' : ''
          } w-full transition-height duration-300 ${
            isOpen ? 'h-[150px]' : 'h-0 '
          }`}
        >
          {discount > 0 ? null : (
            <Coupon />
          )}
        </div>
      )}
    
      <div className="flex flex-col justify-start items-center flex-grow-0 flex-shrink-0 gap-2">
        <Link 
          href={"/payment-method/"}
          onClick={() => {
            onCLose()                                          
              router.refresh()
          }}
          >
          <button  className="cm-btn-primary bg-black flex justify-center items-center flex-grow-0 flex-shrink-0 w-[448px] h-11 relative overflow-hidden gap-1 px-3 py-2 rounded disabled:bg-[#F2F2F3] disabled:text-[#CED0D3] disabled:cursor-not-allowed">
            <p className=" text-white text-[18px] leading-[21px] font-bold">
              {t('user.checkout')}
            </p>
          </button>
        </Link>
        {/*{isMobile ? null : (*/}
        {/*  <Link href="/shipping-bag">*/}
        {/*    <button className="cm-btn-primary border border-[var(--cm-color-primary-btn-bg)] text-[var(--cm-color-primary-btn-bg)] bg-white flex justify-center items-center flex-grow-0 flex-shrink-0 w-[448px] h-11 relative overflow-hidden gap-1 px-3 py-2 rounded disabled:bg-white disabled:text-[#CED0D3] disabled:cursor-not-allowed">*/}
        {/*      <p className=" text-black text-[18px] leading-[21px] font-bold">*/}
        {/*        {t('user.view_cart')}*/}
        {/*      </p>*/}
        {/*    </button>*/}
        {/*  </Link>*/}
        {/*)}*/}
      </div>
    </div>
  );
};
export default ButtonCheckout;
