import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import OtpInputs from "./otpInputs";
import { SvgArrowLeft, SvgLoader, WhatsappSvg } from "../../../svgs";
import { useDispatch, useSelector } from "react-redux";
import {useRouter} from 'next/navigation';
import { TransClient } from "helpers/TransClient";

const OTP = ({
  customerInfo,
  onNextRegister,
  onSwitchToMain,
  data,
  isResetPass,
  isWhatsapp,
}) => {
  const { t, i18n } = useTranslation("translation");
  const [otp, setOTP] = useState(null);
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const router = useRouter();
  const authLoading = useSelector((state) => state.AuthReducer?.authLoading);
  const PhoneOTP = useSelector((state) => state.AuthReducer?.PhoneOTP);
  const idToken = useSelector((state) => state.AuthReducer?.idToken);
  const authToken = useSelector((state) => state.AuthReducer?.authToken);

  const [resendDisabled, setResendDisabled] = useState(true);
  const [counter, setCounter] = useState(60);
  const successResetPassword = useSelector(
    (state) => state.AuthReducer?.successResetPassword
  );
  const handleResendOTP = () => {
    setResendDisabled(true);
    dispatch({ type: "SET_AUTH_ID_TOKEN", payload: null });
    setCounter(60);
    dispatch({
      type: "SEND_OTP",
      payload: {
        phoneNumber: `${customerInfo}${data.phoneNumber}`,
        whatsapp: isWhatsapp,
      },
    });
  };
  const handleSubmit = (e) => {
    router.refresh();
    if (isResetPass && idToken) {
      onNextRegister();
    } else if (!isResetPass && idToken) {
      dispatch({
        type: 'REGISTER',
        payload: { idToken, data },
      });
    }
  };
  useEffect(() => {
    if (idToken) {
      setLoading(true);
      handleSubmit();
    }
  }, [idToken]);
  useEffect(() => {
    if (otp) {
      dispatch({
        type: "VERIFY_OTP",
        payload: { otp },
      });
    }
  }, [otp]);
  useEffect(() => {
    if (authToken) {
      onNextRegister();
    }
  }, [authToken]);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  useEffect(() => {
    let intervalId;

    if (resendDisabled) {
      intervalId = setInterval(() => {
        setCounter((prevCounter) => prevCounter - 1);
      }, 1000);
    }

    return () => {
      clearInterval(intervalId);
    };
  }, [resendDisabled]);

  useEffect(() => {
    if (counter === 0) {
      setResendDisabled(false);
      setCounter(60);
    }
  }, [counter]);
  return (
    <div className="register-item item overflow-hidden">
      <form
        className="indexstyle-sc-1dc6l7e-0 hIdWHO"
        onSubmit={(e) => handleSubmit(e)}
      >
        <div className="p-10 register-header flex flex-row items-center justify-between">
          <h1
            onClick={onSwitchToMain}
            className="cursor-pointer register-title font-[600] text-lg"
          >
            <SvgArrowLeft />
          </h1>

          <h1 className="register-title font-[400] text-lg">
            {t("user.verification_code")}
          </h1>
          <h1 className="login-title font-[600] text-lg"></h1>
        </div>
        <h1 dir={TransClient("user.dir")} className="login-title font-[600] text-lg px-10">
          {t("user.awesome")} {PhoneOTP} {t("user.proceed")}
        </h1>
        <div className="p-5">
          <OtpInputs
            setOTP={(data) => setOTP(data)}
            numberOfInputs={6}
            token={idToken}
            resendDisabled={resendDisabled}
            authLoading={authLoading}
          />
          {resendDisabled ? (
            <p className="cursor-pointer text-center hover:font-[700] p-4 forgot-password">
              {counter} s
            </p>
          ) : (
            <p
              onClick={handleResendOTP}
              className="cursor-pointer text-center underline hover:font-[700] p-4 forgot-password"
            >
              {t("user.resend_otp")}
            </p>
          )}
          <div className="p-6">
            <button
              className={`
      ${
        authLoading ? "cursor-not-allowed " : " cursor-pointer"
      } gap-2 flex items-center justify-center text-white w-full min-h-[48px] hover:opacity-[0.8] transition-opacity tracking-wide transition-duration-1000 leading-4 pr-[9px] font-[600] flex items-center justify-center text-lg p-4 bg-[rgb(49,53,60)] text-[var(--c-gray-rgb255255)]
    `}
              type="submit"
              disabled={authLoading || !idToken || loading}
              onClick={(e) => handleSubmit(e)}
            >
              {authLoading || loading ? (
                <p className=" flex-grow-0 flex-shrink-0 text-lg font-bold">
                  <SvgLoader />
                </p>
              ) : (
                t("user.continue")
              )}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};
export default OTP;
