import Image from "next/legacy/image";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { store } from "store";
import { useTranslation } from "react-i18next";
const CartDropDown = (props) => {
  let loading = useSelector((store) => store.LanguageReducer.loading);
  const lang_code = store.getState().LanguageReducer.langCode;
  let [translations, setTranslations] = useState(
    store.getState().LanguageReducer.data[lang_code]
  );
  useEffect(() => {
    setTranslations(store.getState().LanguageReducer.data[lang_code]);
  }, [loading]);
  const { t, i18n } = useTranslation("translation");
  return (
    <>
      <div className="absolute hidden group-hover:flex flex-col justify-center items-center z-50 top-full right-0 iofgjofdpgjidfojg">
        <div className="flex w-full justify-end pr-[8px]">
          <svg
            width="16"
            height="8"
            viewBox="0 0 16 8"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="flex-grow-0 flex-shrink-0"
            preserveAspectRatio="xMidYMid meet"
          >
            <path d="M8 0L16 8H0L8 0Z" fill="white"></path>
          </svg>
        </div>
        <div className="flex-col justify-center items-center self-stretch flex-grow-0 flex-shrink-0 rounded bg-white">
          <div className="flex flex-col justify-center items-center flex-grow-0 flex-shrink-0 w-[448px] relative gap-6 py-10">
            <img
              id="ca_img_empty_svg__b"
              width="126"
              height="126"
              src="/image/catalog/activity/cart.png"
            />
            <div className="flex-grow-0 flex-shrink-0 text-lg text-center text-[#5d626a]">
              {t("main.your_shopping_bag_is_empty")}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CartDropDown;
