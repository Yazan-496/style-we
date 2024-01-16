import Link from "helpers/Link";
import React from "react";
import { useTranslation } from "react-i18next";
import Footer from "../../../Footer/mobile";
export default function Menu({ elements, closeSideBar }) {
  const { t, i18n } = useTranslation("translation");
  return (
    <>
      <div className="main-wrapper">
        <div className="wrapper">
          <ul id="sidebar-nav" className="sidebar-nav">
            {elements?.map((element, index) => (
              <li
                key={index}
                onClick={() => {
                  if (typeof window !== "undefined") {
                    document
                      .getElementById(`${element?.category}${element?.id}`)
                      .classList.add("active");
                    document
                      .getElementById(`sidebar-nav-content`)
                      .classList.add("open");
                  }
                }}
                className={` nav-item ${element?.hot ? "hot" : ""} `}
              >
                <span className="truncate">
                  {element?.category}{" "}
                  <span className="text-sm relative left-0">
                    ({element?.num_available_product})
                  </span>
                </span>

                <i className="iconfont icon-global_arrow_right_12"></i>
              </li>
            ))}
          </ul>
          <div className="components-language-and-currency">
            <div
              className="components-language-and-currency-item language"
              onClick={() => {
                if (typeof window !== "undefined") {
                  document
                    .getElementById("components-language-element")
                    .classList.add("show");
                }
              }}
            >
              <span className="components-language-and-currency-label">
                {t("header.language.language")}
              </span>
              <div style={{ display: "flex", alignItems: "center" }}>
                <span className="components-language-and-currency-value language">
                  {i18n.language === "en" ? "English" : "العربية"}
                </span>
                <i className="iconfont icon-global_arrow_down_12"></i>
              </div>
            </div>
            <div
              className="hidden components-language-and-currency-item currency"
              onClick={() => {
                if (typeof window !== "undefined") {
                  document
                    .getElementById("components-currency-element")
                    .classList.add("show");
                }
              }}
            >
              <span className="components-language-and-currency-label">
                {t("header.language.currency")}
              </span>
              <div style={{ display: "flex", alignItems: "center" }}>
                <span className="components-language-and-currency-value currency">
                  {t("header.language.usd")}
                </span>
                <i className="iconfont icon-global_arrow_down_12"></i>
              </div>
            </div>
          </div>
          <Footer />

          <div className="components-nav-bar__payment-icons">
            <img
              className="footer lazyloaded"
              alt="ApplePay"
              title="ApplePay"
              src="/image/catalog/activity/wQXZD4FaZ81654494839.jpg"
            />
            {/* <Image
          className="media-wrap image-wrap"
          src="/image/catalog/activity/dMOf3EPxXA1648612410.jpg"
          alt="3"
          width="500"
          height="500"
        /> */}
            <img
              className="footer lazyloaded"
              alt="PayWithGoogle"
              title="PayWithGoogle"
              src="/image/catalog/activity/9wYP9VVgin1654494853.jpg"
            />
            {/* <Image
          className="media-wrap image-wrap"
          src="/image/catalog/activity/dMOf3EPxXA1648612410.jpg"
          alt="3"
          width="500"
          height="500"
        /> */}
            <img
              className="footer lazyloaded"
              alt="Paypal"
              title="Paypal"
              src="/image/catalog/activity/EpzeDfnhOHEuSiwe5JGSMn7AOr4PACWfCOPvdpnK.jpg"
            />
            {/* <Image
          className="media-wrap image-wrap"
          src="/image/catalog/activity/dMOf3EPxXA1648612410.jpg"
          alt="3"
          width="500"
          height="500"
        /> */}
            <img
              className="footer lazyloaded"
              alt="Visa"
              title="Visa"
              src="/image/catalog/activity/s4AQRk7keQg1PL8z6basUcXfrWo3FTTPLoADK8zQ.jpg"
            />
            {/* <Image
          className="media-wrap image-wrap"
          src="/image/catalog/activity/dMOf3EPxXA1648612410.jpg"
          alt="3"
          width="500"
          height="500"
        /> */}
            <img
              className="footer lazyloaded"
              alt="Mastercard"
              title="Mastercard"
              src="/image/catalog/activity/CFSmeEi9CnuQj0Nzawwx34UBJ0IauGezE0eMPbbE.jpg"
            />
            {/* <Image
          className="media-wrap image-wrap"
          src="/image/catalog/activity/dMOf3EPxXA1648612410.jpg"
          alt="3"
          width="500"
          height="500"
        /> */}
            <img
              className="footer lazyloaded"
              alt="Maestro"
              title="Maestro"
              src="/image/catalog/activity/GY54JpUUeoNdwJthb4lwKhOmM0BGPArBRnMuqBBt.jpg"
            />
            {/* <Image
          className="media-wrap image-wrap"
          src="/image/catalog/activity/dMOf3EPxXA1648612410.jpg"
          alt="3"
          width="500"
          height="500"
        /> */}
            <img
              className="footer lazyloaded"
              alt="American Express"
              title="American Express"
              src="/image/catalog/activity/r61jbmFv4GzJKO727HLVoERwMj2aaINIrVxPT8hK.jpg"
            />
            {/* <Image
          className="media-wrap image-wrap"
          src="/image/catalog/activity/dMOf3EPxXA1648612410.jpg"
          alt="3"
          width="500"
          height="500"
        /> */}
            <img
              className="footer lazyloaded"
              alt="Diners Club"
              title="Diners Club"
              src="/image/catalog/activity/93RkKE4erOeFWUc5TY53fWwC7uqDfMnN9ctUbykO.jpg"
            />
            {/* <Image
          className="media-wrap image-wrap"
          src="/image/catalog/activity/dMOf3EPxXA1648612410.jpg"
          alt="3"
          width="500"
          height="500"
        /> */}
            <img
              className="footer lazyloaded"
              alt="Discover"
              title="Discover"
              src="/image/catalog/activity/LYx30ZWHHSFHucQXFeKSs4gigEAQ5diX4WgKaijH.jpg"
            />
            {/* <Image
          className="media-wrap image-wrap"
          src="/image/catalog/activity/dMOf3EPxXA1648612410.jpg"
          alt="3"
          width="500"
          height="500"
        /> */}
            <img
              className="footer lazyloaded"
              alt="JCB"
              title="JCB"
              src="/image/catalog/activity/piNgPFlwRlzU4JcvZMDlFnwzFIY0Q8PTxiYSpz4V.jpg"
            />
            {/* <Image
          className="media-wrap image-wrap"
          src="/image/catalog/activity/dMOf3EPxXA1648612410.jpg"
          alt="3"
          width="500"
          height="500"
        /> */}
            <img
              className="footer lazyloaded"
              alt="Carte Bancaire"
              title="Carte Bancaire"
              src="/image/catalog/activity/gdLex5oTmknitDOXUOQvsCdjnvTll5scxGpx8wtJ.jpg"
            />
            {/* <Image
          className="media-wrap image-wrap"
          src="/image/catalog/activity/dMOf3EPxXA1648612410.jpg"
          alt="3"
          width="500"
          height="500"
        /> */}
            <img
              className="footer lazyloaded"
              alt="Afterpay"
              title="Afterpay"
              src="/image/catalog/activity/XoO9JOmQLQHfzpoyKih2tURVZdKEs70m7NHgdZI3.jpg"
            />
            {/* <Image
          className="media-wrap image-wrap"
          src="/image/catalog/activity/dMOf3EPxXA1648612410.jpg"
          alt="3"
          width="500"
          height="500"
        /> */}
            <img
              className="footer lazyloaded"
              alt="Klarna"
              title="Klarna"
              src="/image/catalog/activity/CjIOTU4lgSOTAkB1Jz1CvCND3UuBgQjwgpa72o1S.jpg"
            />
            {/* <Image
          className="media-wrap image-wrap"
          src="/image/catalog/activity/dMOf3EPxXA1648612410.jpg"
          alt="3"
          width="500"
          height="500"
        /> */}
            <img
              className="footer lazyloaded"
              alt="Sofortbanking"
              title="Sofortbanking"
              src="/image/catalog/activity/KIqJG9rrNkRv9WRAskg0RBvx6bgvYrBnUnQFy1dA.jpg"
            />
            {/* <Image
          className="media-wrap image-wrap"
          src="/image/catalog/activity/dMOf3EPxXA1648612410.jpg"
          alt="3"
          width="500"
          height="500"
        /> */}
            <img
              className="footer lazyloaded"
              alt="Ideal"
              title="Ideal"
              src="/image/catalog/activity/6L7bY270lVu3Zb9vskw8syBidYD2wSw6fAFxhzBK.jpg"
            />
            {/* <Image
          className="media-wrap image-wrap"
          src="/image/catalog/activity/dMOf3EPxXA1648612410.jpg"
          alt="3"
          width="500"
          height="500"
        /> */}
            <img
              className="footer lazyloaded"
              alt="Bancontact"
              title="Bancontact"
              src="/image/catalog/activity/oZNipW5me9354Uv8FZJ0ugLaOUFAtvY8tUEEEiph.jpg"
            />
            {/* <Image
          className="media-wrap image-wrap"
          src="/image/catalog/activity/dMOf3EPxXA1648612410.jpg"
          alt="3"
          width="500"
          height="500"
        /> */}
            <img
              className="footer lazyloaded"
              alt="Przelewy24"
              title="Przelewy24"
              src="/image/catalog/activity/zfKDmyJxOgirIoJovUj4qLfkfQT971n8KnmbDeHA.jpg"
            />
            {/* <Image
          className="media-wrap image-wrap"
          src="/image/catalog/activity/dMOf3EPxXA1648612410.jpg"
          alt="3"
          width="500"
          height="500"
        /> */}
            <img
              className="footer lazyloaded"
              alt="blik"
              title="blik"
              src="/image/catalog/activity/xT6RMPbWhH2clTid3SNr4Yp6J1IwyV6wdojuoSmW.jpg"
            />
            {/* <Image
          className="media-wrap image-wrap"
          src="/image/catalog/activity/dMOf3EPxXA1648612410.jpg"
          alt="3"
          width="500"
          height="500"
        /> */}
          </div>
        </div>
        <div className="hidden sidebar-bottom-nav">
          <Link  className="bottom-nav-item" href="/">
              <i className="iconfont icon-global_icon_home_24"></i>
          </Link>
          <Link className="bottom-nav-item" href="/account/collect">
              <i className="iconfont icon-global_icon_wishlist_241"></i>
          </Link>
          <Link className="bottom-nav-item" href="/contact-us">
              <i className="iconfont icon-global_icon_support_24"></i>
          </Link>
          <Link className="bottom-nav-item" href="/account">
              <i className="iconfont icon-icon_header_me"></i>
          </Link>
        </div>

        <div
          className="components-nav-bar-next-page-nav"
          id="sidebar-nav-content"
        >
          {elements?.map((element, index) => (
            <div
              key={index}
              id={`${element?.category}${element?.id}`}
              className="components-nav-bar-next-item"
            >
              <p className="components-nav-bar-title">
                <i
                  className="iconfont icon-global_arrow_left_12 components-nav-bar-back-btn"
                  onClick={() => {
                    if (typeof window !== "undefined") {
                      document
                        .getElementById(`sidebar-nav-content`)
                        .classList.remove("open");
                      setTimeout(() => {
                        document
                          .getElementById(`${element?.category}${element?.id}`)
                          .classList.remove("active");
                      }, 500);
                    }
                  }}
                ></i>{" "}
                <Link
                  href={`/products/category=${element?.slug}`}
                  className="w-[50%] h-[50%] navigation-advertise-href"
                  onClick={() => {
                    if (typeof window !== "undefined") {
                      closeSideBar();
                    }
                  }}
                >
                    <span className="truncate title">
                      {element?.category}{" "}
                      <span className="text-sm relative left-0">
                        ({element?.num_available_product})
                      </span>
                    </span>
                </Link>
              </p>
              <div className="components-nav-bar-content w-fill-available">
                <div className="components-nav-bar-advertise">
                  <Link
                    href={`/products/category=${element?.slug}`}
                    className="w-[50%] h-[50%] navigation-advertise-href"
                    onClick={() => {
                      if (typeof window !== "undefined") {
                        closeSideBar();
                      }
                    }}
                  >
                      <img
                        src={element?.icon}
                        title="hot sale"
                        className="w-[50%] h-[50%] lazyload"
                        alt={element?.icon}
                      />
                  </Link>
                </div>
                {element?.sub_categories?.map((item, index) => (
                  <div
                    key={index}
                    id={`${item.name}${item.id}`}
                    className="components-nav-bar-sec-hd"
                  >
                    <p className="components-nav-bar-sec-hd-title">
                      <Link 
                        href={`/products/category=${element?.slug}`}
                        onClick={() => {
                          // console.log("closed");
                          if (typeof window !== "undefined") {
                            closeSideBar();
                          }
                        }}
                      >
                          <span className="truncate">
                            {item?.name}{" "}
                            <span className="text-sm relative left-0">
                              ({item?.num_available_product})
                            </span>
                          </span>
                      </Link>

                      <Link 
                        href={`/products/category=${element?.slug}`}
                        onClick={() => {
                          // console.log("closed");
                          if (typeof window !== "undefined") {
                            closeSideBar();
                          }
                        }}
                      >
                          <span>{t("main.all")}</span>
                          <i className="iconfont icon-c_icon_right"></i>
                      </Link>
                    </p>
                    <div className="components-nav-bar-third-bd">
                      {item?.childes?.map((subItem, index) => (
                        <Link
                          key={index}
                          href={`/products/category=${subItem.slug}`}
                          className="components-nav-bar-third-bd-item"
                        >
                            <span className="image-icon">
                              <img
                                className="w-[50%] h-[50%] lazyload"
                                src={subItem?.icon}
                                alt={subItem?.icon}
                              />
                            </span>
                            <span className="truncate third-nav">
                              {subItem?.name}{" "}
                              <span className="text-sm relative left-0">
                                ({subItem?.num_available_product})
                              </span>
                            </span>
                        </Link>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
