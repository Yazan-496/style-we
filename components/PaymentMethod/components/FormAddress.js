import { ArrowSvgUp, SvgArrow, SvgLoader } from "../../svgs";
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import store from '../../../store';
import { TransClient } from "helpers/TransClient";

const FormAddress = () => {
  const { t, i18n } = useTranslation('translation');
  const dispatch = useDispatch();
  const checkoutLoading = useSelector(
    (state) => state.CheckoutReducer?.checkoutLoading
  );
  const [countries, setCountries] = useState([]);
  const [defaultCountry, setDefaultCountry] = useState(null);
  const [addressType, setAddressType] = useState([]);
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    email: null,
    firstName: null,
    addressOne: null,
    addressTwo: null,
    addressType: null,
    city: null,
    countryId: null,
    postalCode: null,
    dial: countries?.length > 0 ? countries[0]?.phonecode : null,
  });

  const [customerInfo, setCustomerInfo] = useState(null);
  const syncSitting = useSelector((state) => state.AuthReducer.syncSitting);
  useEffect(() => {
    let sit = JSON.parse(sessionStorage.getItem('SITTING'));
    if (sit?.sitting?.countries) {
      setCountries(sit?.sitting?.countries);
      setAddressType(sit?.sitting?.address_type);
      setDefaultCountry(
          sit?.sitting?.default_country
      );
    } else {
      sit = JSON.parse(sessionStorage.getItem('SITTING'));
      if(sit?.sitting?.countries.length > 0 ) {
        setCountries(sit?.sitting?.countries);
        setAddressType(sit?.sitting?.address_type);
        setDefaultCountry(
            sit?.sitting?.default_country
        );
      }
    }
    const unsubscribe = store.subscribe(() => {
      const updatedSitting = JSON.parse(sessionStorage.getItem('SITTING'));
      if (updatedSitting?.sitting) {
        setAddressType(updatedSitting?.sitting?.address_type);
        setCountries(updatedSitting?.sitting?.countries);
        setDefaultCountry(
            updatedSitting?.sitting?.default_country
        );
      }
    });
    return () => {
      unsubscribe();
    };
  }, [syncSitting]);
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'dial') {
      setFormData({
        ...formData,
        [name]: value,
      });
      setErrors({
        ...errors,
        [name]: null,
      });
    }
    if (name === 'phoneNumber') {
      setFormData({
        ...formData,
        [name]: value,
      });
      setErrors({
        ...errors,
        [name]: null,
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
      setErrors({
        ...errors,
        [name]: null,
      });
    }
  };

  const validateFormData = (data) => {
    const errors = {};
    // console.log(data);
    if (!data.firstName) {
      errors.firstName = t('user.first_name_is_required');
    }
    if (!data.phoneNumber) {
      errors.phoneNumber = t('user.phone_number_is_required');
    }

    if (!data.email) {
      errors.email = t('user.email_is_required');
    }
    if (!data.countryId) {
      errors.countryId = t('user.country_is_required');
    }
    if (!data.City) {
      errors.city = t('user.city_is_required');
    }
    if (!data.addressType) {
      errors.addressType = t('user.address_type_is_required');
    }
    if (!data.addressOne) {
      errors.addressOne = t('user.address_is_required');
    }
    return errors;
  };
  useEffect(() => {
    dispatch({
      type: 'GET_PREV_ADDRESS',
    });
  }, []);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateFormData(formData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      dispatch({
        type: 'ADD_ADDRESS',
        payload: {
          formData,
        },
      });
    }
  };
  const syncInfo = useSelector((state) => state.AuthReducer.syncInfo);
  useEffect(() => {
    setFormData({
      ...formData,
      countryId: defaultCountry?.nicename,
      addressType: addressType[0],
    });
  }, [defaultCountry, addressType, countries, syncInfo, syncSitting]);

  const [selectOpen, setSelectOpen] = useState(false);

  const handleSelectChange = (event) => {
    setSelectOpen(!selectOpen);
  };
  const [selectOpen1, setSelectOpen1] = useState(false);

  const handleSelectChange1 = (event) => {
    setSelectOpen1(!selectOpen1);
  };
  return (
    <div className="indexstyle-eqiam-0 hoGLcc">
      <div className="content-info">
        <form onSubmit={handleSubmit} className="indexstyle-n2rpxa-0 hVouFa">
          <section className="adderss-form-content">
            <div className="list-panel">
              {/*<span className="login-tips">*/}
              {/*  Already have an account？*/}
              {/*  <span className="login-tips-link">Login</span>*/}
              {/*</span>*/}
              <div className="w-full input-type email-bottom-box">
                <div className="input-type-value">
                  <label
                    className="block relative w-full"
                    placeholder={t('user.email')}
                  >
                    <div className="relative py-3">
                      <input
                        autoComplete="on"
                        className="w-full bg-white border border-gray-400 rounded px-2 py-4 transition duration-200 focus:outline-none placeholder-gray-500"
                        name="email"
                        placeholder={t('user.email')}
                        type="email"
                        onChange={handleChange}
                      />
                      <span className="absolute top-1/2 right-3 transform -translate-y-1/2 cursor-pointer hidden">
                        <svg
                          className="icon"
                          height={200}
                          p-id={6363}
                          t={1662694777667}
                          version="1.1"
                          viewBox="0 0 1024 1024"
                          width={200}
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M512 853.333333a341.333333 341.333333 0 1 0 0-682.666666 341.333333 341.333333 0 0 0 0 682.666666z m150.613333-491.946666a32 32 0 0 1 0 45.226666L557.226667 512l105.386666 105.386667a32 32 0 1 1-45.226666 45.226666L512 557.226667l-105.386667 105.386666a32 32 0 0 1-45.226666-45.226666L466.773333 512 361.386667 406.613333a32 32 0 0 1 45.226666-45.226666L512 466.773333l105.386667-105.386666a32 32 0 0 1 45.226666 0z"
                            fill="#000000"
                            fillOpacity=".2"
                            p-id={6364}
                          />
                        </svg>
                      </span>
                    </div>
                    {errors.email && (
                      <small className="my-1 w-full bg-red-200">
                        {errors.email}
                      </small>
                    )}
                  </label>
                </div>
              </div>
              {/*<label className="select-address">*/}
              {/*  <input*/}
              {/*    className="input-checked-form asd"*/}
              {/*    name="newsletter"*/}
              {/*    type="checkbox"*/}
              {/*  />*/}
              {/*  <span className="select-address-txt">*/}
              {/*    {t("user.Keep_me")}*/}
              {/*  </span>*/}
              {/*</label>*/}
            </div>
            <div className="list-panel">
              <p className={`text-black text-xl font-bold leading-6 mt-2 mb-6 text-${TransClient("direction-reverse")} uppercase`}>{t('user.shipping_address')}</p>
              <div className="flex w-full">
                  <div className="items-center flex relative">
                    <label className="block relative w-full before:text-gray-400 before:text-sm before:pl-3 absolute before:top-1/2 before:-translate-y-1/2 transition-all duration-200 before:w-full before:z-[-1]" placeholder="First name">
                      <div className="relative">
                        <input
                          autoComplete="on"
                          maxLength={20}
                          name="firstName"
                          placeholder={t('user.name')}
                          type="text"
                          onChange={handleChange}
                          className="bg-white border border-gray-400 rounded text-black font-inherit text-base h-12 leading-5 outline-none px-3 w-full transition-all"
                        />
                      </div>
                      {errors.firstName && (
                        <small className="mt-1 block w-full bg-red-200 text-red-800">
                          {errors.firstName}
                        </small>
                      )}
                    </label>
                  </div>
                </div>

                <div className="mb-4 relative text-left">
                  <div className="flex items-center relative">
                    <label className="block relative w-full before:text-gray-400 before:text-sm before:pl-3 absolute before:top-1/2 before:-translate-y-1/2 transition-all duration-200 before:w-full before:z-[-1]" placeholder="Street name and No., etc">
                      <div className="relative">
                        <input
                          autoComplete="pca-override"
                          maxLength={35}
                          name="addressOne"
                          onChange={handleChange}
                          placeholder={t('user.street')}
                          type="text"
                          className="bg-white border border-gray-400 rounded text-black font-inherit text-base h-12 leading-5 outline-none px-3 w-full transition-all"
                        />
                      </div>
                      {errors.addressOne && (
                        <small className="mt-1 block w-full bg-red-200 text-red-800">
                          {errors.addressOne}
                        </small>
                      )}
                    </label>
                  </div>
                </div>
              <div className="name-line flex flex-col">
                <div className="w-full input-type">
                  <div className="flex items-center relative">
                    <label className="relative w-full" placeholder="State/Province">
                        <div className="relative">
                            <select 
                                className="w-full h-12 px-3 text-gray-500 bg-white border border-gray-400 rounded leading-5 transition-all"
                                // autoComplete="on" 
                                onChange={handleChange}
                                name="addressType"
                                placeholder={t('user.address_type')}
                            >
                                {addressType.map((add, i) => (
                                    <option key={i} value={add}>
                                        {add}
                                    </option>
                                ))}
                            </select>
                            {errors.addressType && (
                                <small className="my-1 w-full bg-red-200">
                                    {errors.addressType}
                                </small>
                            )}
                        </div>
                    </label>
                </div>

                </div>
                <div className="mb-4 relative text-left">
                  <div className="flex items-center relative">
                    <label className="block relative w-full before:text-gray-400 before:text-sm before:pl-3 absolute before:top-1/2 before:-translate-y-1/2 transition-all duration-200 before:w-full before:z-[-1]" placeholder="City">
                      <div className="relative">
                        <input
                          autoComplete="pca-override"
                          maxLength={35}
                          name="City"
                          onChange={handleChange}
                          placeholder={t('user.city')}
                          type="text"
                          className="bg-white border border-gray-400 rounded text-black font-inherit text-base h-12 leading-5 outline-none px-3 w-full transition-all"
                        />
                      </div>
                      {errors.city && (
                        <small className="my-1 w-full bg-red-200">
                          {errors.city}
                        </small>
                      )}
                    </label>
                  </div>
                </div>
                <div className="w-full input-type">
                  <div className="flex items-center relative">
                    <label className="relative w-full" placeholder="Country/Region">
                        <div className="relative">
                            <select 
                                className="w-full h-12 px-3 text-gray-500 bg-white border border-gray-400 rounded leading-5 transition-all"
                                // autoComplete="on" 
                                onChange={handleChange}
                                // value={formData?.countryId}
                                id="countryId"
                                name="countryId"
                                placeholder={t('user.country')}
                            >
                                {countries.map((country, i) => (
                                  <option key={country.id} value={country.nicename}>
                                    {country.name}
                                  </option>
                                ))}
                            </select>
                            {errors.countryId && (
                              <small className="my-1 w-full bg-red-200">
                                {errors.countryId}
                              </small>
                            )}
                        </div>
                    </label>
                </div>
              </div>
              <div className="mb-4 relative text-left">
                <div className="flex items-center relative">
                  <label className="block relative w-full before:text-gray-400 before:text-sm before:pl-3 absolute before:top-1/2 before:-translate-y-1/2 transition-all duration-200 before:w-full before:z-[-1]" placeholder="Phone number">
                    <div className="relative">
                      <input
                        autoComplete="pca-override"
                        maxLength={35}
                        name="phoneNumber"
                        onChange={handleChange}
                        placeholder={t('user.phone_number')}
                        type="number"
                        className="bg-white border border-gray-400 rounded text-black font-inherit text-base h-12 leading-5 outline-none px-3 w-full transition-all"
                      />
                    </div>
                    {errors.phoneNumber && (
                      <small className="my-1 w-full bg-red-200">
                        {errors.phoneNumber}
                      </small>
                    )}
                  </label>
                </div>
              </div>
              <div className="mb-4 relative text-left">
                <div className="flex items-center relative">
                  <label className="block relative w-full before:text-gray-400 before:text-sm before:pl-3 absolute before:top-1/2 before:-translate-y-1/2 transition-all duration-200 before:w-full before:z-[-1]" placeholder="Postal Code">
                    <div className="relative">
                      <input
                        autoComplete="on"
                        maxLength={20}
                        name="postalCode"
                        onChange={handleChange}
                        placeholder={t('user.postal_code')}
                        type="text"
                        className="bg-white border border-gray-400 rounded text-black font-inherit text-base h-12 leading-5 outline-none px-3 w-full transition-all"
                      />
                    </div>
                      {errors.postalCode && (
                        <small className="my-1 w-full bg-red-200">
                          {errors.postalCode}
                        </small>
                      )}
                  </label>
                </div>
              </div>
              </div>
            </div>
          </section>
          <div className="bg-white w-full p-3 bottom-0 mx-auto flex justify-center pb-20">
              <div className="w-64 flex justify-center items-center">
                  <button 
                      disabled={checkoutLoading}
                      type="submit" 
                      className="bg-black w-full rounded h-12 flex justify-center items-center"
                  >
                      <div className="text-white truncate">
                          {checkoutLoading ? (
                              <p className="flex-grow-0 flex-shrink-0 text-lg font-bold text-center">
                                  <SvgLoader />
                              </p>
                          ) : (
                              t('user.save_address')
                          )}
                      </div>
                  </button>
              </div>
          </div>

        </form>
      </div>
    </div>
  );
};
export default FormAddress;
