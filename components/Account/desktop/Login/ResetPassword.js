import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  SvgArrow,
  SvgArrowLeft,
  SvgCheckbox,
  SvgLoader,
  WhatsappSvg,
} from "../../../svgs";
import { PiEyeThin, PiEyeClosed } from "react-icons/pi";
import { useDispatch, useSelector } from "react-redux";

const ResetPassword = ({ onSwitchToMain, data }) => {
  const { t, i18n } = useTranslation("translation");

  const dispatch = useDispatch();

  const idToken = useSelector((state) => state.AuthReducer?.idToken);
  const authLoading = useSelector((state) => state.AuthReducer?.authLoading);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const successResetPassword = useSelector(
    (state) => state.AuthReducer?.successResetPassword
  );
  const verificationId = useSelector(
    (state) => state.AuthReducer?.verificationId
  );
  const [formData, setFormData] = useState({
    password: null,
    confirmPassword: null,
  });
  const [errors, setErrors] = useState({});
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [e.target.name]: value,
    });
    setErrors({
      ...errors,
      [name]: null,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateFormData(formData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      if (idToken) {
        dispatch({
          type: "RESET_PASSWORD",
          payload: {
            phoneNumber: `+${data.phoneNumber}`,
            password: formData.password,
            idToken: idToken,
            email: data?.email,
            dial: data?.dial,
            isEmail: data?.isEmail,
          },
        });
      }
    }
  };

  const validateFormData = (data) => {
    const errors = {};
    if (!data.password) {
      errors.password = t('user.password_is_required');
    } else if (data.password.length < 8) {
      errors.password = t('user.password_should_be_at_least_8');
    } else if (data.password !== data.confirmPassword) {
      errors.confirmPassword = t('user.passwords_do_not_match');
    }
    return errors;
  };

  useEffect(() => {
    if (successResetPassword) {
      onSwitchToMain();
    }
  }, [successResetPassword]);
  return (
    <li className="w-[90%] flex items-center justify-center">
      <form
        className="indexstyle-sc-1dc6l7e-0 hIdWHO w-[380px] max-w-[380px]"
        onSubmit={(e) => handleSubmit(e)}
      >
        <div className="p-4 register-header flex flex-row items-center justify-between gap-2">
          <h1
            onClick={onSwitchToMain}
            className="cursor-pointer register-title font-[600] text-lg"
          >
            <SvgArrowLeft />
          </h1>
          <h1 className="register-title font-[600] text-lg">
            {t("user.reset_password")}
          </h1>
        </div>
        <div className="p-4">
          <label
            id="password"
            placeholder={t("user.password")}
            className="indexstyle-sc-1p4nwz9-0 kEXvcw flex flex-col w-full iIBTwB-password relative"
          >
            <input
              autoComplete="on"
              name="password"
              placeholder={t("user.password")}
              required=""
              value={formData.password}
              onChange={handleChange}
              type={showPassword ? "text" : "password"}
            />
            <div
              className="eye-icon absolute w-6 h-6 top-1/2 right-3 transform -translate-y-1/2 cursor-pointer"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <PiEyeThin size={20} />
              ) : (
                <PiEyeClosed size={20} />
              )}
            </div>
            {errors.password && (
              <small className="my-1 w-full bg-red-200">
                {errors.password}
              </small>
            )}
          </label>
        </div>
        <div className="  p-4">
          <label
            id="confirmPassword"
            placeholder={t("user.reenter_new_password")}
            className="indexstyle-sc-1p4nwz9-0 hJWRSG flex flex-col w-full iIBTwB-confirm relative"
          >
            <input
              autoComplete="on"
              name="confirmPassword"
              placeholder={t("user.reenter_new_password")}
              required=""
              type={showConfirmPassword ? "text" : "password"}
              value={formData.confirmPassword}
              onChange={handleChange}
            />
            <div
              className="eye-icon absolute w-6 h-6 top-1/2 right-3 transform -translate-y-1/2 cursor-pointer"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              {showConfirmPassword ? (
                <PiEyeThin size={20} />
              ) : (
                <PiEyeClosed size={20} />
              )}
            </div>
            {errors.confirmPassword && (
              <small className="my-1 w-full bg-red-200">
                {errors.confirmPassword}
              </small>
            )}
          </label>
        </div>
        <>
          <div className="p-2">
            <button
              onClick={(e) => handleSubmit(e)}
              className={`
              ${
                authLoading ? "cursor-not-allowed " : " cursor-pointer"
              } w-full min-h-[48px] hover:opacity-[0.8] text-white transition-opacity tracking-wide transition-duration-1000 leading-4 pr-[9px] font-[600] flex items-center justify-center text-lg p-4 bg-[rgb(49,53,60)] text-[var(--c-gray-rgb255255)]
            `}
              type="submit"
              disabled={authLoading}
            >
              {authLoading ? (
                <p className=" flex-grow-0 flex-shrink-0 text-lg font-bold">
                  <SvgLoader />
                </p>
              ) : (
                t("user.continue")
              )}
            </button>
          </div>
        </>
      </form>
    </li>
  );
};
export default ResetPassword;
