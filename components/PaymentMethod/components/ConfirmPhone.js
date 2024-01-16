import Header from "../desktop/Header";
import OTP from "../../Account/desktop/Login/OTP";
import PhoneInput from "../../Account/desktop/Login/PhoneInput";
import ForgotPassword from "../../Account/desktop/Login/ForgotPassword";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loading from "components/Loading";
import store from '../../../store';

const ConfirmPhone = ({ customerInfo }) => {
  const dispatch = useDispatch();
  const idToken = useSelector((state) => state.AuthReducer?.idToken);
  const [step, setStep] = useState("Phone");
  const [data, setData] = useState({
    phoneNumber: null,
  });
  const [sitting, setSitting] = useState(null);
  useEffect(() => {
    let sit = JSON.parse(sessionStorage.getItem("SITTING"));
    if (sitting) {
      setSitting(sit)
    } else {
      sit = JSON.parse(sessionStorage.getItem("SITTING"));
      setSitting(sit)
    }
    const unsubscribe = store.subscribe(() => {
      const updatedSitting = JSON.parse(sessionStorage.getItem("SITTING"));
      if (updatedSitting) {
        setSitting(updatedSitting)
      }
    });
    return () => {
      unsubscribe();
    };
  }, []);
  const [countries, setCountries] = useState([])
  useEffect(() => {
    let sit = JSON.parse(sessionStorage.getItem('SITTING'));
    if (sit?.sitting?.countries.length > 0) {
      setCountries(sit?.sitting?.countries);
    } else {
      sit = JSON.parse(sessionStorage.getItem('SITTING'));
      sit?.sitting?.countries.length > 0 && setCountries(sit?.sitting?.countries);
    }
    const unsubscribe = store.subscribe(() => {
      const updatedSitting = JSON.parse(sessionStorage.getItem('SITTING'));
      if (updatedSitting?.sitting?.countries.length > 0) {
        setCountries(updatedSitting?.sitting?.countries);
      }
    });
    return () => {
      unsubscribe();
    };
  }, []);
  const [isWhatsapp, setIsWhatsapp] = useState(false);
  const onNextOTP = () => {
    setStep("OTP");
  };

  const onNextRegister = () => {
    dispatch({
      type: "VERIFY_GUEST",
      payload: { idToken, data },
    });
  };
  const onSwitchToMain = () => {
    // console.log("onSwitchToMain");
    dispatch({ type: "RESET_AUTH_REDUCER" });
    setData({
      phoneNumber: null,
    });
    setStep("Phone");
    setIsWhatsapp(false);
  };
  useEffect(() => {
    onSwitchToMain();
  }, []);
  return (
    <div className="w-full lg:w-[400px] layout-container">
    {!countries?.length > 0 && <Loading />}
    {countries?.length > 0 &&
      (<div className="w-full lg:w-[400px] indexstyle-sc-188xtxu-0 hqtAzk my-cart-wrapper w-full bg-gray-50">
        <div className="w-full lg:w-[400px] layout-container flex items-center justify-center h-[100vh] pb-[200px]">
          <div className="w-full lg:w-[400px]  indexstyle-sc-1uk1vtd-0 gRmITN h-full flex items-center justify-center">
            <div className="flex w-full items-center justify-center space-x-10">
              {step === "Phone" &&(
                <PhoneInput
                  countries={countries}
                  customerInfo={customerInfo}
                  onNextOTP={() => onNextOTP()}
                  setIsWhatsapp={(isWhatsapp) => setIsWhatsapp(isWhatsapp)}
                  onSwitchToMain={onSwitchToMain}
                  setData={(data) => setData(data)}
                />
              )}
              {step === "OTP" && (
                <OTP
                  onNextRegister={() => onNextRegister()}
                  onSwitchToMain={onSwitchToMain}
                  data={data}
                  isWhatsapp={isWhatsapp}
                  customerInfo={customerInfo}
                  isResetPass={true}
                />
              )}
            </div>
          </div>
        </div>
      </div>)
    }
    </div>
  );
};
export default ConfirmPhone;
