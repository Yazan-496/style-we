import React, { useEffect, useState } from "react";
import {
  FacebookSvg,
  GoogleSvg,
  HotSearchSVG,
  CloseIconSvg,
} from "components/svgs";
import IndexRegister from "../../desktop/Login";
import { useSelector } from "react-redux";

const LoginRegister = ({ openModal, onClose }) => {
  useEffect(() => {
    if (typeof window !== "undefined") {
      if (openModal) {
        // Add overflow hidden to the body when the modal is open
        document.body.style.overflow = "hidden";
        // document.body.style.backgroundColor = "rgba(0, 0, 0, 0.4)";
      } else {
        // Restore the default overflow when the modal is closed
        document.body.style.overflow = "auto";
      }

      return () => {
        // Restore the default overflow when the component unmounts
        document.body.style.overflow = "auto";
      };
    }
  }, [openModal]);
  const [activeTab, setActiveTab] = useState(0);
  const [showPassword, setShowPassword] = useState(false);
  const closeModalMobile = useSelector(
    (state) => state?.AuthReducer?.closeModalMobile
  );
  const handleTabClick = (index) => {
    setActiveTab(index);
  };
  useEffect(() => {
    onClose(false);
  }, [closeModalMobile]);
  return (
    <div
      className={`${
        openModal
          ? "component-popup-wrapper-mobile-show"
          : "component-popup-wrapper-mobile"
      }`}
      style={{ display: "block" }}
    >
      <div className="component-popup-wrapper-content">
        <div
          className="components-ajax-auth-login-wrap"
          style={{ display: "block" }}
        >
          <div
            className="components-ajax-auth-login with-top-img"
            style={{ display: "block" }}
          >
            <div
              onClick={() => onClose(false)}
              className="close-icon p-2"
              data-statis-click='{"ec":"login_cancel"}'
              data-collect-click='{"event_id":"login_cancel"}'
            >
              <CloseIconSvg fill="#001" />
              <img src="/mirage-mobile/image/close_circle_bg.svg" alt="" />
            </div>
            <div className="components-ajax-auth-login__scroll-container">
              <div className="p-2">
                <IndexRegister />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginRegister;
