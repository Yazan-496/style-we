import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { SvgLoader } from "../../../../svgs";
import { useDispatch, useSelector } from "react-redux";
import ItemsOrder from "../../../../CardModal/desktop/ShowItemsInCart/ItemsOrder";
import ItemsModal from "./ItemsModal";

const ModalReturnBody = ({ order, type, padding }) => {
  const [selectAll, setSelectAll] = useState(false);
  const [selected, setSelected] = useState(false);
  const [total, setTotal] = useState(false);
  const [saved, setSaved] = useState(false);
  const { t, i18n } = useTranslation("translation");
  const orderReturnDetails = useSelector(
    (state) => state?.CheckoutReducer?.orderReturnDetails
  );
  useEffect(() => {
  }, [order]);
  return (
    <div className="flex flex-col px-2 pb-[10px]  w-full  overflow-hidden">
      <div>
        {/*{ order?.details?.length > 0 && (*/}
          <ItemsModal
            setSelected={(selected) => setSelected(selected)}
            setTotal={(total) => setTotal(total)}
            items={order?.details}
            selectAll={selectAll}
            order={order}
            type={type}
            padding={padding}
            setSaved={(saved) => setSaved(saved)}
          />
        {/*)}*/}
      </div>
    </div>
  )
};
export default ModalReturnBody;
