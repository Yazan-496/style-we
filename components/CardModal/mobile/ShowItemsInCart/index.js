import React, { useEffect, useRef, useState } from "react";
import Offer from "./Offer";
import { SvgCheckbox } from "components/svgs";
import { useSelector } from "react-redux";
import { store } from "store";
import ButtonCheckout from "../../desktop/ShowItemsInCart/ButtonCheckout";
import AlsoLike from "./AlsoLike";
import Items from "./Items";
import Coupon from "../../../PaymentMethod/components/Coupon"

const ShowItemsInCart = ({ items, setPriceForFree, shippingCart }) => {
  const checkRef = useRef([]);
  const [total, setTotal] = useState("");
  const [selected, setSelected] = useState("");
  const [selectAll, setSelectAll] = useState(false);
  const [saved, setSaved] = useState("");
  const [check, setCheck] = useState(true);
  let checkedItems = useSelector((store) => store.CartReducer.items);

  const handleCheck = (i, item) => {
    if (checkRef?.current) {
      checkRef.current[i] = !checkRef.current[i];
    }
    setCheck(!check);
    handleCheckedItems(item);
  };
  const handleCheckedItems = (item) => {
    if (checkedItems?.indexOf(item) !== -1) {
      checkedItems?.splice(checkedItems.indexOf(item), 1);
    } else {
      checkedItems.push(item);
    }
  };
  const handleDeleteFromCart = (item, i) => {
    if (typeof window !== "undefined") {
      items.splice(items.indexOf(item), 1);
      localStorage.setItem("ADD_TO_CART", JSON.stringify(items));
      store.dispatch({ type: "SYNC" });
    }
  };
  useEffect(() => {
    // console.log(items, "items");
  }, [items]);
  return (
    <>
      <div
        style={{
          flex: "1 1 auto",
          maxWidth: "-webkit-fill-available",
        }}
        className="container h-full overflow-auto"
      >
        <div className="pb-[50px] flex flex-warp relative justify-start items-center self-stretch flex-grow-0 flex-shrink-0 gap-2 bg-[#f2f2f3]">
          {items?.length > 0 && (
            <Items
              setPriceForFree={(priceForFree) => setPriceForFree(priceForFree)}
              setSelected={(selected) => setSelected(selected)}
              setTotal={(total) => setTotal(total)}
              items={items}
              selectAll={selectAll}
              shippingCart={shippingCart}
              setSaved={(saved) => setSaved(saved)}
            />
          )}
        </div>
        <div className="fixed w-full bottom-0 z-20">
          {<ButtonCheckout
              coupon={true}
              items={items}
              selectAll={selectAll}
              setSelectAll={(selectAll) => setSelectAll(selectAll)}
              total={total}
              saved={saved}
              shippingCart={shippingCart}
              selected={selected}
              isMobile={true}

          />}
        </div>
      </div>
    </>
  );
};
export default ShowItemsInCart;
