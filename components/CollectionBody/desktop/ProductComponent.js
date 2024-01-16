import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { store } from "store";
import AddToCardModal from "../../card-modal/desktop";

const ProductComponent = ({ product, key }) => {
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
    <div
      key={key}
      data-product-id={product.id}
      className="button-next-hover w-[calc((100%-3rem)/3)] cm-md:w-[calc((100%-4.5rem)/4)] cm-lg:w-[calc((100%-6rem)/5)]"
    >
      <div className="product-item w-full h-full flex flex-col justify-start items-start cursor-pointer hover:shadow-[0px_2px_12px_rgba(0,0,0,0.2)]">
        <div className=" w-full h-0 pb-[133%] bg-[#ebebeb] relative overflow-hidden image-box--wrapper">
          <div className="w-full h-full absolute">
            <a
              className="block relative top-1/2 -translate-y-1/2"
              // href={product-details.link}
              style={{ paddingTop: "133.33%" }}
            >
              <div className="group-hover:flex">
                <div className={`jsx-${product.id}`}>
                  <span
                    style={{
                      boxSizing: "border-box",
                      display: "block",
                      overflow: "hidden",
                      width: "initial",
                      height: "initial",
                      background: "none",
                      opacity: 1,
                      border: 0,
                      margin: 0,
                      padding: 0,
                      position: "absolute",
                      inset: 0,
                    }}
                  >
                    <img
                      className="image-hover image-not-hover "
                      alt="Faux Denim Shirt Collar Casual Loose Denim Dress"
                      src={product.image}
                      decoding="async"
                      data-nimg="fill"
                      style={{
                        position: "absolute",
                        inset: 0,
                        boxSizing: "border-box",
                        border: "none",
                        display: "block",
                        width: 0,
                        height: 0,
                        minWidth: "100%",
                        maxWidth: "100%",
                        minHeight: "100%",
                        maxHeight: "100%",
                        objectFit: "cover",
                      }}
                    />
                  </span>
                </div>

                <div
                  onClick={() => {
                    setOpenModal(true);
                    setProductModal(product);
                  }}
                  className="button-addcart-hover mb-[78px] items-center justify-center h-[56px] w-auto lg:min-w-[191px] 2xl:min-w-[220px] max-w-[calc(100%-24px)] px-3 absolute left-1/2 -translate-x-1/2 bottom-[46px] cursor-pointer rounded-[50px] bg-white/90 undefined"
                  style={{ minWidth: "178px" }}
                >
                  <p className="mt-[20px] text-center text-base leading-4 text-black whitespace-normal 2xl:whitespace-nowrap">
                    {translations?.main.add_to_pag}
                  </p>
                </div>
              </div>
            </a>
          </div>
        </div>
        <div className="flex w-full flex-col justify-start items-start self-stretch flex-1 gap-1.5 bg-white py-1.5 px-1">
          <div className="w-full flex items-center">
            {/*<a*/}
            {/*  title={product-details.title}*/}
            {/*  className="flex flex-1 overflow-hidden"*/}
            {/*  href={product-details.link}*/}
            {/*>*/}
            {/*  <h3 className="flex-1 text-left text-sm cm-goods-list-title truncate">*/}
            {/*    {product-details.title}*/}
            {/*  </h3>*/}
            {/*</a>*/}
          </div>
          <div className="flex flex-wrap justify-start items-center flex-grow-0 flex-shrink-0 relative gap-2">
            <span className="flex items-center cm-list-price notranslate cm-list-price">
              {product.price}
            </span>
            <span className="flex items-center text-[14px] leading-5 text-left font-normal text-[#868C93] line-through notranslate" />
          </div>
          <div className="max-w-full flex relative justify-start items-center">
            <div className="max-w-full flex items-center">
              <strong
                title={product.offer}
                className="flex-grow-0 flex-shrink-0 px-1 rounded-sm text-[#DC2626] bg-[#FEF2F2] font-normal  inline-block !font-[Helvetica] max-w-full text-xs h-4 truncate"
              >
                {product.offer}
              </strong>
            </div>
          </div>
        </div>
      </div>
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
};
export default ProductComponent;
