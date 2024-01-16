import React from "react";
import Image from "helpers/image";

const Body = () => {
  return (
    <div className="layout-container">
      <form className="indexstyle-sc-1vbojcn-0 kZxCIV">
        <h1 className="title">Tracking order</h1>
        <div className="form-item-container">
          <h3 className="description">
            View and track your orders! Enter your order email address and order
            No. below
          </h3>
          <label
            name="email"
            placeholder="Enter email address"
            value=""
            className="indexstyle-sc-1p4nwz9-0 deFzKj">
            <input
              type="email"
              autoComplete="off"
              name="email"
              placeholder="Enter email address"
              required=""
              defaultValue=""
            />
          </label>
          <div className="form-inp-fix">
            <label
              name="orderNo"
              placeholder="Enter order No."
              value=""
              className="indexstyle-sc-1p4nwz9-0 bJDoqY">
              <input
                type="text"
                autoComplete="off"
                name="orderNo"
                placeholder="Enter order No."
                required=""
                defaultValue=""
              />
            </label>
          </div>
          <button className="indexstyle-sc-147lzxr-0 iiKxiz">
            <div className="children-container">submit</div>
          </button>
          <p className="tips">
            If you run into any issues, please don't hesitate to contact us.
            {/* */} {/* */}&nbsp;<a href="/contact-us">Contact us</a>
          </p>
        </div>
      </form>
    </div>
  );
};
export default Body;
