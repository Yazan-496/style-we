import React, { useState, useEffect } from 'react';
import HTMLRenderer from 'helpers/HTMLRenderer';
import Sizes from '../../Body/desktop/Sizes';
import Link from 'helpers/Link';
import ModalBodyComponent from './ModalBodyComponent';
import { useTranslation } from 'react-i18next';
import QTY from 'components/Body/desktop/qty';
import { SvgLoader } from 'components/svgs';
import { TransClient } from 'helpers/TransClient';
import RedeemComment from 'components/common/RedeemComment';

const ItemDetailCard = ({
  details,
  product,
  setSelectedSize,
  selectedSize,
  showToast,
  setIsSizeRequired,
  isSizeRequired,
  setQtyState,
  qtyState,
}) => {
  const [showRedeem, setShowRedeem] = useState(false);
  const [loadingRedeem, setLoadingRedeem] = useState(false);
  const redeemProductIds = JSON.parse(localStorage.getItem('REDEEM_PRODUCTS_IDS')) || [];
  useEffect(() => {
   if (product?.id){
     const isProductIdInRedeem = redeemProductIds.includes(product.id);
     if (isProductIdInRedeem) {
       setShowRedeem(true);
     } else {
       setShowRedeem(false)
     }
   }
  }, [product]);
  const handleRedeem = async () => {
    setLoadingRedeem(true)
    await new Promise((resolve) => setTimeout(resolve, 3000));
    setShowRedeem(true)
    // Start Add Product ID To REDEEM_PRODUCTS
    const redeemProductIds = JSON.parse(localStorage.getItem('REDEEM_PRODUCTS_IDS')) || [];
    const isProductIdInRedeem = redeemProductIds.includes(product.id);

    if (!isProductIdInRedeem) {
        const updatedProductIds = [...redeemProductIds, product.id];
        localStorage.setItem('REDEEM_PRODUCTS_IDS', JSON.stringify(updatedProductIds));
    }
    // End Add Product ID To REDEEM_PRODUCTS
    const coupon = localStorage.getItem('COUPON');
    if(coupon) {
        dispatch({ type: "APPLY_COUPON", payload: coupon });
    }
    setLoadingRedeem(false)
  }

  function getColor(offer_price, price) {
    const num = 100 - parseInt((offer_price * 100) / price);
    switch (true) {
      case 0 < num && num < 39:
        return 'bg-green-600';
      case 38 < num && num < 74:
        return 'bg-yellow-400';
      case 73 < num && num < 89:
        return 'bg-orange-600';
      case 88 < num && num < 101:
        return 'bg-red-600';
      default:
        return '';
    }
  }
  const { t, i18n } = useTranslation('translation');
  return (
    <div className="flex flex-col w-full min-h-[100%] relative gap-6">
      <div>
        <div className="flex items-center flex-shrink-0 flex-grow-0">
          <h1
            className="break-words w-full cm-goods-detail-title-1 leading-6 line-clamp-2"
            title="Faux Denim Shirt Collar Casual Loose Denim Dress"
          >
            {product?.name}
          </h1>
        </div>
        <div className="flex flex-col mt-4">
          <div className="flex flex-col gap-2 relative">
            <div className="flex justify-start items-center flex-grow-0 flex-shrink-0 relative gap-2 lg:gap-3">
              <div className="flex justify-start items-center flex-grow-0 flex-shrink-0 relative gap-2">
                <p className={`flex text-2xl font-[700] text-red-500 justify-center items-center notranslate cm-goods-detail-price ${showRedeem &&  "line-through"} `}>
                  {product?.offer_price_formatted}
                </p>
                <p className="component__product-price-origin flex justify-center items-center notranslate cm-goods-detail-price line-through">
                  {product?.price_formatted}
                </p>{' '}
                {100 - parseInt((product?.offer_price * 100) / product?.price) >
                  0 && (
                  <div
                    className={`rounded p-1 relative top-0 style_discountTag__LG3NB_mobile z-5 ${getColor(
                      product?.offer_price,
                      product?.price
                    )} `}
                  >
                    <span
                      className={`style_discountTagInner__xrve6_mobile notranslate`}
                    >
                      -
                      {100 -
                        parseInt(
                          (product?.offer_price * 100) / product?.price
                        )}{' '}
                      %
                    </span>
                  </div>
                )}
              </div>
              <Link className="flex items-center flex-1 justify-end cursor-pointer text-[#31353B]" href={`/product/${product?.slug}`}>
                  {t('main.detail')}
                  <svg
                    stroke="#31353B"
                    viewBox="0 0 32 32"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    width={20}
                    height={20}
                    className="rotate-180"
                  >
                    <path d="m20 8-8 8 8 8" strokeWidth={2} />
                  </svg>
              </Link>
            </div>
            {((showRedeem == "False" || showRedeem == false) && product?.redeem_price_formatted !== "0.00 AED" && product?.redeem_price !== 0) ?
                <div class="product-price text-center font-roboto font-bold text-16px flex gap-2 justify-center mt-2 relative z-10 bg-white w-full pt-3">
                    <a href="https://www.clearance.ae/product/classic-design-wooden-blower-metal-nozzle-with-hanging-strap-zDGf16"></a>
                    <button onClick={handleRedeem} class="bg-gray-300 h-fit ring-2 ring-gray-300 btn btn-whatsapp element-center btn-gap-right inline-block font-normal text-4b566b text-center select-none border border-transparent px-1 py-10px text-0.9375rem leading-1.5 rounded transition duration-0.25s ease-in-out">
                        <span class="text-black text-14px">{loadingRedeem ? <SvgLoader /> : TransClient("user.redeem")}</span>
                    </button>
                    <div class="h-fit bg-green-500 border-4ade7f mb-18px mr-6 px-0 rounded">{product?.redeem_discount_rate?.toFixed(0)}%</div>
                </div> 
                :
                ""
            }
            {showRedeem && (product?.redeem_price !==0) && <div class=" relative z-10 bg-white w-full pt-3">
              <RedeemComment
                  productName={product?.name} 
                  showRedeem={showRedeem} 
                  product_redeem_price={product?.redeem_price} 
                  product_redeem_discount_rate_toFixed={product?.redeem_discount_rate?.toFixed(0)}
                  redeemProductIds={(JSON.parse(localStorage.getItem('REDEEM_PRODUCTS_IDS')) || []).length > 0 ? redeemProductIds.join(", ") : "None"}
                  isProductIdInRedeem={(JSON.parse(localStorage.getItem('REDEEM_PRODUCTS_IDS')) || []).includes(product.id) ? "True" : "False"}            
              />
                    <div class="row">
                        <div class="col-4">
                        <span class="bg-gray-100 text-accent h3 font-[600] text-2xl text-green-500">{product?.redeem_price_formatted}</span>
                        </div>
                    </div>
                    <div class="col-12">
                        <span class="text-accent font-[600] text-2xl text-accent text-green-500">
                          {TransClient("user.redeem_applied")}
                        </span>
                    </div>
                </div>}
            <div className="empty:hidden">
              <div className="max-w-full flex relative justify-start items-center">
                <div className="max-w-full flex items-center"></div>
              </div>
              <Sizes
                product={product}
                showToast={showToast}
                selectedSize={selectedSize}
                setSelectedSize={(selectedSize) =>
                  setSelectedSize(selectedSize)
                }
                setIsSizeRequired={(isSizeRequired) =>
                  setIsSizeRequired(isSizeRequired)
                }
                isShow={false}
              />
                <QTY
                  product={product}
                  selectedSize={selectedSize}
                  isSizeRequired={isSizeRequired}
                  qtyState={qtyState}
                  setQtyState={(qtyState) => setQtyState(qtyState)}
                />

              <div className="max-w-full flex relative justify-start items-center">
                <div className="max-w-full flex items-center">
                  {details && <HTMLRenderer htmlContent={product?.details} />}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ItemDetailCard;
