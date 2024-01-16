"use client";
import React, { useEffect, useState } from "react";
import HeaderAccount from "./HeaderAccount";
import AppInvite from "components/mobile/appInvite";
import { useSelector } from "react-redux";
import { store } from "store";
import LoginModal from "./LoginModal";
import BodyAccount from "./BodyAccount";
const AccountIndex = () => {
  const [openModal, setOpenModal] = useState(false);
  let loading = useSelector((store) => store.LanguageReducer.loading);
  const lang_code = store.getState().LanguageReducer.langCode;
  let [translations, setTranslations] = useState(
    store.getState().LanguageReducer.data[lang_code]
  );
  useEffect(() => {
    setTranslations(store.getState().LanguageReducer.data[lang_code]);
  }, [loading]);
  const onClose = () => {
    setOpenModal(false);
  };
  const onOpen = () => {
    setOpenModal(true);
  };
  const [token, setToken] = useState(null);
  const [guest, setGuest] = useState(null);
  const [userData, setUserData] = useState(null);
  useEffect(() => {
    if (typeof window !== "undefined") {
      setToken(JSON.parse(localStorage.getItem("TOKEN_LOCAL_STORAGE"))?.token);
      setGuest(JSON.parse(localStorage.getItem("TOKEN_LOCAL_STORAGE"))?.guest);
      setUserData(
        JSON.parse(localStorage.getItem("TOKEN_LOCAL_STORAGE"))?.userData
      );
    }
  }, []);
  return (
    <div>
      {/*<AppInvite/>*/}
      <HeaderAccount onOpen={() => onOpen(true)} />
      <LoginModal openModal={openModal} onClose={() => onClose(false)} />
      <BodyAccount
        guest={guest}
        token={token}
        userData={userData}
        onOpen={() => onOpen(true)}
      />
    </div>
  );
};

export default AccountIndex;
