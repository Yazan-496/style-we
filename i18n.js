"use client";

import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import commonEn from "./public/locales/en/translation.json";
import commonAe from "./public/locales/ae/translation.json";
// Add your language resources here
const resources = {
  en: {
    translation: commonEn,
    direction: "ltr", // تعيين الاتجاه للغة الإنجليزية (LTR)
  },
  ae: {
    translation: commonAe,
    direction: "rtl", // تعيين الاتجاه للغة الإنجليزية (LTR)
  },
};
const savedLanguage =
  typeof window !== "undefined" && localStorage.getItem("language"); // استرجاع اللغة المحفوظة من التخزين المحلي

i18n.use(initReactI18next).init({
  resources,
  lng: savedLanguage || "en",
  debug: false,
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
