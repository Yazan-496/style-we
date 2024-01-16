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
      className="product__item"
      data-handle="women-casual-summer-face-loose-jersey-sleeveless-crew-neck-h-line-medium-elasticity-shirts-15158060"
      data-sku-id={3745315}
      data-product-id={15158060}
    >
      <div
        className="component__product"
        data-default-img="catalog/product/2023-03/22/479f4e10ac81720bd230077eacbc65e0.jpg"
      >
        <div className="component__product-main" style={{ height: "auto" }}>
          <div
            className="component__product-picture-wrapper"
            style={{ paddingTop: "calc(133.33333% - 3px)" }}
            data-spu-inventory={1}
          >
            <img
              className="component__product-picture"
              src={product.image}
              alt="Sleeveless Crew Neck Casual Face Loose Shirt"
            />
            <div className="component-tag">
              <div
                className="component-tag-discount notranslate config__discount-tag"
                style={{ display: "block" }}
              >
                <span className="component-tag-text">{product.offer}</span>
              </div>
            </div>
            <div
              className="component__product-sold-out"
              style={{ display: "none" }}
            >
              <div className="component__product-sold-out-inner">Sold Out</div>
            </div>
          </div>
          <input
            className="data-save"
            type="hidden"
            data-value="%7B%22skus%22%3A%5B%7B%22compare_at_price%22%3A%7B%22price%22%3A%22%240%22%2C%22price_value%22%3A0%2C%22value%22%3A%220%22%2C%22code%22%3A%22USD%22%2C%22rate%22%3A1%7D%2C%22grams%22%3A385%2C%22id%22%3A3745315%2C%22handle%22%3A%22women-casual-summer-face-loose-jersey-sleeveless-crew-neck-h-line-medium-elasticity-shirts-15158060%22%2C%22activities%22%3A%7B%22top%22%3A%5B%22limit_discount%22%5D%2C%22map%22%3A%5B%7B%22limit_discount%22%3A114%7D%2C%7B%22buy_gift%22%3A30%7D%5D%2C%22bottom%22%3A%5B%22buy_gift%22%5D%7D%2C%22activity_type_name%22%3A%22limit_discount%22%2C%22image%22%3A%22catalog%5C%2Fproduct%5C%2F2023-03%5C%2F22%5C%2F479f4e10ac81720bd230077eacbc65e0.jpg%22%2C%22is_activity_price%22%3A1%2C%22list_tag%22%3A1%2C%22special_price%22%3A%22%2426.15%22%2C%22special_price_value%22%3A26.15%2C%22origin_price%22%3A%22%2429.99%22%2C%22origin_price_value%22%3A29.99%2C%22inventory%22%3A497%2C%22feed_id%22%3A3745315%2C%22price%22%3A%7B%22price%22%3A%22%2429.99%22%2C%22price_value%22%3A29.99%2C%22value%22%3A%2229.99%22%2C%22code%22%3A%22USD%22%2C%22rate%22%3A1%7D%2C%22product_id%22%3A15158060%2C%22product_image_id%22%3A2012205%2C%22sku%22%3A%22SH3M1E27FA8E%22%2C%22sold_status%22%3A0%2C%22status%22%3A1%2C%22sort%22%3A6%2C%22remaining_inventory%22%3A0%2C%22sale%22%3A%7B%22price%22%3A%7B%22price%22%3A%22%2426.15%22%2C%22price_value%22%3A26.15%2C%22value%22%3A%2226.15%22%2C%22code%22%3A%22USD%22%2C%22rate%22%3A1%7D%2C%22module%22%3A%22limit_discount%22%2C%22activity_type%22%3A6%2C%22activity_id%22%3A114%7D%2C%22flash_sale_sku%22%3A%5B%5D%2C%22options%22%3A%5B%7B%22size_sort%22%3A0%2C%22name%22%3A%22Color%22%2C%22supplier_spec%22%3A%22%22%2C%22id%22%3A5%2C%22value_id%22%3A58%2C%22value_name%22%3A%22White%22%2C%22key%22%3A%22Color%22%2C%22country_value_names%22%3Anull%7D%2C%7B%22size_sort%22%3A0%2C%22name%22%3A%22Size%22%2C%22supplier_spec%22%3A%22%22%2C%22id%22%3A11%2C%22value_id%22%3A55%2C%22value_name%22%3A%22XS%22%2C%22key%22%3A%22Size%22%2C%22country_value_names%22%3A%7B%22US%22%3A%22XS%282-4%29%22%2C%22UK%22%3A%22XS%286-8%29%22%2C%22EUR%22%3A%22XS%2834-36%29%22%2C%22AU%22%3A%22XS%286-8%29%22%7D%7D%5D%7D%5D%2C%22price%22%3A%7B%22price%22%3A%22%2429.99%22%2C%22price_value%22%3A29.99%2C%22value%22%3A%2229.99%22%2C%22code%22%3A%22USD%22%2C%22rate%22%3A1%7D%7D"
            data-index={0}
          />
          <div
            className="component__product-collect "
            data-product-id={15158060}
            data-wish-trigger=""
            data-collect-impression='{"event_id":"save_to_wishlist","page_module":"collection","product":15158060,"sku":"SH3M1E27FA8E","category":["Tops","Blouses and Shirts"],"original_price":29.99,"price":26.15,"rank":1,"page_module_title":"","goodlist_type":1,"page_module_title_new":"CLOTHING","collection_id":5766,"alg_id":""}'
          >
            <div className="component__product-collect-icon-wrap">
              <i className="iconfont icon-global_icon_wishlist_24_normal" />
              <i className="iconfont icon-global_icon_wishlist_24_selected icon_is-collected" />
            </div>
          </div>
        </div>
        <div className="component__product-info">
          <div className="component__product-price-cart">
            <div
              className="component__product-price notranslate product-item with-origin"
              data-collect-impression='{"event_id":"product","page_module":"collection","product":15158060,"sku":"SH3M1E27FA8E","category":["Tops","Blouses and Shirts"],"original_price":29.99,"price":26.15,"rank":1,"name":"Sleeveless Crew Neck Casual Face Loose Shirt","image_id":2012205,"image_path":"catalog\/product\/2023-03\/22\/479f4e10ac81720bd230077eacbc65e0.jpg","goodlist_type":1,"page_module_title_new":"CLOTHING","collection_id":5766,"trans_data":"CiRmMTllZjEyNC1iOTA1LTQ1NzYtYTQyYi05ZjkzMWY5ZmFjMzQSIQoYaXBzX3RhYl9yZWNlbnRfaG90X2V4cG9zFQAAAAAYDhIXCg52aWtpbmdfY3RyX3RhYhXaa4lBGAoSIAoXaXBzX3RhYl9yZWNlbnRfaG90X2NvbnMVAAAAABgMEhMKCnZpa2luZ19jdHIVCE2SQBgCGgoKA2N0ch3Bj7o8GgoKA2N2ch0\/agI8GgwKBWJvb3N0HQAAgD8aDgoHb3JpX2Nvch0AAAA\/IhE1MDMyMjE2MSw1MDMyMjE2MirCAyHAzNeqS8LfG3qbA3sidGFiX2lkIjoiNTc2NiIsImZpbHRlciI6IntcImxvZ2ljXCI6XCJhbmRcIixcInJ1bGVzXCI6W3tcImZpZWxkXCI6XCJjYXRlZ29yaWVzX2lkXCIsXCJvcFwiOlwibm90X2luXCIsXCJ2YWx1ZVwiOltcIjlcIixcIjEwXCJdfSx7XCJmaWVsZFwiOlwidGFnc19pZFwiLFwib3BcIjpcIm5vdF9pblwiLFwidmFsdWVcIjpbXCIxMDQ0ODRcIixcIjE3ODQzOFwiLFwiMTY0Mjc5XCIsXCIxODA5NTVcIl19XX0iLCJzcG1fMjMiOiJwYWdlX2NhdGVnb3J5X3Byb2R1Y3RfbGlzdCQjIyRjb2xsZWN0aW9uIiwic2l0ZV9pZCI6IjEiLCJzaXRlIjoiU3R5bGVXZSIsImFiX3ZlcnNpb24iOiI1MDMyMjE2MSw1MDMyMjE2MiIsInNwbSI6InBhZ2VfY2F0ZWdvcnlfcHJvZHVjdF9saXN0JCMjJGNvbGxlY3Rpb24iLCJwYWdlX251bSI6IjEifbABAMoBFTFmdG91bWJ6NmMuMTY4NDQyNjYwNQ==","req_id":"f19ef124-b905-4576-a42b-9f931f9fac34","item_list_id":5766,"item_list_name":"CLOTHING","is_adp":0}'
            >
              <div className="component__product-price-special">
                <span
                  className="component__product-price-currency"
                  id="custom-product-item-activity-price"
                />
                <span
                  className="component__product-price-number"
                  id="custom-product-item-price"
                >
                  {product.price}
                </span>
              </div>
              <div className="component__product-price-origin config__origin-price">
                {product.price}
              </div>
              <span
                className="no-origin-price bury-point"
                data-statis-exposure='{"ec":"product","mcmt":"collectionList","ilpi1id":15158060,"ilpi1sku":"SH3M1E27FA8E","ilpi1va":["White","XS"],"ilpi1ps":1,"ilpi1ca":["Tops","Blouses and Shirts"],"ilpi1opr":"","ilpi1pr":26.15,"c_byte":"","c_tid":"","c_tablevel":"","aid":null}'
              ></span>
              <span
                className="has-origin-price bury-point"
                data-statis-exposure='{"ec":"product","mcmt":"collectionList","ilpi1id":15158060,"ilpi1sku":"SH3M1E27FA8E","ilpi1va":["White","XS"],"ilpi1ps":1,"ilpi1ca":["Tops","Blouses and Shirts"],"ilpi1opr":29.99,"ilpi1pr":26.15,"c_byte":"","c_tid":"","c_tablevel":"","aid":null}'
              ></span>
            </div>
            <div
              className="component__product-cart"
              data-activity-id=""
              data-zero-user-range=""
              data-handle="women-casual-summer-face-loose-jersey-sleeveless-crew-neck-h-line-medium-elasticity-shirts-15158060"
              data-sku-id={3745315}
              style={{ display: "block" }}
              data-activity-map='[{"limit_discount":114},{"buy_gift":30}]'
            >
              <i className="iconfont icon-c_icon_addcart" />
            </div>
          </div>
          <div className="component-label component__product-activity" id="">
            <span
              className="component-label-item  with_icon "
              data-save='{"icon":"icon-discount_icon_old","label":"Limited Offer","activity":"limit_discount"}'
              data-statis=""
              data-collect=""
            >
              <i className="iconfont icon-discount_icon_old" />
              <span className="divide divide-vertical-line" style={{}} />
              <span className="component-label-item-label-text">
                Limited Offer
              </span>
            </span>
          </div>
        </div>
      </div>
    </div>

    // <div
    //   key={key}
    //   data-product-details-id={product-details.id}
    //   className="button-next-hover w-[calc((100%-3rem)/3)] cm-md:w-[calc((100%-4.5rem)/4)] cm-lg:w-[calc((100%-6rem)/5)]">
    //   <div className="product-details-item w-full h-full flex flex-col justify-start items-start cursor-pointer hover:shadow-[0px_2px_12px_rgba(0,0,0,0.2)]">
    //     <div className=" w-full h-0 pb-[133%] bg-[#ebebeb] relative overflow-hidden image-box--wrapper">
    //       <div className="w-full h-full absolute">
    //         <a
    //           className="block relative top-1/2 -translate-y-1/2"
    //           // href={product-details.link}
    //           style={{ paddingTop: "133.33%" }}>
    //           <div className="group-hover:flex">
    //             <div className={`jsx-${product-details.id}`}>
    //               <span
    //                 style={{
    //                   boxSizing: "border-box",
    //                   display: "block",
    //                   overflow: "hidden",
    //                   width: "initial",
    //                   height: "initial",
    //                   background: "none",
    //                   opacity: 1,
    //                   border: 0,
    //                   margin: 0,
    //                   padding: 0,
    //                   position: "absolute",
    //                   inset: 0,
    //                 }}>
    //                 <img
    //                   className="image-hover image-not-hover "
    //                   alt="Faux Denim Shirt Collar Casual Loose Denim Dress"
    //                   src={product-details.image}
    //                   decoding="async"
    //                   data-nimg="fill"
    //                   style={{
    //                     position: "absolute",
    //                     inset: 0,
    //                     boxSizing: "border-box",
    //                     border: "none",
    //                     display: "block",
    //                     width: 0,
    //                     height: 0,
    //                     minWidth: "100%",
    //                     maxWidth: "100%",
    //                     minHeight: "100%",
    //                     maxHeight: "100%",
    //                     objectFit: "cover",
    //                   }}
    //                 />
    //               </span>
    //             </div>

    //             <div
    //               onClick={() => {
    //                 setOpenModal(true);
    //                 setProductModal(product-details);
    //               }}
    //               className="button-addcart-hover mb-[78px] items-center justify-center h-[56px] w-auto lg:min-w-[191px] 2xl:min-w-[220px] max-w-[calc(100%-24px)] px-3 absolute left-1/2 -translate-x-1/2 bottom-[46px] cursor-pointer rounded-[50px] bg-white/90 undefined"
    //               style={{ minWidth: "178px" }}>
    //               <p className="mt-[20px] text-center text-base leading-4 text-black whitespace-normal 2xl:whitespace-nowrap">
    //                 {translations?.main.add_to_pag}
    //               </p>
    //             </div>
    //           </div>
    //         </a>
    //       </div>
    //     </div>
    //     <div className="flex w-full flex-col justify-start items-start self-stretch flex-1 gap-1.5 bg-white py-1.5 px-1">
    //       <div className="w-full flex items-center">
    //         {/*<a*/}
    //         {/*  title={product-details.title}*/}
    //         {/*  className="flex flex-1 overflow-hidden"*/}
    //         {/*  href={product-details.link}*/}
    //         {/*>*/}
    //         {/*  <h3 className="flex-1 text-left text-sm cm-goods-list-title truncate">*/}
    //         {/*    {product-details.title}*/}
    //         {/*  </h3>*/}
    //         {/*</a>*/}
    //       </div>
    //       <div className="flex flex-wrap justify-start items-center flex-grow-0 flex-shrink-0 relative gap-2">
    //         <span className="flex items-center cm-list-price notranslate cm-list-price">
    //           {product-details.price}
    //         </span>
    //         <span className="flex items-center text-[14px] leading-5 text-left font-normal text-[#868C93] line-through notranslate" />
    //       </div>
    //       <div className="max-w-full flex relative justify-start items-center">
    //         <div className="max-w-full flex items-center">
    //           <strong
    //             title={product-details.offer}
    //             className="flex-grow-0 flex-shrink-0 px-1 rounded-sm text-[#DC2626] bg-[#FEF2F2] font-normal  inline-block !font-[Helvetica] max-w-full text-xs h-4 truncate">
    //             {product-details.offer}
    //           </strong>
    //         </div>
    //       </div>
    //     </div>
    //   </div>
    //   {
    //     <AddToCardModal
    //       show={openModal}
    //       onClose={() => setOpenModal(false)}
    //       close={openModal}
    //       product-details={productModal}
    //     />
    //   }
    // </div>
  );
};
export default ProductComponent;
