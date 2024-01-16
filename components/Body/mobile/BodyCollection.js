import React from "react";
import { useTranslation } from "react-i18next";

const BodyCollection = () => {
  const { t, i18n } = useTranslation("translation");
  return (
    <>
      <div className="page-identity-collection collection filter-type-v0">
        <div className="title-number-wrapper">
          <span className="title">Best Sellers</span>
          <span className="number">
            <span id="collection-product-total-number"> 807 </span> Products
          </span>
        </div>

        <div
          id="collection-header"
          className="header-v-2 components-nav-bar__fix-top--filter"
          style={{ top: 44 }}
        >
          <div className="component__classify">
            <div
              className="swiper-container swiper-container-initialized swiper-container-horizontal swiper-container-free-mode"
              id="component-classify"
            >
              <div className="swiper-wrapper">
                <div className="swiper-slide swiper-slide-active">
                  <div className="component__classify-inner">
                    <div className="component__classify-wrapper">
                      <a
                        className="component__classify-item"
                        href="/collections/ss-2021-67472"
                      >
                        Hot Sale
                      </a>
                    </div>
                  </div>
                </div>
                <div className="swiper-slide swiper-slide-next">
                  <div className="component__classify-inner">
                    <div className="component__classify-wrapper">
                      <a
                        className="component__classify-item"
                        href="/collections/what‘s-new"
                      >
                        New In
                      </a>
                    </div>
                  </div>
                </div>
                <div className="swiper-slide">
                  <div className="component__classify-inner">
                    <div className="component__classify-wrapper">
                      <a
                        className="component__classify-item"
                        href="/collections/outerwear-67285"
                      >
                        Outerwear
                      </a>
                    </div>
                  </div>
                </div>
                <div className="swiper-slide">
                  <div className="component__classify-inner">
                    <div className="component__classify-wrapper">
                      <a
                        className="component__classify-item"
                        href="/collections/dresses-67263"
                      >
                        Dresses
                      </a>
                    </div>
                  </div>
                </div>
                <div className="swiper-slide">
                  <div className="component__classify-inner">
                    <div className="component__classify-wrapper">
                      <a
                        className="component__classify-item"
                        href="/collections/tops-67270"
                      >
                        Tops
                      </a>
                    </div>
                  </div>
                </div>
                <div className="swiper-slide">
                  <div className="component__classify-inner">
                    <div className="component__classify-wrapper">
                      <a
                        className="component__classify-item"
                        href="/collections/bottoms-67286"
                      >
                        Bottoms
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              <span
                className="swiper-notification"
                aria-live="assertive"
                aria-atomic="true"
              />
            </div>
          </div>
          <div id="component-sorter" className="component__sorter ">
            <div className="component__sorter-inner">
              <div className="left-box">
                <button
                  className="component__sorter-btn"
                  data-sort-data='{"id":"new","text":"New","has_arrow":false,"sort_up":"","sort_down":"-released_at"}'
                >
                  <div className="component__sorter-btn-inner">New</div>
                </button>
                <button
                  className="component__sorter-btn"
                  data-sort-data='{"id":"bestSale","text":"Best Sale","has_arrow":false,"sort_up":"","sort_down":"-statistic.month_sold"}'
                >
                  <div className="component__sorter-btn-inner">Best Sale</div>
                </button>
                <button
                  className="component__sorter-btn has-arrow"
                  data-sort-data='{"id":"price","text":"Price-1","has_arrow":true,"sort_up":"+price","sort_down":"-price"}'
                >
                  <div className="component__sorter-btn-inner">Price</div>
                  <div className="component__sorter-btn-updown">
                    <i className="up iconfont icon-c_icon_up_nor" />
                    <i className="down iconfont icon-c_icon_up_nor" />
                  </div>
                </button>
              </div>
              <div className="hr" />
              <button
                className="component__filter-btn"
                data-statis-click='{"ec":"filter"}'
                data-collect-click='{"event_id":"btn_filter","third_category":8017}'
              >
                <div className="component__filter-btn-inner">
                  {" "}
                  {t("user.filter")}
                </div>
                <i className="iconfont icon-c_icon_filter_sel" />
                <span className="count notranslate" />
              </button>
            </div>
          </div>
        </div>
        <div className="collection__list-wrapper product__list-wrapper">
          <div
            className="collection__list product__list"
            id="collection-masonry"
          >
            <span
              data-pagination='{"total":283,"count":20,"per_page":20,"current_page":1,"total_pages":15,"start":null,"end":null}'
              style={{ display: "none" }}
            />
            <div
              className="product__item"
              data-handle="geometric-casual-summer-polyester-no-elasticity-daily-cap-sleeve-crew-neck-x-line-shirts-for-women-15316312"
              data-sku-id={3686043}
              data-product-id={15316312}
            >
              <div
                className="component__product"
                data-default-img="catalog/product/2023-04/21/b3b4e1946ccc670fb4f66509fb76aafd.jpg"
              >
                <div
                  className="component__product-main"
                  style={{ height: "auto" }}
                >
                  <div
                    className="component__product-picture-wrapper"
                    style={{ paddingTop: "calc(133.33333% - 3px)" }}
                    data-spu-inventory={1}
                  >
                    <img
                      className="component__product-picture"
                      src="/image_cache/resize/340x452/image/catalog/activity/b3b4e1946ccc670fb4f66509fb76aafd.jpg"
                      alt="Crew Neck Geometric Casual Regular Fit Shirt"
                    />
                    {/* <Image
                      className="media-wrap image-wrap"
                      src="/image/catalog/activity/dMOf3EPxXA1648612410.jpg"
                      alt="3"
                      width="500"
                      height="500"
                    /> */}
                    <div className="component-tag">
                      <div
                        className="component-tag-discount notranslate config__discount-tag"
                        style={{ display: "block" }}
                      >
                        <span className="component-tag-text">-20%</span>
                      </div>
                    </div>
                    <div
                      className="component__product-sold-out"
                      style={{ display: "none" }}
                    >
                      <div className="component__product-sold-out-inner">
                        Sold Out
                      </div>
                    </div>
                  </div>
                  <input
                    className="data-save"
                    type="hidden"
                    data-value="%7B%22skus%22%3A%5B%7B%22compare_at_price%22%3A%7B%22price%22%3A%22%240%22%2C%22price_value%22%3A0%2C%22value%22%3A%220%22%2C%22code%22%3A%22USD%22%2C%22rate%22%3A1%7D%2C%22grams%22%3A400%2C%22id%22%3A3686043%2C%22handle%22%3A%22geometric-casual-summer-polyester-no-elasticity-daily-cap-sleeve-crew-neck-x-line-shirts-for-women-15316312%22%2C%22activities%22%3A%7B%22bottom%22%3A%5B%22pre_sale%22%5D%2C%22map%22%3A%5B%7B%22pre_sale%22%3A22%7D%5D%7D%2C%22activity_type_name%22%3A%22pre_sale%22%2C%22image%22%3A%22catalog%5C%2Fproduct%5C%2F2023-04%5C%2F21%5C%2Fb3b4e1946ccc670fb4f66509fb76aafd.jpg%22%2C%22is_activity_price%22%3A1%2C%22list_tag%22%3A1%2C%22special_price%22%3A%22%2429.96%22%2C%22special_price_value%22%3A29.96%2C%22origin_price%22%3A%22%2436.99%22%2C%22origin_price_value%22%3A36.99%2C%22inventory%22%3A99999%2C%22feed_id%22%3A3686043%2C%22price%22%3A%7B%22price%22%3A%22%2436.99%22%2C%22price_value%22%3A36.99%2C%22value%22%3A%2236.99%22%2C%22code%22%3A%22USD%22%2C%22rate%22%3A1%7D%2C%22product_id%22%3A15316312%2C%22product_image_id%22%3A2029152%2C%22sku%22%3A%22SH4L58A74D4D%22%2C%22sold_status%22%3A0%2C%22status%22%3A1%2C%22sort%22%3A1%2C%22remaining_inventory%22%3A0%2C%22sale%22%3A%7B%22price%22%3A%7B%22price%22%3A%22%2429.96%22%2C%22price_value%22%3A29.96%2C%22value%22%3A%2229.96%22%2C%22code%22%3A%22USD%22%2C%22rate%22%3A1%7D%2C%22module%22%3A%22pre_sale%22%2C%22activity_type%22%3A3%2C%22activity_id%22%3A22%7D%2C%22flash_sale_sku%22%3A%5B%5D%2C%22options%22%3A%5B%7B%22size_sort%22%3A0%2C%22name%22%3A%22Color%22%2C%22supplier_spec%22%3A%22%22%2C%22id%22%3A5%2C%22value_id%22%3A40%2C%22value_name%22%3A%22Blue%22%2C%22key%22%3A%22Color%22%2C%22country_value_names%22%3Anull%7D%2C%7B%22size_sort%22%3A1%2C%22name%22%3A%22Size%22%2C%22supplier_spec%22%3A%22%22%2C%22id%22%3A11%2C%22value_id%22%3A46%2C%22value_name%22%3A%22S%22%2C%22key%22%3A%22Size%22%2C%22country_value_names%22%3A%7B%22EUR%22%3A%22S%2838-40%29%22%2C%22AU%22%3A%22S%2810-12%29%22%2C%22US%22%3A%22S%286-8%29%22%2C%22UK%22%3A%22S%2810-12%29%22%7D%7D%5D%7D%5D%2C%22price%22%3A%7B%22price%22%3A%22%2436.99%22%2C%22price_value%22%3A36.99%2C%22value%22%3A%2236.99%22%2C%22code%22%3A%22USD%22%2C%22rate%22%3A1%7D%7D"
                    data-index={0}
                  />
                  <div
                    className="component__product-collect "
                    data-product-id={15316312}
                    data-wish-trigger=""
                    data-collect-impression='{"event_id":"save_to_wishlist","page_module":"collection","product":15316312,"sku":"SH4L58A74D4D","category":["Tops","Blouses and Shirts"],"original_price":36.99,"price":29.96,"rank":1,"page_module_title":"","goodlist_type":1,"page_module_title_new":"New Trend","collection_id":8017,"alg_id":""}'
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
                      data-collect-impression='{"event_id":"product","page_module":"collection","product":15316312,"sku":"SH4L58A74D4D","category":["Tops","Blouses and Shirts"],"original_price":36.99,"price":29.96,"rank":1,"name":"Crew Neck Geometric Casual Regular Fit Shirt","image_id":2029152,"image_path":"catalog\/product\/2023-04\/21\/b3b4e1946ccc670fb4f66509fb76aafd.jpg","goodlist_type":1,"page_module_title_new":"New Trend","collection_id":8017,"item_list_id":8017,"item_list_name":"New Trend","is_adp":0}'
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
                          $29.96
                        </span>
                      </div>
                      <div className="component__product-price-origin config__origin-price">
                        $36.99
                      </div>
                      <span
                        className="no-origin-price bury-point"
                        data-statis-exposure='{"ec":"product","mcmt":"collectionList","ilpi1id":15316312,"ilpi1sku":"SH4L58A74D4D","ilpi1va":["Blue","S"],"ilpi1ps":1,"ilpi1ca":["Tops","Blouses and Shirts"],"ilpi1opr":"","ilpi1pr":29.96,"c_byte":"","c_tid":"","c_tablevel":"","aid":null}'
                      ></span>
                      <span
                        className="has-origin-price bury-point"
                        data-statis-exposure='{"ec":"product","mcmt":"collectionList","ilpi1id":15316312,"ilpi1sku":"SH4L58A74D4D","ilpi1va":["Blue","S"],"ilpi1ps":1,"ilpi1ca":["Tops","Blouses and Shirts"],"ilpi1opr":36.99,"ilpi1pr":29.96,"c_byte":"","c_tid":"","c_tablevel":"","aid":null}'
                      ></span>
                    </div>
                    <div
                      className="component__product-cart"
                      data-activity-id=""
                      data-zero-user-range=""
                      data-handle="geometric-casual-summer-polyester-no-elasticity-daily-cap-sleeve-crew-neck-x-line-shirts-for-women-15316312"
                      data-sku-id={3686043}
                      style={{ display: "block" }}
                      data-activity-map='[{"pre_sale":22}]'
                    >
                      <i className="iconfont icon-c_icon_addcart" />
                    </div>
                  </div>
                  <div
                    className="component-label component__product-activity"
                    id=""
                  >
                    <span
                      className="component-label-item  with_icon "
                      data-save='{"icon":"icon-discount_icon_old","label":"Pre sale(Shipping delayed by 3 weeks)","activity":"pre_sale"}'
                      data-statis=""
                      data-collect=""
                    >
                      <i className="iconfont icon-discount_icon_old" />
                      <span
                        className="divide divide-vertical-line"
                        style={{}}
                      />
                      <span className="component-label-item-label-text">
                        Pre sale(Shipping delayed by 3 weeks)
                      </span>
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div
              className="product__item"
              data-handle="women-floral-autumn-elegant-polyester-natural-regular-fit-lapel-collar-x-line-ultra-lightweight-blazers-15316630"
              data-sku-id={3686383}
              data-product-id={15316630}
            >
              <div
                className="component__product"
                data-default-img="catalog/product/2023-04/24/e744d2bb1fc928e55d6a2cef50a2a7b4.jpg"
              >
                <div
                  className="component__product-main"
                  style={{ height: "auto" }}
                >
                  <div
                    className="component__product-picture-wrapper"
                    style={{ paddingTop: "calc(133.33333% - 3px)" }}
                    data-spu-inventory={1}
                  >
                    <img
                      className="component__product-picture"
                      src="/image/catalog/activity/e744d2bb1fc928e55d6a2cef50a2a7b4.jpg"
                      alt="Regular Fit Lapel Collar Floral Elegant Blazer"
                    />
                    {/* <Image
                      className="media-wrap image-wrap"
                      src="/image/catalog/activity/dMOf3EPxXA1648612410.jpg"
                      alt="3"
                      width="500"
                      height="500"
                    /> */}
                    <div className="component-tag">
                      <div
                        className="component-tag-discount notranslate config__discount-tag"
                        style={{ display: "block" }}
                      >
                        <span className="component-tag-text">-20%</span>
                      </div>
                    </div>
                    <div
                      className="component__product-sold-out"
                      style={{ display: "none" }}
                    >
                      <div className="component__product-sold-out-inner">
                        Sold Out
                      </div>
                    </div>
                  </div>
                  <input
                    className="data-save"
                    type="hidden"
                    data-value="%7B%22skus%22%3A%5B%7B%22compare_at_price%22%3A%7B%22price%22%3A%22%24108.42%22%2C%22price_value%22%3A108.42%2C%22value%22%3A%22108.42%22%2C%22code%22%3A%22USD%22%2C%22rate%22%3A1%7D%2C%22grams%22%3A400%2C%22id%22%3A3686383%2C%22handle%22%3A%22women-floral-autumn-elegant-polyester-natural-regular-fit-lapel-collar-x-line-ultra-lightweight-blazers-15316630%22%2C%22activities%22%3A%7B%22bottom%22%3A%5B%22pre_sale%22%5D%2C%22map%22%3A%5B%7B%22pre_sale%22%3A22%7D%5D%7D%2C%22activity_type_name%22%3A%22pre_sale%22%2C%22image%22%3A%22catalog%5C%2Fproduct%5C%2F2023-04%5C%2F24%5C%2Fe744d2bb1fc928e55d6a2cef50a2a7b4.jpg%22%2C%22is_activity_price%22%3A1%2C%22list_tag%22%3A1%2C%22special_price%22%3A%22%2472.89%22%2C%22special_price_value%22%3A72.89%2C%22origin_price%22%3A%22%2489.99%22%2C%22origin_price_value%22%3A89.99%2C%22inventory%22%3A99999%2C%22feed_id%22%3A3686383%2C%22price%22%3A%7B%22price%22%3A%22%2489.99%22%2C%22price_value%22%3A89.99%2C%22value%22%3A%2289.99%22%2C%22code%22%3A%22USD%22%2C%22rate%22%3A1%7D%2C%22product_id%22%3A15316630%2C%22product_image_id%22%3A2029313%2C%22sku%22%3A%22BL4O335A4C8C%22%2C%22sold_status%22%3A0%2C%22status%22%3A1%2C%22sort%22%3A1%2C%22remaining_inventory%22%3A0%2C%22sale%22%3A%7B%22price%22%3A%7B%22price%22%3A%22%2472.89%22%2C%22price_value%22%3A72.89%2C%22value%22%3A%2272.89%22%2C%22code%22%3A%22USD%22%2C%22rate%22%3A1%7D%2C%22module%22%3A%22pre_sale%22%2C%22activity_type%22%3A3%2C%22activity_id%22%3A22%7D%2C%22flash_sale_sku%22%3A%5B%5D%2C%22options%22%3A%5B%7B%22size_sort%22%3A0%2C%22name%22%3A%22Color%22%2C%22supplier_spec%22%3A%22%22%2C%22id%22%3A5%2C%22value_id%22%3A565%2C%22value_name%22%3A%22flower%22%2C%22key%22%3A%22Color%22%2C%22country_value_names%22%3Anull%7D%2C%7B%22size_sort%22%3A1%2C%22name%22%3A%22Size%22%2C%22supplier_spec%22%3A%22%22%2C%22id%22%3A11%2C%22value_id%22%3A46%2C%22value_name%22%3A%22S%22%2C%22key%22%3A%22Size%22%2C%22country_value_names%22%3A%7B%22EUR%22%3A%22S%2838-40%29%22%2C%22AU%22%3A%22S%2810-12%29%22%2C%22US%22%3A%22S%286-8%29%22%2C%22UK%22%3A%22S%2810-12%29%22%7D%7D%5D%7D%5D%2C%22price%22%3A%7B%22price%22%3A%22%2489.99%22%2C%22price_value%22%3A89.99%2C%22value%22%3A%2289.99%22%2C%22code%22%3A%22USD%22%2C%22rate%22%3A1%7D%7D"
                    data-index={1}
                  />
                  <div
                    className="component__product-collect "
                    data-product-id={15316630}
                    data-wish-trigger=""
                    data-collect-impression='{"event_id":"save_to_wishlist","page_module":"collection","product":15316630,"sku":"BL4O335A4C8C","category":["Tops","Outerwear","Blazers"],"original_price":89.99,"price":72.89,"rank":2,"page_module_title":"","goodlist_type":1,"page_module_title_new":"New Trend","collection_id":8017,"alg_id":""}'
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
                      data-collect-impression='{"event_id":"product","page_module":"collection","product":15316630,"sku":"BL4O335A4C8C","category":["Tops","Outerwear","Blazers"],"original_price":89.99,"price":72.89,"rank":2,"name":"Regular Fit Lapel Collar Floral Elegant Blazer","image_id":2029313,"image_path":"catalog\/product\/2023-04\/24\/e744d2bb1fc928e55d6a2cef50a2a7b4.jpg","goodlist_type":1,"page_module_title_new":"New Trend","collection_id":8017,"item_list_id":8017,"item_list_name":"New Trend","is_adp":0}'
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
                          $72.89
                        </span>
                      </div>
                      <div className="component__product-price-origin config__origin-price">
                        $89.99
                      </div>
                      <span
                        className="no-origin-price bury-point"
                        data-statis-exposure='{"ec":"product","mcmt":"collectionList","ilpi1id":15316630,"ilpi1sku":"BL4O335A4C8C","ilpi1va":["flower","S"],"ilpi1ps":2,"ilpi1ca":["Tops","Outerwear","Blazers"],"ilpi1opr":"","ilpi1pr":72.89,"c_byte":"","c_tid":"","c_tablevel":"","aid":null}'
                      ></span>
                      <span
                        className="has-origin-price bury-point"
                        data-statis-exposure='{"ec":"product","mcmt":"collectionList","ilpi1id":15316630,"ilpi1sku":"BL4O335A4C8C","ilpi1va":["flower","S"],"ilpi1ps":2,"ilpi1ca":["Tops","Outerwear","Blazers"],"ilpi1opr":89.99,"ilpi1pr":72.89,"c_byte":"","c_tid":"","c_tablevel":"","aid":null}'
                      ></span>
                    </div>
                    <div
                      className="component__product-cart"
                      data-activity-id=""
                      data-zero-user-range=""
                      data-handle="women-floral-autumn-elegant-polyester-natural-regular-fit-lapel-collar-x-line-ultra-lightweight-blazers-15316630"
                      data-sku-id={3686383}
                      style={{ display: "block" }}
                      data-activity-map='[{"pre_sale":22}]'
                    >
                      <i className="iconfont icon-c_icon_addcart" />
                    </div>
                  </div>
                  <div
                    className="component-label component__product-activity"
                    id=""
                  >
                    <span
                      className="component-label-item  with_icon "
                      data-save='{"icon":"icon-discount_icon_old","label":"Pre sale(Shipping delayed by 3 weeks)","activity":"pre_sale"}'
                      data-statis=""
                      data-collect=""
                    >
                      <i className="iconfont icon-discount_icon_old" />
                      <span
                        className="divide divide-vertical-line"
                        style={{}}
                      />
                      <span className="component-label-item-label-text">
                        Pre sale(Shipping delayed by 3 weeks)
                      </span>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div style={{ padding: "50px 12px" }}>
            <div className="c-keywords-related-searches">
              <div className="c-keywords-related-searches__title">
                Related Searches
              </div>
              <div className="c-keywords-related-searches__content">
                <div
                  className="prev-navigation-ele swiper-button-disabled"
                  tabIndex={0}
                  role="button"
                  aria-label="Previous slide"
                  aria-disabled="true"
                >
                  <i className="iconfont icon-c_icon_left" />
                </div>
                <div
                  className="next-navigation-ele"
                  tabIndex={0}
                  role="button"
                  aria-label="Next slide"
                  aria-disabled="false"
                >
                  <i className="iconfont icon-c_icon_left" />
                </div>
                <div
                  id="c-keywords-related-searches__swiper"
                  className="swiper-container-initialized swiper-container-horizontal swiper-container-autoheight"
                >
                  <div className="swiper-wrapper" style={{ height: 31 }}>
                    <div
                      className="swiper-slide swiper-slide-active"
                      style={{ marginRight: 12 }}
                    >
                      <a
                        href="/c/white-dress-casual-summer"
                        data-collect-click='{"page_id":"page_category_product_list","page_name":"\u7c7b\u76ee\u5546\u54c1\u5217\u8868\u9875","page_module":"related searches","event_id":"seo_key","event_name":"\u70b9\u51fb\u641c\u7d22\u63a8\u8350\u8bcd","object_id":"White Dress Casual Summer"}'
                        data-collect-impression='{"page_id":"page_category_product_list","page_name":"\u7c7b\u76ee\u5546\u54c1\u5217\u8868\u9875","page_module":"related searches","event_id":"seo_key","event_name":"\u66dd\u5149\u641c\u7d22\u63a8\u8350\u8bcd","items":{"keyword":"White Dress Casual Summer"}}'
                      >
                        <span>White Dress Casual Summer</span>
                      </a>
                    </div>
                    <div
                      className="swiper-slide swiper-slide-next"
                      style={{ marginRight: 12 }}
                    >
                      <a
                        href="/c/cute-floral-sundresses"
                        data-collect-click='{"page_id":"page_category_product_list","page_name":"\u7c7b\u76ee\u5546\u54c1\u5217\u8868\u9875","page_module":"related searches","event_id":"seo_key","event_name":"\u70b9\u51fb\u641c\u7d22\u63a8\u8350\u8bcd","object_id":"Cute Floral Sundresses"}'
                        data-collect-impression='{"page_id":"page_category_product_list","page_name":"\u7c7b\u76ee\u5546\u54c1\u5217\u8868\u9875","page_module":"related searches","event_id":"seo_key","event_name":"\u66dd\u5149\u641c\u7d22\u63a8\u8350\u8bcd","items":{"keyword":"Cute Floral Sundresses"}}'
                      >
                        <span>Cute Floral Sundresses</span>
                      </a>
                    </div>
                    <div className="swiper-slide" style={{ marginRight: 12 }}>
                      <a
                        href="/c/yellow-flowy-sundress"
                        data-collect-click='{"page_id":"page_category_product_list","page_name":"\u7c7b\u76ee\u5546\u54c1\u5217\u8868\u9875","page_module":"related searches","event_id":"seo_key","event_name":"\u70b9\u51fb\u641c\u7d22\u63a8\u8350\u8bcd","object_id":"Yellow Flowy Sundress"}'
                        data-collect-impression='{"page_id":"page_category_product_list","page_name":"\u7c7b\u76ee\u5546\u54c1\u5217\u8868\u9875","page_module":"related searches","event_id":"seo_key","event_name":"\u66dd\u5149\u641c\u7d22\u63a8\u8350\u8bcd","items":{"keyword":"Yellow Flowy Sundress"}}'
                      >
                        <span>Yellow Flowy Sundress</span>
                      </a>
                    </div>
                    <div className="swiper-slide" style={{ marginRight: 12 }}>
                      <a
                        href="/c/sleeveless-boho-midi-dress"
                        data-collect-click='{"page_id":"page_category_product_list","page_name":"\u7c7b\u76ee\u5546\u54c1\u5217\u8868\u9875","page_module":"related searches","event_id":"seo_key","event_name":"\u70b9\u51fb\u641c\u7d22\u63a8\u8350\u8bcd","object_id":"Sleeveless Boho Midi Dress"}'
                        data-collect-impression='{"page_id":"page_category_product_list","page_name":"\u7c7b\u76ee\u5546\u54c1\u5217\u8868\u9875","page_module":"related searches","event_id":"seo_key","event_name":"\u66dd\u5149\u641c\u7d22\u63a8\u8350\u8bcd","items":{"keyword":"Sleeveless Boho Midi Dress"}}'
                      >
                        <span>Sleeveless Boho Midi Dress</span>
                      </a>
                    </div>
                    <div className="swiper-slide" style={{ marginRight: 12 }}>
                      <a
                        href="/c/casual-summer-sundresses"
                        data-collect-click='{"page_id":"page_category_product_list","page_name":"\u7c7b\u76ee\u5546\u54c1\u5217\u8868\u9875","page_module":"related searches","event_id":"seo_key","event_name":"\u70b9\u51fb\u641c\u7d22\u63a8\u8350\u8bcd","object_id":"Casual Summer Sundresses"}'
                        data-collect-impression='{"page_id":"page_category_product_list","page_name":"\u7c7b\u76ee\u5546\u54c1\u5217\u8868\u9875","page_module":"related searches","event_id":"seo_key","event_name":"\u66dd\u5149\u641c\u7d22\u63a8\u8350\u8bcd","items":{"keyword":"Casual Summer Sundresses"}}'
                      >
                        <span>Casual Summer Sundresses</span>
                      </a>
                    </div>
                    <div className="swiper-slide" style={{ marginRight: 12 }}>
                      <a
                        href="/c/summer-loose-fitting-dresses"
                        data-collect-click='{"page_id":"page_category_product_list","page_name":"\u7c7b\u76ee\u5546\u54c1\u5217\u8868\u9875","page_module":"related searches","event_id":"seo_key","event_name":"\u70b9\u51fb\u641c\u7d22\u63a8\u8350\u8bcd","object_id":"Summer Loose Fitting Dresses"}'
                        data-collect-impression='{"page_id":"page_category_product_list","page_name":"\u7c7b\u76ee\u5546\u54c1\u5217\u8868\u9875","page_module":"related searches","event_id":"seo_key","event_name":"\u66dd\u5149\u641c\u7d22\u63a8\u8350\u8bcd","items":{"keyword":"Summer Loose Fitting Dresses"}}'
                      >
                        <span>Summer Loose Fitting Dresses</span>
                      </a>
                    </div>
                    <div className="swiper-slide" style={{ marginRight: 12 }}>
                      <a
                        href="/c/everyday-sundresses"
                        data-collect-click='{"page_id":"page_category_product_list","page_name":"\u7c7b\u76ee\u5546\u54c1\u5217\u8868\u9875","page_module":"related searches","event_id":"seo_key","event_name":"\u70b9\u51fb\u641c\u7d22\u63a8\u8350\u8bcd","object_id":"Everyday Sundresses"}'
                        data-collect-impression='{"page_id":"page_category_product_list","page_name":"\u7c7b\u76ee\u5546\u54c1\u5217\u8868\u9875","page_module":"related searches","event_id":"seo_key","event_name":"\u66dd\u5149\u641c\u7d22\u63a8\u8350\u8bcd","items":{"keyword":"Everyday Sundresses"}}'
                      >
                        <span>Everyday Sundresses</span>
                      </a>
                    </div>
                    <div className="swiper-slide" style={{ marginRight: 12 }}>
                      <a
                        href="/c/spring-dress-with-pockets"
                        data-collect-click='{"page_id":"page_category_product_list","page_name":"\u7c7b\u76ee\u5546\u54c1\u5217\u8868\u9875","page_module":"related searches","event_id":"seo_key","event_name":"\u70b9\u51fb\u641c\u7d22\u63a8\u8350\u8bcd","object_id":"Spring Dress With Pockets"}'
                        data-collect-impression='{"page_id":"page_category_product_list","page_name":"\u7c7b\u76ee\u5546\u54c1\u5217\u8868\u9875","page_module":"related searches","event_id":"seo_key","event_name":"\u66dd\u5149\u641c\u7d22\u63a8\u8350\u8bcd","items":{"keyword":"Spring Dress With Pockets"}}'
                      >
                        <span>Spring Dress With Pockets</span>
                      </a>
                    </div>
                    <div className="swiper-slide" style={{ marginRight: 12 }}>
                      <a
                        href="/c/midi-length-beach-dresses"
                        data-collect-click='{"page_id":"page_category_product_list","page_name":"\u7c7b\u76ee\u5546\u54c1\u5217\u8868\u9875","page_module":"related searches","event_id":"seo_key","event_name":"\u70b9\u51fb\u641c\u7d22\u63a8\u8350\u8bcd","object_id":"Midi Length Beach Dresses"}'
                        data-collect-impression='{"page_id":"page_category_product_list","page_name":"\u7c7b\u76ee\u5546\u54c1\u5217\u8868\u9875","page_module":"related searches","event_id":"seo_key","event_name":"\u66dd\u5149\u641c\u7d22\u63a8\u8350\u8bcd","items":{"keyword":"Midi Length Beach Dresses"}}'
                      >
                        <span>Midi Length Beach Dresses</span>
                      </a>
                    </div>
                    <div className="swiper-slide" style={{ marginRight: 12 }}>
                      <a
                        href="/c/polka-dot-midi-dress"
                        data-collect-click='{"page_id":"page_category_product_list","page_name":"\u7c7b\u76ee\u5546\u54c1\u5217\u8868\u9875","page_module":"related searches","event_id":"seo_key","event_name":"\u70b9\u51fb\u641c\u7d22\u63a8\u8350\u8bcd","object_id":"Polka Dot Midi Dress"}'
                        data-collect-impression='{"page_id":"page_category_product_list","page_name":"\u7c7b\u76ee\u5546\u54c1\u5217\u8868\u9875","page_module":"related searches","event_id":"seo_key","event_name":"\u66dd\u5149\u641c\u7d22\u63a8\u8350\u8bcd","items":{"keyword":"Polka Dot Midi Dress"}}'
                      >
                        <span>Polka Dot Midi Dress</span>
                      </a>
                    </div>
                    <div className="swiper-slide" style={{ marginRight: 12 }}>
                      <a
                        href="/c/white-sexy-sundress"
                        data-collect-click='{"page_id":"page_category_product_list","page_name":"\u7c7b\u76ee\u5546\u54c1\u5217\u8868\u9875","page_module":"related searches","event_id":"seo_key","event_name":"\u70b9\u51fb\u641c\u7d22\u63a8\u8350\u8bcd","object_id":"White Sexy Sundress"}'
                        data-collect-impression='{"page_id":"page_category_product_list","page_name":"\u7c7b\u76ee\u5546\u54c1\u5217\u8868\u9875","page_module":"related searches","event_id":"seo_key","event_name":"\u66dd\u5149\u641c\u7d22\u63a8\u8350\u8bcd","items":{"keyword":"White Sexy Sundress"}}'
                      >
                        <span>White Sexy Sundress</span>
                      </a>
                    </div>
                    <div className="swiper-slide" style={{ marginRight: 12 }}>
                      <a
                        href="/c/white-short-sleeve-sundress"
                        data-collect-click='{"page_id":"page_category_product_list","page_name":"\u7c7b\u76ee\u5546\u54c1\u5217\u8868\u9875","page_module":"related searches","event_id":"seo_key","event_name":"\u70b9\u51fb\u641c\u7d22\u63a8\u8350\u8bcd","object_id":"White Short Sleeve Sundress"}'
                        data-collect-impression='{"page_id":"page_category_product_list","page_name":"\u7c7b\u76ee\u5546\u54c1\u5217\u8868\u9875","page_module":"related searches","event_id":"seo_key","event_name":"\u66dd\u5149\u641c\u7d22\u63a8\u8350\u8bcd","items":{"keyword":"White Short Sleeve Sundress"}}'
                      >
                        <span>White Short Sleeve Sundress</span>
                      </a>
                    </div>
                    <div className="swiper-slide" style={{ marginRight: 12 }}>
                      <a
                        href="/c/long-summer-flowy-dresses"
                        data-collect-click='{"page_id":"page_category_product_list","page_name":"\u7c7b\u76ee\u5546\u54c1\u5217\u8868\u9875","page_module":"related searches","event_id":"seo_key","event_name":"\u70b9\u51fb\u641c\u7d22\u63a8\u8350\u8bcd","object_id":"Long Summer Flowy Dresses"}'
                        data-collect-impression='{"page_id":"page_category_product_list","page_name":"\u7c7b\u76ee\u5546\u54c1\u5217\u8868\u9875","page_module":"related searches","event_id":"seo_key","event_name":"\u66dd\u5149\u641c\u7d22\u63a8\u8350\u8bcd","items":{"keyword":"Long Summer Flowy Dresses"}}'
                      >
                        <span>Long Summer Flowy Dresses</span>
                      </a>
                    </div>
                    <div className="swiper-slide" style={{ marginRight: 12 }}>
                      <a
                        href="/c/petite-summer-beach-dresses"
                        data-collect-click='{"page_id":"page_category_product_list","page_name":"\u7c7b\u76ee\u5546\u54c1\u5217\u8868\u9875","page_module":"related searches","event_id":"seo_key","event_name":"\u70b9\u51fb\u641c\u7d22\u63a8\u8350\u8bcd","object_id":"Petite Summer Beach Dresses"}'
                        data-collect-impression='{"page_id":"page_category_product_list","page_name":"\u7c7b\u76ee\u5546\u54c1\u5217\u8868\u9875","page_module":"related searches","event_id":"seo_key","event_name":"\u66dd\u5149\u641c\u7d22\u63a8\u8350\u8bcd","items":{"keyword":"Petite Summer Beach Dresses"}}'
                      >
                        <span>Petite Summer Beach Dresses</span>
                      </a>
                    </div>
                    <div className="swiper-slide" style={{ marginRight: 12 }}>
                      <a
                        href="/c/white-linen-midi-dress"
                        data-collect-click='{"page_id":"page_category_product_list","page_name":"\u7c7b\u76ee\u5546\u54c1\u5217\u8868\u9875","page_module":"related searches","event_id":"seo_key","event_name":"\u70b9\u51fb\u641c\u7d22\u63a8\u8350\u8bcd","object_id":"White Linen Midi Dress"}'
                        data-collect-impression='{"page_id":"page_category_product_list","page_name":"\u7c7b\u76ee\u5546\u54c1\u5217\u8868\u9875","page_module":"related searches","event_id":"seo_key","event_name":"\u66dd\u5149\u641c\u7d22\u63a8\u8350\u8bcd","items":{"keyword":"White Linen Midi Dress"}}'
                      >
                        <span>White Linen Midi Dress</span>
                      </a>
                    </div>
                    <div className="swiper-slide" style={{ marginRight: 12 }}>
                      <a
                        href="/c/white-ruched-midi-dress"
                        data-collect-click='{"page_id":"page_category_product_list","page_name":"\u7c7b\u76ee\u5546\u54c1\u5217\u8868\u9875","page_module":"related searches","event_id":"seo_key","event_name":"\u70b9\u51fb\u641c\u7d22\u63a8\u8350\u8bcd","object_id":"White Ruched Midi Dress"}'
                        data-collect-impression='{"page_id":"page_category_product_list","page_name":"\u7c7b\u76ee\u5546\u54c1\u5217\u8868\u9875","page_module":"related searches","event_id":"seo_key","event_name":"\u66dd\u5149\u641c\u7d22\u63a8\u8350\u8bcd","items":{"keyword":"White Ruched Midi Dress"}}'
                      >
                        <span>White Ruched Midi Dress</span>
                      </a>
                    </div>
                    <div className="swiper-slide" style={{ marginRight: 12 }}>
                      <a
                        href="/c/long-casual-summer-dresses"
                        data-collect-click='{"page_id":"page_category_product_list","page_name":"\u7c7b\u76ee\u5546\u54c1\u5217\u8868\u9875","page_module":"related searches","event_id":"seo_key","event_name":"\u70b9\u51fb\u641c\u7d22\u63a8\u8350\u8bcd","object_id":"Long Casual Summer Dresses"}'
                        data-collect-impression='{"page_id":"page_category_product_list","page_name":"\u7c7b\u76ee\u5546\u54c1\u5217\u8868\u9875","page_module":"related searches","event_id":"seo_key","event_name":"\u66dd\u5149\u641c\u7d22\u63a8\u8350\u8bcd","items":{"keyword":"Long Casual Summer Dresses"}}'
                      >
                        <span>Long Casual Summer Dresses</span>
                      </a>
                    </div>
                    <div className="swiper-slide" style={{ marginRight: 12 }}>
                      <a
                        href="/c/tank-top-sundresses"
                        data-collect-click='{"page_id":"page_category_product_list","page_name":"\u7c7b\u76ee\u5546\u54c1\u5217\u8868\u9875","page_module":"related searches","event_id":"seo_key","event_name":"\u70b9\u51fb\u641c\u7d22\u63a8\u8350\u8bcd","object_id":"Tank Top Sundresses"}'
                        data-collect-impression='{"page_id":"page_category_product_list","page_name":"\u7c7b\u76ee\u5546\u54c1\u5217\u8868\u9875","page_module":"related searches","event_id":"seo_key","event_name":"\u66dd\u5149\u641c\u7d22\u63a8\u8350\u8bcd","items":{"keyword":"Tank Top Sundresses"}}'
                      >
                        <span>Tank Top Sundresses</span>
                      </a>
                    </div>
                    <div className="swiper-slide" style={{ marginRight: 12 }}>
                      <a
                        href="/c/petite-long-dresses-casual"
                        data-collect-click='{"page_id":"page_category_product_list","page_name":"\u7c7b\u76ee\u5546\u54c1\u5217\u8868\u9875","page_module":"related searches","event_id":"seo_key","event_name":"\u70b9\u51fb\u641c\u7d22\u63a8\u8350\u8bcd","object_id":"Petite Long Dresses Casual"}'
                        data-collect-impression='{"page_id":"page_category_product_list","page_name":"\u7c7b\u76ee\u5546\u54c1\u5217\u8868\u9875","page_module":"related searches","event_id":"seo_key","event_name":"\u66dd\u5149\u641c\u7d22\u63a8\u8350\u8bcd","items":{"keyword":"Petite Long Dresses Casual"}}'
                      >
                        <span>Petite Long Dresses Casual</span>
                      </a>
                    </div>
                    <div className="swiper-slide" style={{ marginRight: 12 }}>
                      <a
                        href="/c/womens-crew-neck-sweatshirt"
                        data-collect-click='{"page_id":"page_category_product_list","page_name":"\u7c7b\u76ee\u5546\u54c1\u5217\u8868\u9875","page_module":"related searches","event_id":"seo_key","event_name":"\u70b9\u51fb\u641c\u7d22\u63a8\u8350\u8bcd","object_id":"Womens Crew Neck Sweatshirt"}'
                        data-collect-impression='{"page_id":"page_category_product_list","page_name":"\u7c7b\u76ee\u5546\u54c1\u5217\u8868\u9875","page_module":"related searches","event_id":"seo_key","event_name":"\u66dd\u5149\u641c\u7d22\u63a8\u8350\u8bcd","items":{"keyword":"Womens Crew Neck Sweatshirt"}}'
                      >
                        <span>Womens Crew Neck Sweatshirt</span>
                      </a>
                    </div>
                    <div className="swiper-slide" style={{ marginRight: 12 }}>
                      <a
                        href="/c/vintage-sweaters-womens"
                        data-collect-click='{"page_id":"page_category_product_list","page_name":"\u7c7b\u76ee\u5546\u54c1\u5217\u8868\u9875","page_module":"related searches","event_id":"seo_key","event_name":"\u70b9\u51fb\u641c\u7d22\u63a8\u8350\u8bcd","object_id":"Vintage Sweaters Womens"}'
                        data-collect-impression='{"page_id":"page_category_product_list","page_name":"\u7c7b\u76ee\u5546\u54c1\u5217\u8868\u9875","page_module":"related searches","event_id":"seo_key","event_name":"\u66dd\u5149\u641c\u7d22\u63a8\u8350\u8bcd","items":{"keyword":"Vintage Sweaters Womens"}}'
                      >
                        <span>Vintage Sweaters Womens</span>
                      </a>
                    </div>
                    <div className="swiper-slide" style={{ marginRight: 12 }}>
                      <a
                        href="/c/duster-cardigan-sweater"
                        data-collect-click='{"page_id":"page_category_product_list","page_name":"\u7c7b\u76ee\u5546\u54c1\u5217\u8868\u9875","page_module":"related searches","event_id":"seo_key","event_name":"\u70b9\u51fb\u641c\u7d22\u63a8\u8350\u8bcd","object_id":"Duster Cardigan Sweater"}'
                        data-collect-impression='{"page_id":"page_category_product_list","page_name":"\u7c7b\u76ee\u5546\u54c1\u5217\u8868\u9875","page_module":"related searches","event_id":"seo_key","event_name":"\u66dd\u5149\u641c\u7d22\u63a8\u8350\u8bcd","items":{"keyword":"Duster Cardigan Sweater"}}'
                      >
                        <span>Duster Cardigan Sweater</span>
                      </a>
                    </div>
                    <div className="swiper-slide" style={{ marginRight: 12 }}>
                      <a
                        href="/c/long-sleeve-loose-blouse"
                        data-collect-click='{"page_id":"page_category_product_list","page_name":"\u7c7b\u76ee\u5546\u54c1\u5217\u8868\u9875","page_module":"related searches","event_id":"seo_key","event_name":"\u70b9\u51fb\u641c\u7d22\u63a8\u8350\u8bcd","object_id":"Long Sleeve Loose Blouse"}'
                        data-collect-impression='{"page_id":"page_category_product_list","page_name":"\u7c7b\u76ee\u5546\u54c1\u5217\u8868\u9875","page_module":"related searches","event_id":"seo_key","event_name":"\u66dd\u5149\u641c\u7d22\u63a8\u8350\u8bcd","items":{"keyword":"Long Sleeve Loose Blouse"}}'
                      >
                        <span>Long Sleeve Loose Blouse</span>
                      </a>
                    </div>
                    <div className="swiper-slide" style={{ marginRight: 12 }}>
                      <a
                        href="/c/womens-black-cardigan-sweater"
                        data-collect-click='{"page_id":"page_category_product_list","page_name":"\u7c7b\u76ee\u5546\u54c1\u5217\u8868\u9875","page_module":"related searches","event_id":"seo_key","event_name":"\u70b9\u51fb\u641c\u7d22\u63a8\u8350\u8bcd","object_id":"Womens Black Cardigan Sweater"}'
                        data-collect-impression='{"page_id":"page_category_product_list","page_name":"\u7c7b\u76ee\u5546\u54c1\u5217\u8868\u9875","page_module":"related searches","event_id":"seo_key","event_name":"\u66dd\u5149\u641c\u7d22\u63a8\u8350\u8bcd","items":{"keyword":"Womens Black Cardigan Sweater"}}'
                      >
                        <span>Womens Black Cardigan Sweater</span>
                      </a>
                    </div>
                    <div className="swiper-slide" style={{ marginRight: 12 }}>
                      <a
                        href="/c/red-and-black-dress"
                        data-collect-click='{"page_id":"page_category_product_list","page_name":"\u7c7b\u76ee\u5546\u54c1\u5217\u8868\u9875","page_module":"related searches","event_id":"seo_key","event_name":"\u70b9\u51fb\u641c\u7d22\u63a8\u8350\u8bcd","object_id":"Red And Black Dress"}'
                        data-collect-impression='{"page_id":"page_category_product_list","page_name":"\u7c7b\u76ee\u5546\u54c1\u5217\u8868\u9875","page_module":"related searches","event_id":"seo_key","event_name":"\u66dd\u5149\u641c\u7d22\u63a8\u8350\u8bcd","items":{"keyword":"Red And Black Dress"}}'
                      >
                        <span>Red And Black Dress</span>
                      </a>
                    </div>
                    <div className="swiper-slide" style={{ marginRight: 12 }}>
                      <a
                        href="/c/sexy-plus-size-dresses"
                        data-collect-click='{"page_id":"page_category_product_list","page_name":"\u7c7b\u76ee\u5546\u54c1\u5217\u8868\u9875","page_module":"related searches","event_id":"seo_key","event_name":"\u70b9\u51fb\u641c\u7d22\u63a8\u8350\u8bcd","object_id":"Sexy Plus Size Dresses"}'
                        data-collect-impression='{"page_id":"page_category_product_list","page_name":"\u7c7b\u76ee\u5546\u54c1\u5217\u8868\u9875","page_module":"related searches","event_id":"seo_key","event_name":"\u66dd\u5149\u641c\u7d22\u63a8\u8350\u8bcd","items":{"keyword":"Sexy Plus Size Dresses"}}'
                      >
                        <span>Sexy Plus Size Dresses</span>
                      </a>
                    </div>
                    <div className="swiper-slide" style={{ marginRight: 12 }}>
                      <a
                        href="/c/womens-casual-outfits"
                        data-collect-click='{"page_id":"page_category_product_list","page_name":"\u7c7b\u76ee\u5546\u54c1\u5217\u8868\u9875","page_module":"related searches","event_id":"seo_key","event_name":"\u70b9\u51fb\u641c\u7d22\u63a8\u8350\u8bcd","object_id":"Womens Casual Outfits"}'
                        data-collect-impression='{"page_id":"page_category_product_list","page_name":"\u7c7b\u76ee\u5546\u54c1\u5217\u8868\u9875","page_module":"related searches","event_id":"seo_key","event_name":"\u66dd\u5149\u641c\u7d22\u63a8\u8350\u8bcd","items":{"keyword":"Womens Casual Outfits"}}'
                      >
                        <span>Womens Casual Outfits</span>
                      </a>
                    </div>
                    <div className="swiper-slide" style={{ marginRight: 12 }}>
                      <a
                        href="/c/plus-size-white-sundress"
                        data-collect-click='{"page_id":"page_category_product_list","page_name":"\u7c7b\u76ee\u5546\u54c1\u5217\u8868\u9875","page_module":"related searches","event_id":"seo_key","event_name":"\u70b9\u51fb\u641c\u7d22\u63a8\u8350\u8bcd","object_id":"Plus Size White Sundress"}'
                        data-collect-impression='{"page_id":"page_category_product_list","page_name":"\u7c7b\u76ee\u5546\u54c1\u5217\u8868\u9875","page_module":"related searches","event_id":"seo_key","event_name":"\u66dd\u5149\u641c\u7d22\u63a8\u8350\u8bcd","items":{"keyword":"Plus Size White Sundress"}}'
                      >
                        <span>Plus Size White Sundress</span>
                      </a>
                    </div>
                    <div className="swiper-slide" style={{ marginRight: 12 }}>
                      <a
                        href="/c/cotton-turtlenecks-for-women"
                        data-collect-click='{"page_id":"page_category_product_list","page_name":"\u7c7b\u76ee\u5546\u54c1\u5217\u8868\u9875","page_module":"related searches","event_id":"seo_key","event_name":"\u70b9\u51fb\u641c\u7d22\u63a8\u8350\u8bcd","object_id":"Cotton Turtlenecks For Women"}'
                        data-collect-impression='{"page_id":"page_category_product_list","page_name":"\u7c7b\u76ee\u5546\u54c1\u5217\u8868\u9875","page_module":"related searches","event_id":"seo_key","event_name":"\u66dd\u5149\u641c\u7d22\u63a8\u8350\u8bcd","items":{"keyword":"Cotton Turtlenecks For Women"}}'
                      >
                        <span>Cotton Turtlenecks For Women</span>
                      </a>
                    </div>
                    <div className="swiper-slide" style={{ marginRight: 12 }}>
                      <a
                        href="/c/checked-plaid-dresses"
                        data-collect-click='{"page_id":"page_category_product_list","page_name":"\u7c7b\u76ee\u5546\u54c1\u5217\u8868\u9875","page_module":"related searches","event_id":"seo_key","event_name":"\u70b9\u51fb\u641c\u7d22\u63a8\u8350\u8bcd","object_id":"Checked\/Plaid Dresses"}'
                        data-collect-impression='{"page_id":"page_category_product_list","page_name":"\u7c7b\u76ee\u5546\u54c1\u5217\u8868\u9875","page_module":"related searches","event_id":"seo_key","event_name":"\u66dd\u5149\u641c\u7d22\u63a8\u8350\u8bcd","items":{"keyword":"Checked\/Plaid Dresses"}}'
                      >
                        <span>Checked/Plaid Dresses</span>
                      </a>
                    </div>
                    <div className="swiper-slide" style={{ marginRight: 12 }}>
                      <a
                        href="/c/ombre-dresses"
                        data-collect-click='{"page_id":"page_category_product_list","page_name":"\u7c7b\u76ee\u5546\u54c1\u5217\u8868\u9875","page_module":"related searches","event_id":"seo_key","event_name":"\u70b9\u51fb\u641c\u7d22\u63a8\u8350\u8bcd","object_id":"Ombre Dresses"}'
                        data-collect-impression='{"page_id":"page_category_product_list","page_name":"\u7c7b\u76ee\u5546\u54c1\u5217\u8868\u9875","page_module":"related searches","event_id":"seo_key","event_name":"\u66dd\u5149\u641c\u7d22\u63a8\u8350\u8bcd","items":{"keyword":"Ombre Dresses"}}'
                      >
                        <span>Ombre Dresses</span>
                      </a>
                    </div>
                    <div className="swiper-slide" style={{ marginRight: 12 }}>
                      <a
                        href="/c/beige-cardigan-sweater"
                        data-collect-click='{"page_id":"page_category_product_list","page_name":"\u7c7b\u76ee\u5546\u54c1\u5217\u8868\u9875","page_module":"related searches","event_id":"seo_key","event_name":"\u70b9\u51fb\u641c\u7d22\u63a8\u8350\u8bcd","object_id":"Beige Cardigan Sweater"}'
                        data-collect-impression='{"page_id":"page_category_product_list","page_name":"\u7c7b\u76ee\u5546\u54c1\u5217\u8868\u9875","page_module":"related searches","event_id":"seo_key","event_name":"\u66dd\u5149\u641c\u7d22\u63a8\u8350\u8bcd","items":{"keyword":"Beige Cardigan Sweater"}}'
                      >
                        <span>Beige Cardigan Sweater</span>
                      </a>
                    </div>
                    <div className="swiper-slide" style={{ marginRight: 12 }}>
                      <a
                        href="/c/baggy-jeans"
                        data-collect-click='{"page_id":"page_category_product_list","page_name":"\u7c7b\u76ee\u5546\u54c1\u5217\u8868\u9875","page_module":"related searches","event_id":"seo_key","event_name":"\u70b9\u51fb\u641c\u7d22\u63a8\u8350\u8bcd","object_id":"Baggy Jeans"}'
                        data-collect-impression='{"page_id":"page_category_product_list","page_name":"\u7c7b\u76ee\u5546\u54c1\u5217\u8868\u9875","page_module":"related searches","event_id":"seo_key","event_name":"\u66dd\u5149\u641c\u7d22\u63a8\u8350\u8bcd","items":{"keyword":"Baggy Jeans"}}'
                      >
                        <span>Baggy Jeans</span>
                      </a>
                    </div>
                    <div className="swiper-slide" style={{ marginRight: 12 }}>
                      <a
                        href="/c/v-neck-dresses"
                        data-collect-click='{"page_id":"page_category_product_list","page_name":"\u7c7b\u76ee\u5546\u54c1\u5217\u8868\u9875","page_module":"related searches","event_id":"seo_key","event_name":"\u70b9\u51fb\u641c\u7d22\u63a8\u8350\u8bcd","object_id":"V neck Dresses"}'
                        data-collect-impression='{"page_id":"page_category_product_list","page_name":"\u7c7b\u76ee\u5546\u54c1\u5217\u8868\u9875","page_module":"related searches","event_id":"seo_key","event_name":"\u66dd\u5149\u641c\u7d22\u63a8\u8350\u8bcd","items":{"keyword":"V neck Dresses"}}'
                      >
                        <span>V neck Dresses</span>
                      </a>
                    </div>
                    <div className="swiper-slide" style={{ marginRight: 12 }}>
                      <a
                        href="/c/white-fuzzy-sweater"
                        data-collect-click='{"page_id":"page_category_product_list","page_name":"\u7c7b\u76ee\u5546\u54c1\u5217\u8868\u9875","page_module":"related searches","event_id":"seo_key","event_name":"\u70b9\u51fb\u641c\u7d22\u63a8\u8350\u8bcd","object_id":"White Fuzzy Sweater"}'
                        data-collect-impression='{"page_id":"page_category_product_list","page_name":"\u7c7b\u76ee\u5546\u54c1\u5217\u8868\u9875","page_module":"related searches","event_id":"seo_key","event_name":"\u66dd\u5149\u641c\u7d22\u63a8\u8350\u8bcd","items":{"keyword":"White Fuzzy Sweater"}}'
                      >
                        <span>White Fuzzy Sweater</span>
                      </a>
                    </div>
                    <div className="swiper-slide" style={{ marginRight: 12 }}>
                      <a
                        href="/c/plus-size-cashmere-sweater"
                        data-collect-click='{"page_id":"page_category_product_list","page_name":"\u7c7b\u76ee\u5546\u54c1\u5217\u8868\u9875","page_module":"related searches","event_id":"seo_key","event_name":"\u70b9\u51fb\u641c\u7d22\u63a8\u8350\u8bcd","object_id":"Plus Size Cashmere Sweater"}'
                        data-collect-impression='{"page_id":"page_category_product_list","page_name":"\u7c7b\u76ee\u5546\u54c1\u5217\u8868\u9875","page_module":"related searches","event_id":"seo_key","event_name":"\u66dd\u5149\u641c\u7d22\u63a8\u8350\u8bcd","items":{"keyword":"Plus Size Cashmere Sweater"}}'
                      >
                        <span>Plus Size Cashmere Sweater</span>
                      </a>
                    </div>
                    <div className="swiper-slide" style={{ marginRight: 12 }}>
                      <a
                        href="/c/flare-leg-pants"
                        data-collect-click='{"page_id":"page_category_product_list","page_name":"\u7c7b\u76ee\u5546\u54c1\u5217\u8868\u9875","page_module":"related searches","event_id":"seo_key","event_name":"\u70b9\u51fb\u641c\u7d22\u63a8\u8350\u8bcd","object_id":"Flare Leg Pants"}'
                        data-collect-impression='{"page_id":"page_category_product_list","page_name":"\u7c7b\u76ee\u5546\u54c1\u5217\u8868\u9875","page_module":"related searches","event_id":"seo_key","event_name":"\u66dd\u5149\u641c\u7d22\u63a8\u8350\u8bcd","items":{"keyword":"Flare Leg Pants"}}'
                      >
                        <span>Flare Leg Pants</span>
                      </a>
                    </div>
                    <div className="swiper-slide" style={{ marginRight: 12 }}>
                      <a
                        href="/c/printed-dresses"
                        data-collect-click='{"page_id":"page_category_product_list","page_name":"\u7c7b\u76ee\u5546\u54c1\u5217\u8868\u9875","page_module":"related searches","event_id":"seo_key","event_name":"\u70b9\u51fb\u641c\u7d22\u63a8\u8350\u8bcd","object_id":"Printed Dresses"}'
                        data-collect-impression='{"page_id":"page_category_product_list","page_name":"\u7c7b\u76ee\u5546\u54c1\u5217\u8868\u9875","page_module":"related searches","event_id":"seo_key","event_name":"\u66dd\u5149\u641c\u7d22\u63a8\u8350\u8bcd","items":{"keyword":"Printed Dresses"}}'
                      >
                        <span>Printed Dresses</span>
                      </a>
                    </div>
                    <div className="swiper-slide" style={{ marginRight: 12 }}>
                      <a
                        href="/c/maxi-dress-with-cardigan"
                        data-collect-click='{"page_id":"page_category_product_list","page_name":"\u7c7b\u76ee\u5546\u54c1\u5217\u8868\u9875","page_module":"related searches","event_id":"seo_key","event_name":"\u70b9\u51fb\u641c\u7d22\u63a8\u8350\u8bcd","object_id":"Maxi Dress With Cardigan"}'
                        data-collect-impression='{"page_id":"page_category_product_list","page_name":"\u7c7b\u76ee\u5546\u54c1\u5217\u8868\u9875","page_module":"related searches","event_id":"seo_key","event_name":"\u66dd\u5149\u641c\u7d22\u63a8\u8350\u8bcd","items":{"keyword":"Maxi Dress With Cardigan"}}'
                      >
                        <span>Maxi Dress With Cardigan</span>
                      </a>
                    </div>
                    <div className="swiper-slide" style={{ marginRight: 12 }}>
                      <a
                        href="/c/short-white-summer-dress"
                        data-collect-click='{"page_id":"page_category_product_list","page_name":"\u7c7b\u76ee\u5546\u54c1\u5217\u8868\u9875","page_module":"related searches","event_id":"seo_key","event_name":"\u70b9\u51fb\u641c\u7d22\u63a8\u8350\u8bcd","object_id":"Short White Summer Dress"}'
                        data-collect-impression='{"page_id":"page_category_product_list","page_name":"\u7c7b\u76ee\u5546\u54c1\u5217\u8868\u9875","page_module":"related searches","event_id":"seo_key","event_name":"\u66dd\u5149\u641c\u7d22\u63a8\u8350\u8bcd","items":{"keyword":"Short White Summer Dress"}}'
                      >
                        <span>Short White Summer Dress</span>
                      </a>
                    </div>
                  </div>
                  <span
                    className="swiper-notification"
                    aria-live="assertive"
                    aria-atomic="true"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BodyCollection;

// export async function getStaticProps(){
//     const req = await fetch('/api/products');
//     const products = await req.json();

//     return (
//      products
//     );
//   }
