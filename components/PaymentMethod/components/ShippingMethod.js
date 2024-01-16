import React from "react";
import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import { TransClient } from "helpers/TransClient";

const ShippingMethod = ({ setOrderNote }) => {
  const { t, i18n } = useTranslation("translation");
  const dispatch = useDispatch();
  function handleNote(e) {
    const note = e.target.value;
    if (note) {
      dispatch({ type: "SET_ORDER_NOTE", payload: note });
      setOrderNote(note);
    }
  }

  return (
    <div 
      dir={TransClient("user.dir")}
      className="indexstyle-trkfea-0 iKbZHG bg-white p-5">
      <div className="indexstyle-sc-172cmbz-0 kmQwZW">
      <div className="flex justify-between items-center p-4 pay-title">
          <div className="flex items-center pay-title-left">
              <span className="flex items-center justify-center w-6 h-6 bg-black rounded-full text-white text-lg font-semibold mr-2 pay-panpal-step notranslate">2</span>
              <p className="text-lg font-medium text-gray-600 uppercase pay-name">{t("user.order_note")}</p>
          </div>
          <div className="pay-title-right" />
      </div>
      <label class="block w-full relative p-4 feJXxt show-clear">
          <div class="relative input-warrper border">
              <input class="bg-white border-1 border-gray-400 rounded text-black font-normal text-lg h-12 leading-5 outline-none w-full transition-all duration-200 p-5" 
                    onMouseLeave={handleNote}
                    placeholder={t("user.enter_order_note")} 
                    type="text" 
                    name="note"/>
          </div>
      </label>
      </div>
    </div>
  );
};
export default ShippingMethod;
