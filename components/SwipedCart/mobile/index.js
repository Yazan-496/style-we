import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ShowItemsInCart from "components/CardModal/mobile/ShowItemsInCart";
export default function SwipedCart({ open, close }) {
  const [itemsInCart, setItemsInCart] = useState([]);
  const sync = useSelector((store) => store.CartReducer.sync);
  const shippingCart = useSelector((store) => store.CartReducer.shippingCart);
  const cartLoading = useSelector((store) => store.CartReducer.cartLoading);
  const dispatch = useDispatch();
  const [token, setToken] = useState(null);
  useEffect(() => {
    if (typeof window !== "undefined") {
      setToken(JSON.parse(localStorage.getItem("TOKEN_LOCAL_STORAGE"))?.token);
    }
  }, []);
  useEffect(() => {
    if (token) {
      dispatch({ type: "GET_ITEMS_CART" });
    }
  }, [token, sync]);
  const handleClickOutsideBox = (event) => {
    if (typeof window !== "undefined") {
      // 👇️ the element the user clicked
      const box = document?.getElementById("cart-side-bar");
      if (!box?.contains(event.target)) {
        document?.removeEventListener("click", handleClickOutsideBox);
        close();
      }
    }
  };
  if (open) {
    return (
      <div
        id="cart-side-bar"
        onMouseLeave={() => {
          if (typeof window !== "undefined") {
            document?.addEventListener("click", handleClickOutsideBox);
          }
        }}
        className="w-[480px] h-full fixed right-[-1px] top-0 z-[50] flex flex-col bg-[#f2f2f3] swiper-cart-animate"
      >
        <div>
          <div className="flex justify-between items-center p-4 bg-white z-[4] border-b border-[rgba(0,0,0,0.08)]">
            <div className="text-2xl leading-8 font-bold text-[#31353c]">
              Cart
            </div>
            <svg
              onClick={() => close()}
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="flex-grow-0 flex-shrink-0 w-6 h-6 cursor-pointer"
              preserveAspectRatio="xMidYMid meet"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M19.0708 5.98931C19.3637 5.69642 19.3637 5.22155 19.0708 4.92865C18.7779 4.63576 18.303 4.63576 18.0101 4.92865L11.9997 10.939L5.98936 4.92866C5.69647 4.63577 5.22159 4.63577 4.9287 4.92866C4.63581 5.22156 4.63581 5.69643 4.9287 5.98932L10.9391 11.9997L4.92865 18.0101C4.63576 18.303 4.63576 18.7779 4.92865 19.0708C5.22155 19.3637 5.69642 19.3637 5.98931 19.0708L11.9997 13.0604L18.0102 19.0708C18.3031 19.3637 18.7779 19.3637 19.0708 19.0708C19.3637 18.7779 19.3637 18.303 19.0708 18.0101L13.0604 11.9997L19.0708 5.98931Z"
                fill="#31353C"
              ></path>
            </svg>
          </div>
          <div className="flex justify-center items-center swiper-cart-height bg-[white]">
            <div className="flex flex-col justify-center items-center relative gap-6 py-10">
              {itemsInCart?.length === 0 && (
                <img
                  id="ca_img_empty_svg__b"
                  width="126"
                  height="126"
                  src="/image/catalog/activity/cart.png"
                />
              )}
              {itemsInCart?.length > 0 ? (
                <>
                  <ShowItemsInCart items={itemsInCart} />
                  <div className="after bg-g-[#f2f2f3]" style={{ height: 54 }} />
                </>
              ) : (
                <div className="flex-grow-0 flex-shrink-0 text-lg text-center text-[#5d626a]">
                  {/*{t('main.your_shopping_bag_is_empty')}*/}
                  Your Shopping Bag Is Empty
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    return <></>;
  }
}
