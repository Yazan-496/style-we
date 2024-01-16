import React from "react";
import Image from "helpers/image";

const Body = () => {
  return (
    <div className="w-full flex flex-col justify-start items-center relative gap-6 px-14 py-8 rounded bg-white">
      <div className="information-detial braft-output-content">
        <h3 class="information-title">Information</h3>
        <h4 class="information-name">Pre Order Guidance</h4>
        <p>
          <span style={{ color: "#5c5c5c" }}>
            {" "}
            Pre-order means "you can place an order for (an item) with a SPECIAL
            DISCOUNT before it is available for purchase".
          </span>
        </p>
        <p style={{ textIndent: "2em" }} className="p">
          {" "}
        </p>
        <p style={{ textIndent: "2em" }} className="p">
          <span style={{ color: "#5c5c5c" }}>DELIVERY: </span>
        </p>
        <p style={{ textIndent: "2em" }} className="p">
          <strong>
            <span style={{ color: "#003ba5" }}>
              Receiving time = Processing time + Shipping time
            </span>
          </strong>
        </p>
        <p>
          <strong>
            <span style={{ color: "#003ba5" }}>
              {" "}
              25-40 Business Days= 18-28 Business Days + 7-12 Business Days
            </span>
          </strong>
          <br />
          <strong>
            <span style={{ color: "#003ba5" }}>
              {" "}
              Kindly reminder: Pre-sale items will be shipped separately.
            </span>
          </strong>
        </p>
        <p style={{ textIndent: "2em" }} className="p">
          {" "}
        </p>
        <p>
          <span style={{ color: "#5c5c5c" }}>
            {" "}
            LIMITED TIME OFFER: Pre-order items for 20% off
          </span>
        </p>
        <p style={{ textIndent: "2em" }} className="p">
          {" "}
        </p>
        <p style={{ textIndent: "2em" }} className="p">
          <span style={{ color: "#5c5c5c" }}>
            The prices shown on the items are the BIGGEST discounts you will
            enjoy. Place your order NOW before the prices will go up!
          </span>
        </p>
      </div>
    </div>
  );
};
export default Body;
