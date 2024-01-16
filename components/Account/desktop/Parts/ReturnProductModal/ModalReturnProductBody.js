import React, { useEffect, useState } from 'react';
import { PiEyeClosed, PiEyeThin } from 'react-icons/pi';
import { useDispatch, useSelector } from 'react-redux';
import { ArrowSvgUp, SvgLoader } from '../../../../svgs';
import { useTranslation } from 'react-i18next';
import DeleteIcon from '@mui/icons-material/Delete';

const ModalReturnProductBody = ({ setLoading, product, type, order }) => {
  const { t, i18n } = useTranslation('translation');
  const [formData, setFormData] = useState({
    details: product?.return_request_product_details,
    reason: product?.return_request_product_reason_id,
    quantity: product?.quantity,
    images: product?.images_url,
  });
  const checkoutLoading = useSelector(
    (state) => state?.CheckoutReducer?.checkoutLoading
  );
  const returnRequestId = useSelector(
      (state) => state?.CheckoutReducer?.orderRequestId
  );
  const Reasons = useSelector((state) => state?.CheckoutReducer?.Reasons);
  const [errors, setErrors] = useState({});
  const dispatch = useDispatch();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: null,
    }));
  };

  const validateFormData = (data) => {
    const errors = {};
    if (!data.quantity) {
      errors.quantity = t('user.quantity_is_required');
    }
    if (!data.reason) {
      errors.reason = t('user.reason_is_required');
    }
    return errors;
  };
  useEffect(() => {
  }, [product]);
  useEffect(() => {}, [type, product]);
  const onSave = async (e) => {
    const validationErrors = validateFormData(formData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      dispatch({
        type: 'STORE_RETURN_PRODUCT',
        payload: {
          type: type,
          quantity: formData.quantity,
          details: formData.details,
          images: formData.images,
          returnRequestReasonId: formData.reason,
          productId: product.product_id,
          returnRequestProductId: product.return_request_product_reason_id,
          orderId: product?.detail_id,
          returnRequestId: returnRequestId,
          isForExchange: product?.is_for_exchange || 0,
        },
      });
    }
  };
  return (
    <div className="flex flex-col px-2 pb-[10px]  w-full">
      <form className="indexstyle-sc-1ta56kz-0 fnEqht">
        <div className="flex flex-col items-center justify-center">
          <h1>{product?.name}</h1>
          <h1>{product?.product_price_formatted}</h1>
          <h1>{product?.quantity}</h1>
          <img
            className="w-[48%]"
            src={product?.image_url}
            alt={product?.image_url}
          />
        </div>
        <div className="p-4">
          <label
            id="quantity"
            placeholder={t('user.quantity')}
            className="indexstyle-sc-1p4nwz9-0 erPdbt  iIBTwB-password"
          >
            <input
                className="appearance-none h-full w-full border border-gray-300 rounded-l rounded-r-none py-2 px-4 leading-tight focus:outline-none"
              type={'number'}
              autoComplete="on"
              name="quantity"
              max={product?.quantity}
              min={1}
              defaultValue={product?.quantity}
              onChange={handleChange}
              placeholder={t('user.quantity')}
              required=""
            />
            {errors.quantity && (
              <small className="my-1 w-full bg-red-200">
                {errors.quantity}
              </small>
            )}
          </label>
        </div>
        <div className="p-4">
          <label
            id="reason"
            placeholder={t('user.reason')}
            className="indexstyle-sc-1p4nwz9-0 erPdbt  iIBTwB-password"
          >
            <select
              name="reason"
              onChange={handleChange}
              placeholder={t('user.reason')}
              required=""
              defaultValue={parseInt(product?.return_request_product_reason_id)}
              className="appearance-none h-full w-full border border-gray-300 rounded-l rounded-r-none py-2 px-4 leading-tight focus:outline-none"
            >
              <option className="w-full">select a reason</option>
              {Reasons?.map((reason) => {
                return (
                  <option
                    className="w-full"
                    key={reason?.id}
                    value={reason?.id}
                  >
                    {reason?.reason}
                  </option>
                );
              })}
            </select>
            <div className="absolute inset-y-0 right-0 pr-2 flex items-center pointer-events-none">
              <ArrowSvgUp rotate={180} />
            </div>
            {errors.reason && (
              <small className="my-1 w-full bg-red-200">{errors.reason}</small>
            )}
          </label>
        </div>
        <div className="p-4">
          <label
            id="details"
            placeholder={t('user.details')}
            className="indexstyle-sc-1p4nwz9-0 erPdbt  iIBTwB-password"
          >
            <input
                className="appearance-none h-full w-full border border-gray-300 rounded-l rounded-r-none py-2 px-4 leading-tight focus:outline-none"
              type={'text'}
              autoComplete="on"
              name="details"
              defaultValue={product?.return_request_product_details}
              onChange={handleChange}
              placeholder={t('user.details')}
              required=""
            />
            {errors.details && (
              <small className="my-1 w-full bg-red-200">{errors.details}</small>
            )}
          </label>
        </div>
        <div className="hidden px-4 flex flex-wrap">
          {formData?.images?.length > 0 &&
            formData?.images?.map((image) => {
              return (
                <div className="rounded-[4px] border border-[#e7e7e7] relative w-[200px] h-[200px]">
                  <img
                    className="bg-white object-contain w-full h-full"
                    src={image}
                    alt={image}
                  />
                  <div className="rounded-[4px] absolute top-0 right-0 text-white bg-red-500 p-2">
                    <DeleteIcon fontSize="12" className="mb-1" />
                  </div>
                </div>
              );
            })}
        </div>
        <div className="p-4">
          <button
            disabled={checkoutLoading}
            className={`
              ${
                checkoutLoading ? 'cursor-not-allowed ' : ' cursor-pointer'
              } w-full min-h-[48px] hover:opacity-[0.8] text-white transition-opacity tracking-wide uppercase transition-duration-1000 leading-4 pr-[9px] font-[600] flex items-center justify-center text-lg p-4 bg-[rgb(49,53,60)] text-[var(--c-gray-rgb255255)]
            `}
            onClick={onSave}
          >
            {checkoutLoading ? (
              <p className=" flex-grow-0 flex-shrink-0 text-lg font-bold">
                <SvgLoader />
              </p>
            ) : (
            t('user.save')
            )}
          </button>
        </div>
      </form>
    </div>
  );
};
export default ModalReturnProductBody;
