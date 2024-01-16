import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { SvgLoader } from "../../../../svgs";
import { useDispatch, useSelector } from "react-redux";
import ItemsOrder from "../../../../CardModal/desktop/ShowItemsInCart/ItemsOrder";
import Loading from '../../../../Loading';
import { TransClient } from "helpers/TransClient";

const ModalOrderBody = ({ order, refresh, setRefresh }) => {
  const [selectAll, setSelectAll] = useState(false);
  const [selected, setSelected] = useState(false);
  const [total, setTotal] = useState(false);
  const [saved, setSaved] = useState(false);
  const { t, i18n } = useTranslation("translation");
  useEffect(() => {
  });
  return (
<>
    <div className="flex flex-col px-2 pb-[10px]  w-full  overflow-hidden">
      <div>
        {order?.details?.length > 0 && (
          <ItemsOrder
            setRefresh={(a) => setRefresh(a)} refresh={refresh}
            setSelected={(selected) => setSelected(selected)}
            setTotal={(total) => setTotal(total)}
            items={order?.details}
            selectAll={selectAll}
            order={order}
            setSaved={(saved) => setSaved(saved)}
          />
        )}
      </div>
      <div dir={TransClient("user.dir")} className="flex flex-col items-start justify-start">
        <div>
        <span className="font-[600]">{t("user.order_amount")}: </span> <span>{order?.order_amount_formatted}</span></div>
        <div> <span className="font-[600]">{t("user.shipping_cost")}: </span> <span>{order?.shipping_cost_formatted}</span></div>
      <div><span className="font-[600]">{t("user.discount_coupon")}: </span> <span>{order?.discount_amount_formatted}</span></div>
      </div>
    </div>
</>
  );
};
export default ModalOrderBody;
