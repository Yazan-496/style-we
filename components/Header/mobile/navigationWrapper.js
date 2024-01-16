import Menu from "./sideMenu";
import NavElement from "./navElement";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
export default function SideMenu({ closeSideBar, elements }) {
  const { t, i18n } = useTranslation("translation");
  const [lang, setLang] = useState(i18n.language);

  const ChangeLanguage = (language) => {
    i18n.changeLanguage(language);
    // console.log(i18n.language);
    localStorage.setItem("language", language);
    const direction = language === "ae" ? "rtl" : "ltr";
    document.documentElement.lang = language;
    // document.documentElement.dir = direction;
    window.location.href = "/";
  };

  useEffect(() => {}, [lang]);
  const handleChangeLang = (lang) => {
    setLang(lang);
    ChangeLanguage(lang);
  };
  return (
    <div
      id="navigation-wrapper-element"
      className="components-nav__navigation-wrapper"
    >
      <Menu
        closeSideBar={() => {
          closeSideBar();
        }}
        elements={elements}
      />

      <div
        className="nav-close-btn"
        id="nav-close-btn"
        onClick={() => {
          if (typeof window !== "undefined") {
            closeSideBar();
          }
        }}
      >
        <i className="iconfont icon-ch_icon_close"></i>
      </div>
      <div
        id="components-language-element"
        className="components-language-and-currency-languageandcurrency-wrap language"
      >
        <div className="components-language-and-currency-languageandcurrency-header">
          <i
            className="iconfont icon-c_icon_left show"
            onClick={() => {
              if (typeof window !== "undefined") {
                document
                  .getElementById("components-language-element")
                  .classList.remove("show");
              }
            }}
          ></i>
          {t("header.language.language")}
        </div>
        <div className="components-language-and-currency-languageandcurrency-list">
          <div
            className={`${
              lang === "en" ? "active" : ""
            } components-language-and-currency-languageandcurrency-item language `}
            id="language-28"
            code="en"
            onClick={() => handleChangeLang("en")}
          >
            <div className="components-language-and-currency-languageandcurrency-name">
              {t("header.language.english")}
            </div>
            <div className="h-full flex items-center justify-center">
              {lang === "en" && (
                <img src="data:image/svg+xml,%3csvg width='20' height='21' viewBox='0 0 20 21' fill='none' xmlns='http://www.w3.org/2000/svg'%3e %3cpath d='M5 10.0238L8.63636 13.8334L15 7.16669' stroke='%23222222' stroke-width='1.875'/%3e %3c/svg%3e" />
              )}
            </div>
          </div>
          <div
            onClick={() => handleChangeLang("ae")}
            className={`${
              lang === "ae" ? "active" : ""
            } components-language-and-currency-languageandcurrency-item language `}
            id="language-28"
            code="ae"
          >
            <div className="components-language-and-currency-languageandcurrency-name">
              {t("header.language.arabic")}
            </div>
            <div className="h-full flex items-center justify-center">
              {lang === "ae" && (
                <img src="data:image/svg+xml,%3csvg width='20' height='21' viewBox='0 0 20 21' fill='none' xmlns='http://www.w3.org/2000/svg'%3e %3cpath d='M5 10.0238L8.63636 13.8334L15 7.16669' stroke='%23222222' stroke-width='1.875'/%3e %3c/svg%3e" />
              )}
            </div>
          </div>
        </div>
      </div>

      <div
        id="components-currency-element"
        className="components-language-and-currency-languageandcurrency-wrap currency"
      >
        <div className="components-language-and-currency-languageandcurrency-header">
          <i
            className="iconfont icon-c_icon_left show"
            onClick={() => {
              if (typeof window !== "undefined") {
                document
                  .getElementById("components-currency-element")
                  .classList.remove("show");
              }
            }}
          ></i>
          {t("header.language.currency")}
        </div>
        <div className="components-language-and-currency-languageandcurrency-list">
          <div
            className="components-language-and-currency-languageandcurrency-item currency active"
            id="currency-2"
            code="USD"
            idx="0"
          >
            <div className="components-language-and-currency-languageandcurrency-name currency">
              <img
                src="/image/catalog/activity/en.png"
                width="24px"
                height="24px"
                style={{ display: "flex" }}
              />
              <span>
                <font style={{ verticalAlign: "inherit" }}>
                  <font style={{ verticalAlign: "inherit" }}>USD</font>
                </font>
              </span>
              <span className="notranslate" style={{ marginLeft: "8px" }}>
                $
              </span>
            </div>
            <img src="data:image/svg+xml,%3csvg width='20' height='21' viewBox='0 0 20 21' fill='none' xmlns='http://www.w3.org/2000/svg'%3e %3cpath d='M5 10.0238L8.63636 13.8334L15 7.16669' stroke='%23222222' stroke-width='1.875'/%3e %3c/svg%3e" />
          </div>
          <div
            className="components-language-and-currency-languageandcurrency-item currency "
            id="currency-11"
            code="AED"
            idx="1"
          >
            <div className="components-language-and-currency-languageandcurrency-name currency">
              <img
                src="/image/catalog/activity/em.png"
                width="24px"
                height="24px"
                style={{ display: "flex" }}
              />
              <span>AED</span>
              <span className="notranslate" style={{ marginLeft: "8px" }}>
                د.إ
              </span>
            </div>
            <img src="data:image/svg+xml,%3csvg width='20' height='21' viewBox='0 0 20 21' fill='none' xmlns='http://www.w3.org/2000/svg'%3e %3cpath d='M5 10.0238L8.63636 13.8334L15 7.16669' stroke='%23222222' stroke-width='1.875'/%3e %3c/svg%3e" />
          </div>
          <div
            className="components-language-and-currency-languageandcurrency-item currency "
            id="currency-3"
            code="EUR"
            idx="5"
          >
            <div className="components-language-and-currency-languageandcurrency-name currency">
              <img
                src="/image/catalog/activity/eu.png"
                width="24px"
                height="24px"
                style={{ display: "flex" }}
              />
              <span>EUR</span>
              <span className="notranslate" style={{ marginLeft: "8px" }}>
                €
              </span>
            </div>
            <img src="data:image/svg+xml,%3csvg width='20' height='21' viewBox='0 0 20 21' fill='none' xmlns='http://www.w3.org/2000/svg'%3e %3cpath d='M5 10.0238L8.63636 13.8334L15 7.16669' stroke='%23222222' stroke-width='1.875'/%3e %3c/svg%3e" />
          </div>
        </div>
      </div>
    </div>
  );
}
