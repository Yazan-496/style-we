import { SvgCheckbox, SvgPhone } from "../../svgs";
import { useDispatch, useSelector } from "react-redux";
import React, { useRef } from "react";
import { useTranslation } from "react-i18next";

const PrevAddress = ({
  prevAddress,
  index,
  id,
  isSelected,
  onSelectAddress,
}) => {
  const { t, i18n } = useTranslation("translation");
  const checkoutLoading = useSelector(
    (state) => state.CheckoutReducer?.checkoutLoading
  );

  const checkedId = useSelector((state) => state.CheckoutReducer?.checkedId);
  const dispatch = useDispatch();
  const handleSelectAddress = () => {
    onSelectAddress(id);
    if (checkedId !== id) {
      dispatch({
        type: "SET_DEFAULT_ADDRESS",
        payload: id,
      });
    }
  };
  return (
    <div
      className="p-4 flex flex-col space-y-2 cursor-pointer border border-b-[#e7e7e7] border-t-[#e7e7e7] border-l-0 border-r-0"
      onClick={handleSelectAddress}
      key={index}
    >
      <div className="flex space-x-2 items-center justify-start">
        <SvgCheckbox click={isSelected} />
        <p className="bg-black text-white p-1 rounded-[5px]">
          {prevAddress.address_type}
        </p>
        <SvgPhone />
        <p>{prevAddress.phone}</p>
      </div>
      <div className="flex space-x-2 items-center justify-start">
        <p className="font-[700] text-lg"> {t("user.email")} :</p>
        <p>{prevAddress.email}</p>
      </div>
      <div className="flex space-x-2 items-center justify-start">
        <p className="font-[700] text-lg">{t("user.contact_person_name")} :</p>
        <p>{prevAddress.contact_person_name}</p>
      </div>
      <div className="flex space-x-2 items-center justify-start">
        <p className="font-[700] text-lg">{t("user.address")} : </p>
        <p>{prevAddress.address}</p>
      </div>
    </div>
  );
};
export default PrevAddress;
