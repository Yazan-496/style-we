import ItemDetailCard from '../../card-modal/desktop/ItemDetailCard';
import React, { useEffect, useState } from 'react';
import HTMLRenderer from 'helpers/HTMLRenderer';
import Sizes from './Sizes';
import { useTranslation } from 'react-i18next';
import { SvgArrowLeft } from '../../svgs';
import Link from '../../../helpers/Link';

const ProductDetails = ({
  product,
  setSelectedSize,
  selectedSize,
  setIsSizeRequired,
  showToast,
}) => {
  const [offerPriceState, setOfferPriceState] = useState('');
  const [priceState, setPriceState] = useState('');
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
  useEffect(() => {
    if (product && selectedSize) {
      setOfferPriceState(selectedSize?.offer_price_formated);
      setPriceState(selectedSize?.price_formated);
    } else {
      setOfferPriceState(product?.offer_price_formatted);
      setPriceState(product?.price_formatted);
    }
  }, [product, selectedSize]);
  const { t, i18n } = useTranslation('translation');
  return (
    <div className="h-full">
      <div className="font-[#31353c] p-2 text-1xl  flex justify-between">
        <span>{product?.name}</span>
      </div>
      <div className="h-10 flex justify-between items-center">
        <div className="mr-auto flex justify-around items-center gap-x-2">
          <span
            className="ml-3 text-red-600  font-[600] text-2xl"
            id="custom-product-detail-price"
          >
            {offerPriceState}
          </span>{' '}
          <span className="text-black-600 line-camp-4 font-[600] text-1xl component__product-price-origin">
            {priceState}
          </span>
          {100 - parseInt((product?.offer_price * 100) / product?.price) >
            0 && (
            <div
              className={`relative top-0 style_discountTag__LG3NB_mobile z-5 ${getColor(
                product?.offer_price,
                product?.price
              )} `}
            >
              <span
                className={`style_discountTagInner__xrve6_mobile notranslate`}
              >
                -{100 - parseInt((product?.offer_price * 100) / product?.price)}{' '}
                %
              </span>
            </div>
          )}
        </div>
        <span className="components-ajax-quick-shop__price-origin config__origin-price notranslate" />

        <Link className="ml-auto relative left-0 view-detail" href={`/product/${product?.slug}`}>
            {t('main.detail')}
        </Link>
        <SvgArrowLeft rotate={180} />
      </div>
      {/*<HTMLRenderer htmlContent={product-details?.details} />*/}
      <Sizes
        product={product}
        showToast={showToast}
        selectedSize={selectedSize}
        setSelectedSize={(selectedSize) => setSelectedSize(selectedSize)}
        setIsSizeRequired={(isSizeRequired) =>
          setIsSizeRequired(isSizeRequired)
        }
      />
    </div>
  );
};
export default ProductDetails;
