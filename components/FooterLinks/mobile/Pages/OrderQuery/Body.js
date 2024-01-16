import React from "react";
import Image from "helpers/image";

const Body = () => {
  return (
    <>
      <div className="page-content">
        <p className="tips">
          View and track your orders! Enter your order email address and order
          No. below
        </p>
        <div className="input-wrap">
          <input
            type="email"
            className="input email-input"
            placeholder="Enter email address"
            defaultValue=""
          />
          <p className="error-msg" />
        </div>
        <div className="input-wrap input-fix-wrapper">
          <input
            type="text"
            className="input order-no-input"
            placeholder="Enter order No."
            defaultValue=""
          />
          <p className="error-msg" />
        </div>
        <button className="submit-btn" type="button">
          SUBMIT
        </button>
        <div className="contact-us-wrap">
          <p className="tips">
            If you run into any issues, please don't hesitate to contact us.
            <a className="action">Contact us</a>
          </p>
        </div>
      </div>
    </>
  );
};
export default Body;
