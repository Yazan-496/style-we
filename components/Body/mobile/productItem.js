import Link from 'helpers/Link';
import { useDispatch, useSelector } from 'react-redux';
import { store } from 'store';
import React, { useEffect, useRef, useState } from 'react';
import CountFlashSale from './CountFlashSale';
import { HeartSVG } from '../../svgs';

export default function Product({
  product,
  setProduct,
  flashSale,
  setOpenCartModal,
}) {
  let loading = useSelector((store) => store.LanguageReducer.loading);
  const lang_code = store.getState().LanguageReducer.langCode;
  let [translations, setTranslations] = useState(
    store.getState().LanguageReducer.data[lang_code]
  );
  useEffect(() => {
    setTranslations(store.getState().LanguageReducer.data[lang_code]);
  }, [loading]);
  const dispatch = useDispatch();
  const handleClickCart = () => {
    setOpenCartModal(true);
    setProduct(product);
    dispatch({
      type: 'PRODUCT_CART',
      payload: {
        id: product.id,
      },
    });
  };
  const checkRef = useRef([]);
  const [check, setCheck] = useState(false);
  function setFavorite() {
    dispatch({
      type: 'FAVORITE_PRODUCT',
      payload: { id: product?.id, isFavorite: check },
    });
    setCheck(!check);
  }
  useEffect(() => {
    if (product?.is_favourite) {
      setCheck(true);
    }
  }, [product]);
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

  return (
    <div className="relative aspect-[1/1] flex flex-col items-center">
      <div
        onClick={() => setFavorite()}
        className="absolute top-2 right-2 p-2 z-[1] flex items-center justify-center bg-gray-100 rounded-full"
      >
        <HeartSVG check={check} />
        {/*<i className="iconfont icon-global_icon_wishlist_24_normal w-[30px] h-[30px] flex items-center justify-center" />*/}
        {/*<i className="iconfont icon-global_icon_wishlist_24_selected icon_is-collected" />*/}
      </div>
      {100 - parseInt((product?.offer_price * 100) / product?.price) > 0 && (
        <div
          className={`style_discountTag__LG3NB_mobile z-5 ${getColor(
            product?.offer_price,
            product?.price
          )} `}
        >
          <span className={`style_discountTagInner__xrve6_mobile notranslate`}>
            -{100 - parseInt((product?.offer_price * 100) / product?.price)} %
          </span>
        </div>
      )}
      <Link className=" h-full  w-full rounded-lg product-item" href={`/product/${product?.slug}`}>
        <div className="w-full h-full bg-[#ffff] object-cover">
          <img
            className={`object-contain w-full ${
              flashSale ? 'h-[90%]' : ' h-full'
            }`}
            alt={product?.name}
            src={product?.thumbnail || product?.image}
          />
          {flashSale && (
            <div className="product-item object-cover h-[10%]">
              <CountFlashSale pro={product} />
            </div>
          )}
        </div>
      </Link>
      <div className=" p-3 flex flex-row w-full text-center items-center justify-center">
        <Link href={`/product/${product?.slug}`}>
            <div className="w-full text-center">
              <div className="flex flex-wrap component__product-price notranslate product-item with-origin">
                <div className="text-gray-500 w-full text-center text-sm grid gap-1">
                  <div className="line-clamp-2">{product?.name}</div>
                </div>
                <div className="w-full component__product-price-special">
                  <span
                    className="component__product-price-number"
                    id="custom-product-item-price"
                  >
                    {product?.offer_price_formatted}
                  </span>
                </div>
                <div className="flex justify-center w-full">
                  <div className="truncate component__product-price-origin config__origin-price">
                    {product?.price_formatted}
                  </div>
                </div>
              </div>
            </div>
        </Link>
        <div onClick={handleClickCart} className=" component__product-cart">
          <i className="iconfont icon-c_icon_addcart" />
        </div>
      </div>
    </div>
  );
}
