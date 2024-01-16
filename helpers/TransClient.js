"use client"
import Cookies from 'js-cookie';

import commonEn from "/public/locales/en/translation.json";
import commonAe from "/public/locales/ae/translation.json";

function loadTranslations(lang) {
    try {
        return lang === "ae" ? commonAe : commonEn
    } catch (error) {
        // console.log('Error reading translations.json:', error);
        return {};
    }
}

export const TransClient = (str) => {
    let savedLanguage
    savedLanguage = Cookies.get('lang')
    const translations = loadTranslations(savedLanguage);

    const keys = str.split('.');

    let translation = translations;
    for (const key of keys) {
        translation = translation[key];
        if (!translation) {
            return str;
        }
    }

    return translation;
};
