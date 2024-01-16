import React, { useEffect, useState } from "react";
import Header from "components/Header/mobile";
import Footer from "components/Footer/mobile";

import { useSelector } from "react-redux";
import { store } from "store";

const Login = () => {
  let loading = useSelector((store) => store.LanguageReducer.loading);
  const lang_code = store.getState().LanguageReducer.langCode;
  let [translations, setTranslations] = useState(
    store.getState().LanguageReducer.data[lang_code]
  );
  useEffect(() => {
    setTranslations(store.getState().LanguageReducer.data[lang_code]);
  }, [loading]);
  return (
    <div>
      <Header />
    </div>
  );
};

export default Login;
