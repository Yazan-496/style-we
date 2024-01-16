import React from "react";

const Header = () => {
  return (
    <div className="payment-method-crumbs flex items-center">
      <span className="payment-nav-crumbs-first">HOME</span>
      <svg
        stroke="#31353C"
        viewBox="0 0 20 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        width={14}
        height={24}
        className="scale-x-[-1] ml-3"
        style={{ transform: "rotate(180deg)", marginLeft: 38 }}
      >
        <path d="m20 8-8 8 8 8" strokeWidth={2} />
      </svg>
      <span className="payment-arrow-right" />
      <a href="/shipping-bag" className="payment-nav-crumbs-first">
        Shopping Bag
      </a>
      <svg
        stroke="#31353C"
        viewBox="0 0 20 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        width={14}
        height={24}
        className="scale-x-[-1] ml-3"
        style={{ transform: "rotate(180deg)", marginLeft: 38 }}
      >
        <path d="m20 8-8 8 8 8" strokeWidth={2} />
      </svg>
      <span className="payment-arrow-right" />
      <span className="payment-nav-crumbs-second">CHECKOUT</span>
    </div>
  );
};
export default Header;
