import React, { useEffect, useRef, useState } from "react";
import Offer from "./Offer";
import Items from "./Items";
import ButtonCheckout from "./ButtonCheckout";
import AlsoLike from "./AlsoLike";
import { Provider, useDispatch, useSelector } from "react-redux";
import { store, persistor } from 'store';

const ShowItemsInCart = ({ items, shippingCart, onCLose }) => {
  const [recentlyProduct, setRecentlyProduct] = useState([]);
  // const loading = useSelector((state) => state?.ProductReducer?.loading);
  // const dispatch = useDispatch();
  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedRecentlyProduct = JSON.parse(
        sessionStorage.getItem("RECENTLY_PRODUCT")
      );
      if (storedRecentlyProduct) {
        setRecentlyProduct(storedRecentlyProduct);
      }
    }
  }, []);
  const [itemsInCart, setItemsInCart] = useState([]);
  useEffect(() => {
    if (shippingCart) {
      setItemsInCart(shippingCart?.cart);
    }
  }, [shippingCart]);

  const [total, setTotal] = useState("");
  const [selected, setSelected] = useState("");
  const [selectAll, setSelectAll] = useState(false);
  const [saved, setSaved] = useState("");
  useEffect(() => {
    // console.log(selected, "selected");
  }, [selected]);
  return (
    <>

      <div
        style={{
          flex: "1 1 auto",
        }}
        className="container relative h-full overflow-auto pb-[300px] w-full"
      >
        {shippingCart?.cart?.length === 0 ? (
                <div
                    className={` flex flex-col justify-center items-center relative gap-6 pb-10`}
                ><img
                id='ca_img_empty_svg__b'
                width='126'
                height='126'
                src='/image/catalog/activity/cart.png'
            />
              <div className='flex-grow-0 flex-shrink-0 text-lg text-center text-[#5d626a]'>
                {/*{TransClient('main.your_shopping_bag_is_empty')}*/}
                Your Shopping Bag Is Empty
              </div>
                </div>
        ) : <div className="flex flex-col relative justify-start items-center self-stretch flex-grow-0 flex-shrink-0 gap-2 bg-[#f2f2f3]">
          {/*<Offer />*/}
          <div className="slider-cart-item bg-white w-full pt-[16px] relative">
            {items?.length > 0 && (
              <Provider store={store}>
                <Items
                    onCLose={onCLose}
                    setSelected={(selected) => setSelected(selected)}
                    setTotal={(total) => setTotal(total)}
                    items={shippingCart?.cart}
                    selectAll={selectAll}
                    shippingCart={shippingCart}
                    setSaved={(saved) => setSaved(saved)}
                />
              </Provider>
            )}
          </div>
        </div>}
        <Provider store={store}>
          <AlsoLike recentlyProduct={recentlyProduct} itemsInCart={itemsInCart} onCLose={onCLose}/>
        </Provider>
      </div>
      <Provider store={store}>
        {<ButtonCheckout
            onCLose={onCLose}
            items={items}
            selectAll={selectAll}
            setSelectAll={(selectAll) => setSelectAll(selectAll)}
            total={total}
            saved={saved}
            shippingCart={shippingCart}
            selected={selected}
        />}
      </Provider>
    </>
  );
};
export default ShowItemsInCart;
