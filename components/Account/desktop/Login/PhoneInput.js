import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  ArrowSvgUp,
  SvgArrow,
  SvgArrowLeft,
  SvgCheckbox,
  SvgLoader,
  WhatsappSvg,
} from '../../../svgs';
import { RiMessage2Line } from 'react-icons/ri';
import { useDispatch, useSelector } from 'react-redux';
import store from '../../../../store';

const PhoneInput = ({
  onNextOTP,
  onSwitchToMain,
  setData,
  customerInfo,
  setIsWhatsapp,
  countries,
}) => {
  const { t, i18n } = useTranslation('translation');
  const [countryDialingCode, setCountryDialingCode] = useState(customerInfo);
  const dispatch = useDispatch();
  const validateNumber = useSelector(
    (state) => state.AuthReducer?.validateNumber
  );
  const validateEmail = useSelector(
    (state) => state.AuthReducer?.validateEmail
  );
  const authLoading = useSelector((state) => state.AuthReducer?.authLoading);
  const verificationId = useSelector(
    (state) => state.AuthReducer?.verificationId
  );
  const [formData, setFormData] = useState({
    emailOrPhone: null,
    phoneNumber: null,
    email: null,
    dial: countries?.length > 0 ? countries[0]?.phonecode : null,
    isEmail: false,
  });
  const [countrySelected, setcountrySelected] = useState(countries[0]?.phonecode);
  const [showSMSButton, setShowSMSButton] = useState(countries[0]?.otp_by_sms == 1);
  const [showWhatsappButton, setShowWhatsappButton] = useState(countries[0]?.otp_by_whatsapp === 1);
  const [isWhatsappSMS, setIsWhatsappSMS] = useState({
    isWhatsapp: 1,
    isSMS: 1,
  });
  const [errors, setErrors] = useState({});
  const checkIfWhatsappOrSMS = (phoneCode) => {
    const country = countries.find(
      (item) => item.phonecode === parseInt(phoneCode.replace('+', ''))
    );
    if (country) {
      setIsWhatsappSMS({
        isWhatsapp: country.otp_by_whatsapp,
        isSMS: country.otp_by_sms,
      });
    }
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'dial') {
      checkIfWhatsappOrSMS(value);
      setFormData({
        ...formData,
        [e.target.name]: value,
      });
      setErrors({
        ...errors,
        [name]: null,
      });
      const selectedCountry = countries.find(country => `+${country.phonecode}` === value);
      if (selectedCountry) {
        setShowWhatsappButton(selectedCountry.otp_by_whatsapp === 1);
        setShowSMSButton(selectedCountry.otp_by_sms === 1);
      }
    }
    if (name === 'emailOrPhone') {
      validateInput(value);
    }
    if (name === 'phoneNumber') {
      isValidPhoneNumber(value);
      setFormData({
        ...formData,
        [e.target.name]: value,
      });
      setErrors({
        ...errors,
        [name]: null,
      });
    }
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: null,
    }));
  };
  const validateInput = (value) => {
    if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        email: value,
        isEmail: true,
      }));
      // isValidEmail(value);
    } else if (/^\d+$/.test(value)) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        phoneNumber: value,
        isEmail: false,
      }));
      isValidPhoneNumber(value);
    } else {
    }
  };

  const handleSubmit = async (e, whatsapp, email) => {
    setIsWhatsapp(whatsapp);
    e.preventDefault();
    const validationErrors = validateFormData(formData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      // if (validateNumber || validateEmail) {
      dispatch({
        type: 'SEND_OTP',
        payload: {
          phoneNumber: `${formData.dial}${formData.phoneNumber}`,
          whatsapp: whatsapp,
          isEmail: email,
          email: formData.email,
        },
      });
      // } else if (!validateNumber) {
      //   dispatch({ type: "INVALIDATE_NUMBER" });
      // setErrors({ ...errors, phoneNumber: "Phone Number Already Exists" });
      // } else if (!validateEmail) {
      //   dispatch({ type: "INVALIDATE_EMAIL" });
      // setErrors({ ...errors, email: "Email Already Exists" });
      // }
    }
  };

  const validateFormData = (data) => {
    const errors = {};

    return errors;
  };

  // const isValidEmail = async (email) => {
  //   if (email) {
  //     dispatch({
  //       type: 'CHECK_EMAIL',
  //       payload: { email: email },
  //     });
  //   }
  //   return new Promise((resolve) => {
  //     resolve(validateEmail);
  //   });
  // };
  const isValidPhoneNumber = async (number) => {
    if (number.length > 5) {
      // dispatch({
      //   type: "CHECK_NUMBER",
      //   payload: { phoneNumber: `${formData.dial}${number}` },
      // });
    }
    return new Promise((resolve) => {
      resolve(validateNumber);
    });
  };
  useEffect(() => {
    if (verificationId) {
      setData(formData);
      onNextOTP();
    }
  }, [verificationId]);
  useEffect(() => {
    setFormData({
      ...formData,
      dial: countries[0]?.phonecode,
    });
  }, [countries]);
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
  return (
    <li className="w-[90%] flex items-center justify-center">
      <form
        className="indexstyle-sc-1dc6l7e-0 hIdWHO"
        onSubmit={(e) => handleSubmit(e, false, false)}
      >
        <div className="p-4 register-header flex flex-row items-center justify-between">
          <h1 className="cursor-pointer register-title font-[600] text-lg"></h1>
          <h1 className="register-title font-[600] text-lg">
            {t('user.confirm_phone')}
          </h1>
          <h1 className="register-title font-[600] text-lg"></h1>
        </div>
        <div className="  p-4">
          <label
            id="email"
            // placeholder={t("user.email_or_phone")}
            placeholder={'963 .... OR email'}
            className="indexstyle-sc-1p4nwz9-0 fSxngv  flex flex-col w-full iIBTwB-phone"
          >
            {' '}
            <div className="flex items-center relative">
              <select
                name="dial"
                defaultValue={'+' + countries[0]?.phonecode}
                onChange={handleChange}
                className="appearance-none h-full bg-gray-50 border-r-0 w-[20%] border border-gray-300 rounded-l rounded-r-none py-2 leading-tight focus:outline-none"
              >
                {countries.map((country, i) => {
                  return (
                    country.isAccess && (
                      <option
                        defaultChecked={i === 0}
                        key={country.iso}
                        value={'+' + country.phonecode}
                      >
                        +{country.phonecode}
                      </option>
                    )
                  );
                })}
              </select>
              <div className="absolute inset-y-0 right-[80%] flex items-center pointer-events-none">
                <ArrowSvgUp rotate={180} />
              </div>
              <input
                autoComplete="on"
                name="phoneNumber"
                placeholder={t('user.phone_number')}
                required=""
                type="number"
                value={formData.phoneNumber}
                onChange={handleChange}
                className="w-[80%] rounded-r rounded-l-none border border-l-0 border-gray-300 py-2 px-4 leading-tight focus:outline-none"
              />
            </div>
            {errors.phoneNumber && (
              <small className="my-1 w-full bg-red-200">
                {errors.phoneNumber}
              </small>
            )}
          </label>
        </div>
        {formData?.isEmail ? (
          <div className="p-2">
            <button
              onClick={(e) => handleSubmit(e, false, true)}
              className={`
              ${
                authLoading ? 'cursor-not-allowed ' : ' cursor-pointer'
              } w-full min-h-[48px] hover:opacity-[0.8] transition-opacity tracking-wide transition-duration-1000 leading-4 pr-[9px] font-[600] flex items-center justify-center text-lg p-4 bg-[rgb(49,53,60)] text-[var(--c-gray-rgb255255)]
            `}
              type="submit"
              disabled={authLoading}
            >
              {authLoading ? (
                <p className=" flex-grow-0 flex-shrink-0 text-lg font-bold">
                  <SvgLoader />
                </p>
              ) : (
                t('user.send_otp_via_email')
              )}
            </button>
          </div>
        ) : (
          <>
            <div className="p-2">
              <button
                className={` text-white  ${showWhatsappButton ? '' : 'hidden '}
      ${
        authLoading ? 'cursor-not-allowed ' : ' cursor-pointer'
      } gap-2 flex items-center justify-center w-full min-h-[48px] hover:opacity-[0.8] transition-opacity tracking-wide transition-duration-1000 leading-4 pr-[9px] font-[600] flex items-center justify-center text-lg p-4 bg-green-500 text-[var(--c-gray-rgb255255)]
    `}
                type="submit"
                disabled={authLoading}
                onClick={(e) => handleSubmit(e, true, false)}
              >
                <WhatsappSvg />
                {authLoading ? (
                  <p className=" flex-grow-0 flex-shrink-0 text-lg font-bold">
                    <SvgLoader />
                  </p>
                ) : (
                  t('user.send_otp_via_whatsapp')
                )}
                <p className="w-6 flex-grow-0 flex-shrink-0 text-lg font-bold"></p>
              </button>
            </div>
            <div className="p-2">
              <button
                onClick={(e) => handleSubmit(e, false, false)}
                className={` text-white  ${showSMSButton ? '' : 'hidden '}
              ${
                authLoading ? 'cursor-not-allowed ' : ' cursor-pointer'
              } w-full min-h-[48px] hover:opacity-[0.8] gap-x-2 transition-opacity tracking-wide transition-duration-1000 leading-4 pr-[40px] font-[600] flex items-center justify-center text-lg p-4 bg-[rgb(49,53,60)] text-[var(--c-gray-rgb255255)]
            `}
                type="submit"
                disabled={authLoading}
              >
                <p className="">
                  <RiMessage2Line size={30} />
                </p>
                {authLoading ? (
                  <p className=" flex-grow-0 flex-shrink-0 text-lg font-bold">
                    <SvgLoader />
                  </p>
                ) : (
                  t('user.send_otp_via_phone_number')
                )}
              </button>
            </div>
          </>
        )}
      </form>
    </li>
  );
};
export default PhoneInput;
