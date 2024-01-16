import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ArrowSvgUp, SvgLoader } from "../../../../svgs";
import { useDispatch, useSelector } from 'react-redux';
import store from '../../../../../store';

const ModalAddressBody = ({ setLoading, address, isEdit, addressId }) => {
  const handleAddAddress = () => {
    setLoading(true);
  };
  const { t, i18n } = useTranslation('translation');
  const dispatch = useDispatch();
  const checkoutLoading = useSelector(
    (state) => state.CheckoutReducer?.checkoutLoading
  );
  const [countries, setCountries] = useState([]);
  const [defaultCountry, setDefaultCountry] = useState(null);
  const [addressType, setAddressType] = useState([]);
  const [errors, setErrors] = useState({});
  const syncInfo = useSelector((state) => state.AuthReducer.syncInfo);
  const [formData, setFormData] = useState({
    email: isEdit ? address?.email : null,
    phoneNumber: isEdit ? address?.phone : null,
    firstName: isEdit ? address?.contact_person_name : null,
    addressOne: isEdit ? address?.address : null,
    addressTwo: isEdit ? address?.address2 : null,
    addressType: isEdit ? address?.address_type : null,
    city: isEdit ? address?.city : null,
    countryId: isEdit ? address?.country : null,
    postalCode: isEdit ? address?.zip : null,
    dial: countries?.length > 0 ? countries[0]?.phonecode : null,
  });
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

    if (!data.city) {
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
  }, [address]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isEdit) {
      const validationErrors = validateFormData(formData);
      if (Object.keys(validationErrors).length > 0) {
        setErrors(validationErrors);
      } else {
        dispatch({
          type: 'EDIT_ADDRESS',
          payload: {
            id: addressId,
            formData,
          },
        });
      }
    } else {
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
    }
  };
  useEffect(() => {
    if (!isEdit) {
      setFormData({
        ...formData,
        countryId: defaultCountry?.nicename,
        addressType: addressType[0],
      });
    }
  }, [defaultCountry, addressType, countries, syncInfo, syncSitting]);
  return (
    <div className="flex flex-col px-2 pb-[10px]  w-full  overflow-hidden">
      <div className="flex justify-between w-full h-full gap-6">
        <div className="flex-1 w-[432px] relative">
          <form onSubmit={handleSubmit} className="indexstyle-n2rpxa-0 hVouFa">
            <section className=" adderss-form-content">
              <div className="list-panel">
                <div className="input-type">
                  <label
                    className="indexstyle-okpc1p-0 feJXxt placeholder-before show-clear"
                    placeholder={t('user.email')}
                  >
                    <div className="input-warrper">
                      <input
                        autoComplete="on"
                        name="email"
                        defaultValue={formData.email}
                        placeholder={t('user.email')}
                        type="email"
                        onChange={handleChange}
                      />
                      <span className="input-close">
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
                <div className="name-line">
                  <div className="input-type">
                    <div className="input-type-value">
                      <label
                        className="indexstyle-okpc1p-0 dvDDgZ"
                        placeholder="First name"
                      >
                        <div className="input-warrper">
                          <input
                            autoComplete="on"
                            maxLength={20}
                            name="firstName"
                            defaultValue={formData.firstName}
                            placeholder={t('user.name')}
                            type="text"
                            onChange={handleChange}
                          />
                        </div>
                        {errors.firstName && (
                          <small className="my-1 w-full bg-red-200">
                            {errors.firstName}
                          </small>
                        )}
                      </label>
                    </div>
                  </div>
                </div>
                <div className="input-type">
                  <div className="input-type-value">
                    <label
                      className="indexstyle-okpc1p-0 fJrUjM"
                      placeholder="Street name and No., etc"
                    >
                      <div className="input-warrper">
                        <input
                          autoComplete="pca-override"
                          maxLength={35}
                          name="addressOne"
                          defaultValue={formData.addressOne}
                          onChange={handleChange}
                          placeholder={t('user.street')}
                          type="text"
                        />
                      </div>
                      {errors.addressOne && (
                        <small className="my-1 w-full bg-red-200">
                          {errors.addressOne}
                        </small>
                      )}
                    </label>
                  </div>
                </div>
                <div className="name-line flex flex-col">
                  <div className="w-full input-type">
                    <div className="input-type-value">
                      <label
                        className="indexstyle-okpc1p-0 ipLwxy"
                        placeholder="State/Province"
                      >
                        <div className="input-warrper">
                          <select
                            className="country-id-input text-gray-500"
                            autoComplete="on"
                            value={formData.addressType}
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
                          <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                            <ArrowSvgUp rotate={ 180} />
                          </div>
                        </div>
                        {errors.addressType && (
                          <small className="my-1 w-full bg-red-200">
                            {errors.addressType}
                          </small>
                        )}
                      </label>
                    </div>
                  </div>
                  <div className="w-full input-type">
                    <div className="input-type-value">
                      <label
                        className="indexstyle-okpc1p-0 ipLwxy"
                        placeholder="City"
                      >
                        <div className="input-warrper">
                          <input
                            autoComplete="on"
                            maxLength={35}
                            onChange={handleChange}
                            defaultValue={formData.city}
                            name="city"
                            placeholder={t('user.city')}
                            type="text"
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
                    <div className="input-type-value country-id-input w-full">
                      <label
                        className="indexstyle-okpc1p-0 ipLwxy"
                        placeholder="Country/Region"
                      >
                        <div className="input-warrper">
                          <select
                            autoComplete="on"
                            className="country-id-input text-gray-500"
                            id="countryId"
                            name="countryId"
                            onChange={handleChange}
                            value={formData?.countryId}
                            placeholder={t('user.country')}
                          >
                            {countries.map((country, i) => (
                              <option

                                key={country.id}
                                value={country.nicename}
                              >
                                {country.name}
                              </option>
                            ))}
                          </select>
                          <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                            <ArrowSvgUp rotate={ 180} />
                          </div>
                        </div>
                        {errors.countryId && (
                          <small className="my-1 w-full bg-red-200">
                            {errors.countryId}
                          </small>
                        )}
                      </label>
                    </div>
                  </div>
                </div>
                <div className="input-type">
                  <div className="input-type-value">
                    <label
                      className="indexstyle-okpc1p-0 fJrUjM"
                      placeholder="Phone number"
                    >
                      <div className="input-warrper">
                        <input
                          autoComplete="on"
                          maxLength={20}
                          name="phoneNumber"
                          onChange={handleChange}
                          defaultValue={formData.phoneNumber}
                          placeholder={t('user.phone_number')}
                          type="number"
                        />
                        {errors.phoneNumber && (
                          <small className="my-1 w-full bg-red-200">
                            {errors.phoneNumber}
                          </small>
                        )}
                      </div>
                    </label>
                  </div>
                </div>
                <div className="input-type hidden">
                  <div className="input-type-value">
                    <label
                      className="indexstyle-okpc1p-0 fJrUjM"
                      placeholder="Postal Code"
                    >
                      <div className="input-warrper">
                        <input
                          autoComplete="on"
                          maxLength={20}
                          name="postalCode"
                          onChange={handleChange}
                          defaultValue={formData.postalCode}
                          placeholder={t('user.postal_code')}
                          type="text"
                        />
                        {errors.postalCode && (
                          <small className="my-1 w-full bg-red-200">
                            {errors.postalCode}
                          </small>
                        )}
                      </div>
                    </label>
                  </div>
                </div>
              </div>
            </section>
            <div className=" flex justify-center self-stretch flex-grow-0 flex-shrink-0 gap-4 bottom-0 left-0  purchase-btn mt-2 sticky pt-2 bg-white bg-opacity-95 flex-grow items-end">
              <button
                disabled={checkoutLoading}
                type="submit"
                onClick={handleAddAddress}
                className="flex justify-center items-center overflow-hidden rounded disabled:opacity-20 disabled:cursor-not-allowed hover:opacity-80 active:opacity-90 active:shadow-[inset_0px_0px_8px_rgba(0,0,0,0.25)] group cm-btn-primary flex-grow h-12 gap-1"
              >
                <div className="inline-block truncate opacity-1 group-active:opacity-90">
                  <p className="flex-grow-0 flex-shrink-0 text-lg font-bold">
                    {checkoutLoading ? (
                      <p className=" flex-grow-0 flex-shrink-0 text-lg font-bold">
                        <SvgLoader />
                      </p>
                    ) : isEdit ? (
                      ' Edit Address'
                    ) : (
                      'Add New Address'
                    )}
                  </p>
                </div>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
export default ModalAddressBody;
