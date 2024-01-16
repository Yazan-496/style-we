import React, { useEffect, useState } from 'react';
import { CloseIconSvg } from 'components/svgs';

const LoginModal = ({ onClose, openModal }) => {
  return (
    <>
      <div
        className={`modal-Overlay  ${openModal ? 'open' : ''} `}
        id=""
        style={{}}
      >
        <div className={`modal-content ${openModal ? 'open' : ''} `}>
          <div className="components-ajax-quick-Shop components-ajax-quick-Shop v1 animation">
            <div className="components-ajax-quick-Shop__top-wrap">
              <div
                id="components-ajax-quick-Shop__img-wrap"
                className="components-ajax-quick-Shop__img-wrap swiper-container swiper-container-initialized swiper-container-horizontal swiper-container-free-mode"
                style={{ height: 346 }}
              >
                <div className="swiper-wrapper">
                  <div
                    className="swiper-slide swiper-slide-visible swiper-slide-active"
                    style={{ marginRight: 4 }}
                  >
                    <img
                      className="swiper-lazy swiper-lazy-loaded"
                      src="/image/catalog/activity/229f9fef7d43d38e75345c10be152ec1.jpg"
                      title="Sleeveless Halter Solid Casual Jumpsuit"
                      data-index={0}
                      style={{ height: 'auto', width: 262 }}
                    />

                    <span
                      className="swiper-notification"
                      aria-live="assertive"
                      aria-atomic="true"
                    />
                  </div>
                  <div
                    className="w-full swiper-slide swiper-slide-visible swiper-slide-next"
                    style={{ marginRight: 4 }}
                  >
                    <img
                      className="swiper-lazy swiper-lazy-loaded"
                      src="/image/catalog/activity/9fb0367d04b9711d0026e5b933dfd5e9.jpg"
                      title="Sleeveless Halter Solid Casual Jumpsuit"
                      data-index={1}
                      style={{ height: 'auto', width: 262 }}
                    />
                  </div>
                </div>
              </div>
              <div className="components-ajax-quick-Shop__baseinfo">
                <div className="components-ajax-quick-Shop__name">
                  <span>Sleeveless Halter Solid Casual Jumpsuit</span>
                </div>
                <div className="components-ajax-quick-Shop__price">
                  <span
                    className="components-ajax-quick-Shop__price-special notranslate"
                    id="custom-product-detail-price"
                  >
                    $36.99
                  </span>
                  <span className="components-ajax-quick-Shop__price-origin config__origin-price notranslate" />
                  <a
                    className="view-detail"
                    href="/products/sleeveless-halter-solid-casual-jumpsuit-13542578?variant=3636472"
                  >
                    Detail <i className="iconfont icon-l_icon_left" />
                  </a>
                </div>
                <div>
                  <div
                    onClick={() => onClose(false)}
                    className="close-icon components-ajax-quick-Shop__close"
                    data-statis-click='{"ec":"login_cancel"}'
                    data-collect-click='{"event_id":"login_cancel"}'
                  >
                    <CloseIconSvg fill="#001" />
                    <img
                      src="/mirage-mobile/image/close_circle_bg.svg"
                      alt=""
                    />
                  </div>
                </div>
                <div
                  className="component-label component__product-activity"
                  id=""
                >
                  <span
                    className="component-label-item  with_icon "
                    data-save='{"icon":"icon-discount_icon_old","label":"SAVE $30 OVER $169 | SAVE $20 OVER $149 | SAVE $10 OVER $109","activity":"automatic_discount"}'
                    data-statis=""
                    data-collect=""
                  >
                    <i className="iconfont icon-discount_icon_old" />
                    <span className="divide divide-vertical-line" style={{}} />
                    <span className="component-label-item-label-text">
                      Get 3rd 20% off
                    </span>
                  </span>
                </div>
                <div
                  id="components-product-options-quick-shop"
                  className="components-product-options"
                >
                  <div
                    className="components-product-options__wrap"
                    id="option-mark-color"
                    data-key="color"
                    data-name="Color"
                  >
                    <div className="components-product-options__label">
                      Color :
                      <span className="components-product-options__color-name">
                        Green
                      </span>
                    </div>
                    <div
                      id="components-product-options__color-wrap"
                      className="components-product-options__content swiper-container notranslate"
                    >
                      <div className="swiper-wrapper">
                        <div
                          className="component-sku-picker-dot swiper-slide components-product-options__circle-item option-actived"
                          data-is-def={0}
                          data-bind-sku='{"image":"catalog\/product\/2022-04-26\/229f9fef7d43d38e75345c10be152ec1.jpg"}'
                          data-color-name="Green"
                          data-custom-label-text=""
                          data-from=""
                        >
                          <img
                            className="component-sku-picker-dot-inner lazyloaded"
                            src="/image/catalog/activity/229f9fef7d43d38e75345c10be152ec1.jpg"
                            data-sku-ids="[2711664,2711665,2711666,2711667,2711668,3636472]"
                            data-key="color"
                            data-color-name="Green"
                            data-handle=""
                            data-variant=""
                            data-index={1}
                            alt=""
                          />
                        </div>
                        <div
                          className="component-sku-picker-dot swiper-slide components-product-options__circle-item"
                          data-is-def={0}
                          data-bind-sku='{"image":"catalog\/product\/2022-06-06\/fa6cbac1de32a57fafb287e06c275634.png"}'
                          data-color-name="Black"
                          data-custom-label-text=""
                          data-from=""
                        >
                          <img
                            className="component-sku-picker-dot-inner lazyloaded"
                            src="/image/catalog/activity/fa6cbac1de32a57fafb287e06c275634.jpg"
                            data-sku-ids="[2843622,2843623,2843624,2843625,2843626,3636473]"
                            data-key="color"
                            data-color-name="Black"
                            data-handle=""
                            data-variant=""
                            data-index={2}
                            alt=""
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div
                    className="components-product-options__wrap"
                    id="option-mark-size"
                    data-key="size"
                    data-name="Size"
                  >
                    <div className="components-product-options__label">
                      Size :
                      <span
                        attr="country"
                        className="components-product-options__size-name"
                      >
                        US
                      </span>
                    </div>
                    <div
                      className="components-product-options__size-guide"
                      style={{ display: 'none' }}
                    >
                      <i className="iconfont icon-p_icon_rules" />
                      <span>Size Guide &gt;</span>
                    </div>
                    <div
                      id="components-product-options__size-wrap"
                      className="components-product-options__content swiper-container notranslate"
                    >
                      <div className="swiper-wrapper">
                        <div
                          className="components-product-options__square-item swiper-slide"
                          data-sku-ids="[3636472,3636473]"
                          data-key="size"
                          data-name="Size"
                          data-index={1}
                          data-value-name="XS"
                          style={{ padding: '0px 7px' }}
                        >
                          XS(4-6)
                        </div>
                        <div
                          className="components-product-options__square-item swiper-slide"
                          data-sku-ids="[2711664,2843622]"
                          data-key="size"
                          data-name="Size"
                          data-index={2}
                          data-value-name="S"
                          style={{ padding: '0px 7px' }}
                        >
                          S(6-8)
                        </div>
                        <div
                          className="components-product-options__square-item swiper-slide"
                          data-sku-ids="[2711665,2843623]"
                          data-key="size"
                          data-name="Size"
                          data-index={3}
                          data-value-name="M"
                          style={{ padding: '0px 7px' }}
                        >
                          M(10)
                        </div>
                        <div
                          className="components-product-options__square-item swiper-slide"
                          data-sku-ids="[2711666,2843624]"
                          data-key="size"
                          data-name="Size"
                          data-index={4}
                          data-value-name="L"
                          style={{ padding: '0px 7px' }}
                        >
                          L(12)
                        </div>
                        <div
                          className="components-product-options__square-item swiper-slide"
                          data-sku-ids="[2711667,2843625]"
                          data-key="size"
                          data-name="Size"
                          data-index={5}
                          data-value-name="XL"
                          style={{ padding: '0px 7px' }}
                        >
                          XL(14)
                        </div>
                        <div
                          className="components-product-options__square-item swiper-slide"
                          data-sku-ids="[2711668,2843626]"
                          data-key="size"
                          data-name="Size"
                          data-index={6}
                          data-value-name="XXL"
                          style={{ padding: '0px 7px' }}
                        >
                          XXL(16)
                        </div>
                      </div>
                    </div>
                  </div>
                  <div
                    className="components-product-options__5left-info"
                    style={{ display: 'none' }}
                  />
                  <div
                    className="components-product-options__size-info"
                    style={{ display: 'none' }}
                  />
                </div>
              </div>
            </div>
            <div className="components-ajax-quick-Shop__add-cart-footer">
              <span
                className="components-ajax-quick-Shop__collect "
                data-wish-trigger=""
                data-product-id={13542578}
              >
                <i className="iconfont icon-global_icon_wishlist_24_normal" />
                <i className="iconfont icon-global_icon_wishlist_24_selected icon_is-collected" />
              </span>
              <div className="components-ajax-quick-Shop__add-cart primary-btn-active">
                Add to cart
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginModal;
