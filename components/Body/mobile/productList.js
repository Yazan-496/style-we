import TimeRem from "./timeRemaining";
import Link from "helpers/Link";
import { useSelector } from "react-redux";
import { store } from "store";
import { useEffect, useState } from "react";
import AddToCardModal from "../../card-modal/desktop";
export default function ProductList({ products }) {
  let loading = useSelector((store) => store.LanguageReducer.loading);
  const lang_code = store.getState().LanguageReducer.langCode;
  let [translations, setTranslations] = useState(
    store.getState().LanguageReducer.data[lang_code]
  );
  const [openModal, setOpenModal] = useState(false);
  const [productModal, setProductModal] = useState({});
  useEffect(() => {
    setTranslations(store.getState().LanguageReducer.data[lang_code]);
  }, [loading]);
  return (
    <div className="product-list flex flex-wrap ml-[-12px] mr-[-12px]">
      {products.map((product, index) => (
        <div
          key={index}
          className="px-[12px] mb-[24px]"
          style={{ width: "25%" }}
        >
          <div className="product-item w-full h-full flex flex-col justify-start items-start cursor-pointer hover:shadow-[0px_2px_12px_rgba(0,0,0,0.2)]">
            <div className="w-full h-0 pb-[133%] bg-[#ebebeb] relative overflow-hidden image-box--wrapper">
              <div className="group w-full h-full absolute">
                <Link className="block relative top-1/2 -translate-y-1/2 group"
                    style={{ paddingTop: "133.33%" }} href={`/product/${product.name}`}>
                    <div className="group">
                      <div className="jsx-3354076850 group-hover:hidden">
                        <span className="dsgyfudgsfsj">
                          <img
                            alt="Plain Loose Stand Collar Short sleeve Urban Mid-long Shirt"
                            src={
                              product.photos.filter(
                                (photo) => photo.type === "main"
                              )[0]?.src
                            }
                            decoding="async"
                            data-nimg="fill"
                            className="fdygswww"
                          />
                        </span>
                      </div>
                      <div className="jsx-3354076850 hidden group-hover:flex">
                        <span className="dsgyfudgsfsj">
                          <img
                            alt="Shirt Collar Polka Dots Casual Regular Fit Blouse"
                            src={
                              product.photos.filter(
                                (photo) => photo.type === "second"
                              )[0]?.src
                            }
                            decoding="async"
                            data-nimg="fill"
                            className="fdygswww"
                          />
                        </span>
                      </div>
                    </div>
                </Link>
                <div className="absolute w-full left-0 bottom-0 flex h-8 bg-black/50">
                  <div className="w-full flex justify-center items-center flex-grow-0 flex-shrink-0 relative px-2">
                    <div className="flex items-center gap-0.5 truncate mr-[10px]">
                      <span className="w-4">
                        <svg
                          width="19"
                          height="18"
                          viewBox="0 0 19 18"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <circle
                            cx="9.20239"
                            cy="9"
                            r="9"
                            fill="#F3C730"
                          ></circle>
                          <path
                            d="M12.26 4H8.1184C8.03723 4 7.96411 4.04906 7.93333 4.12417L5.31541 10.5136C5.26149 10.6452 5.35827 10.7895 5.50047 10.7895H8.52995C8.665 10.7895 8.76123 10.9206 8.72076 11.0494L7.44466 15.1128C7.38012 15.3183 7.64145 15.4666 7.78478 15.3058L13.9055 8.43833C14.0204 8.30941 13.9289 8.10526 13.7562 8.10526H11.0721C10.9278 8.10526 10.831 7.95711 10.8889 7.82495L12.4431 4.28031C12.5011 4.14816 12.4043 4 12.26 4Z"
                            fill="#222222"
                          ></path>
                        </svg>
                      </span>
                      <span className=" text-[14px] leading-4 text-[#FFD54D] truncate"></span>
                    </div>
                    <p className="flex-grow-0 flex-shrink-0 text-sm text-left text-white font-bold">
                      <span className="notranslate">
                        <TimeRem time={product.descountRemaining} />
                      </span>
                    </p>
                  </div>
                </div>
                {product.hasDiscount ? (
                  <div className="absolute left-0 top-3 px-1 py-[2px] bg-red-600 flex items-center justify-center">
                    <span className="text-base leading-[19px] text-white notranslate">
                      {product.percent_discount}
                    </span>
                  </div>
                ) : (
                  <></>
                )}
                <div
                  onClick={() => {
                    setOpenModal(true);
                    setProductModal(product);
                  }}
                  className="hidden group-hover:flex items-center justify-center h-[56px] w-auto lg:min-w-[191px] 2xl:min-w-[220px] max-w-[calc(100%-24px)] px-3 absolute left-1/2 -translate-x-1/2 bottom-[46px] cursor-pointer rounded-[50px] bg-white/90 undefined"
                  style={{ minWidth: "178px" }}
                >
                  <p className="text-center text-base leading-4 text-black whitespace-normal 2xl:whitespace-nowrap">
                    {translations.main.add_to_pag}
                  </p>
                </div>
              </div>
            </div>
            <div className="flex w-full flex-col justify-start items-start self-stretch flex-1 gap-1.5 bg-white py-1.5 px-1">
              <div className="w-full flex items-center">
                <Link title={product.name}
                    className="flex flex-1 overflow-hidden" href={`/product/${product.name}`}>
                  <h3 className="flex-1 text-left text-sm cm-goods-list-title truncate">
                    {product.name}
                  </h3>
                </Link>
              </div>
              <div className="flex flex-wrap justify-start items-center flex-grow-0 flex-shrink-0 relative gap-2">
                <span className="flex items-center cm-list-price notranslate cm-list-price-activity">
                  {product.hasDiscount ? product.price_after : product.price}
                </span>
                {product.hasDiscount ? (
                  <span className="flex items-center text-[14px] leading-5 text-left font-normal text-[#868C93] line-through notranslate">
                    {product.price}
                  </span>
                ) : (
                  <></>
                )}
              </div>
            </div>
          </div>
        </div>
      ))}
      {
        <AddToCardModal
          show={openModal}
          onClose={() => setOpenModal(false)}
          close={openModal}
          product={productModal}
        />
      }
    </div>
  );
}
