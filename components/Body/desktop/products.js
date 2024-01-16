import ProductList from "./productList";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { store } from "store";
import SwipperFeaturedProduct from "./SwipperFeaturedProduct";
import { useTranslation } from "react-i18next";
const Products = ({ section }) => {
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
      <div
        className="mx-auto w-full flex flex-col"
        data-id="534"
        style={{ paddingTop: "0px" }}
      >
        <p className="flex-grow-0 flex-shrink-0 text-2xl leading-[1.5] font-bold text-center text-[#31353c]">
          {t("main.featured_product")}
        </p>
        {section ? (
          <SwipperFeaturedProduct section={section} />
        ) : (
          <>
            <ProductList products={section.products} />
          </>
        )}
      </div>
    </>
  );
};

export default Products;
