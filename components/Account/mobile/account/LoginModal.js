import React, { useEffect, useState } from "react";
import { CloseIconSvg } from "components/svgs";
import LoginRegister from "../Login/LoginRegister";

const LoginModal = ({ onClose, openModal }) => {
  return (
    <>
      <div
        className={`modal-overlay ${openModal ? "open" : ""} `}
        id=""
        style={{}}
      >
        <div className={`modal-content ${openModal ? "open" : ""} `}>
          <LoginRegister openModal={openModal} onClose={() => onClose(false)} />
        </div>
      </div>
    </>
  );
};

export default LoginModal;
