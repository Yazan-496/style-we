import Link from "helpers/Link";
import { useDispatch, useSelector } from "react-redux";
import { store } from "store";
import React, { useEffect, useRef, useState } from "react";
import AddToCardModal from "../../card-modal/desktop";
import CountFlashSale from "./CountFlashSale";
import { HeartSVG } from "../../svgs";
import { useTranslation } from "react-i18next";

export default function Product({ product, flashSale }) {
  let loading = useSelector((store) => store.LanguageReducer.loading);
  const AddOrRemoveHeart = useSelector(
    (store) => store.ProductReducer.AddOrRemoveHeart
  );
  const lang_code = store.getState().LanguageReducer.langCode;
  const [openModal, setOpenModal] = useState(false);
  const [timers, setTimers] = useState({});
  let [translations, setTranslations] = useState(
    store.getState().LanguageReducer.data[lang_code]
  );
  const dispatch = useDispatch();
  useEffect(() => {
    setTranslations(store.getState().LanguageReducer.data[lang_code]);
  }, [loading]);

  const handleClickCart = () => {
    setOpenModal(true);
    dispatch({
      type: "PRODUCT_CART",
      payload: {
        id: product.id,
      },
    });
  };

  const [check, setCheck] = useState(product?.is_favourite);
  function setFavorite() {
    dispatch({
      type: "FAVORITE_PRODUCT",
      payload: { id: product?.id, isFavorite: check },
    });
    setCheck(!check);
  }
  useEffect(() => {
    if (product?.is_favourite) {
      setCheck(true);
    }
  }, [product]);
  useEffect(() => {
    // if (
    //   AddOrRemoveHeart?.filter((HeartedProduct) => {
    //     return HeartedProduct === product-details?.id;
    //   })?.length > 0
    // ) {
    //   setCheck(true);
    // } else {
    //   // if (product-details?.is_favourite) {
    //   setCheck(false);
    //   // }
    // }
  }, [AddOrRemoveHeart]);

  function getColor(offer_price, price) {
    const num =  100 - parseInt((offer_price * 100) / price);
    switch (true) {
      case 0 < num && num < 39:
        return "bg-green-600";
      case 38 < num && num < 74:
        return "bg-yellow-400";
      case 73 < num && num < 89:
        return "bg-orange-600";
      case 88 < num && num < 101:
        return "bg-red-600";
      default:
        return "";
    }
  }

  const { t, i18n } = useTranslation("translation");
  return (
    <span
      style={{
        minHeight: "70%",
        maxHeight: "70%",
      }}
    >
      <div className="group product-item w-full h-full flex flex-col justify-start items-start cursor-pointer hover:shadow-[0px_2px_12px_rgba(0,0,0,0.2)]">
        <div className="group w-full h-0 pb-[100%] bg-[#ebebeb] relative overflow-hidden image-box--wrapper">
          <div
            onClick={() => setFavorite()}
            className="absolute top-2 right-2 p-2 z-[1] flex items-center justify-center bg-gray-100 rounded-full"
          >
            <HeartSVG check={check} />
          </div>
          {100 - parseInt((product?.offer_price * 100) / product?.price )> 0 && (
            <div
              className={`style_discountTag__LG3NB z-10 ${getColor(
                product?.offer_price,
                product?.price
              )} `}
            >
              <span className={`style_discountTagInner__xrve6 notranslate`}>
                -{100 - parseInt((product?.offer_price * 100) / product?.price)} %
              </span>
            </div>
          )}

          <div className="object-contain w-full h-full bg-[#fff] flex items-center justify-center w-full h-full absolute group">
            <Link className="flex items-center justify-center object-contain w-full h-full block relative" href={`/product/${product?.slug}`}>
                <div className="group card">
                  <img
                    src={product?.thumbnail}
                    alt={product?.name}
                    className="object-contain w-full h-full"
                  />
                  <img
                    alt={product?.name}
                    src={
                      product?.images?.length > 0
                        ? product?.images[1]
                        : product?.thumbnail
                    }
                    className="object-contain w-full h-full opacity-0 hover:opacity-1 absolute top-0"
                  />
                </div>
            </Link>
            {flashSale && <CountFlashSale pro={product} />}
            {/*<div className="absolute left-0 top-3 px-1 py-[2px] bg-red-600 flex items-center justify-center">*/}
            {/*  <span className="text-base leading-[19px] text-white notranslate">*/}
            {/*    /!*{product-details.details}*!/*/}
            {/*  </span>*/}
            {/*</div>*/}
            <div
              onClick={handleClickCart}
              className="top-[60%] hidden group-hover:flex items-center justify-center h-[56px] w-auto lg:min-w-[191px] 2xl:min-w-[220px] max-w-[calc(100%-24px)] px-3 absolute left-1/2 -translate-x-1/2 cursor-pointer rounded-[50px] bg-[#ebebeb] undefined"
              style={{ minWidth: "118px", height: "40px" }}
            >
              <p className="text-center text-base leading-4 text-black whitespace-normal 2xl:whitespace-nowrap">
                {t("main.add_to_pag")}
              </p>
            </div>
          </div>
        </div>
        <div className="flex w-full flex-col justify-start items-start self-stretch flex-1 gap-1.5 bg-white py-1.5 px-1">
          <div className="w-full flex items-center">
            <Link title={product?.name} className="flex flex-1 overflow-hidden" href={`/product/${product?.name}`}>
              <h3 className="flex-1 text-left text-sm cm-goods-list-title truncate">
                {product?.name}
              </h3>
            </Link>
          </div>
          <div className="flex flex-col w-full  justify-center items-center flex-grow-0 flex-shrink-0 relative gap-2">
            <span className="flex items-center text-xl cm-list-price notranslate cm-list-price-activity">
              {product?.offer_price_formatted}
            </span>
            <span className="flex items-center text-[14px] leading-5 text-left font-normal text-[#868C93] line-through notranslate">
              {product?.price_formatted}
            </span>
          </div>
          <div className="max-w-full flex relative justify-start items-center"></div>
        </div>
      </div>
      {
        <AddToCardModal
          show={openModal}
          onClose={() => {
            setOpenModal(false);
            dispatch({
              type: "REMOVE_PRODUCT_CART",
              payload: null,
            });
          }}
          close={openModal}
          product={product}
        />
      }
    </span>
  );
}
