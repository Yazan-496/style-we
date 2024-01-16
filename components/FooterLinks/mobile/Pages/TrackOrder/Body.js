import React from "react";
import Image from "helpers/image";

const Body = () => {
  return (
    <div
      className="w-full flex flex-col justify-start items-center relative gap-6 px-14 py-8 rounded bg-white"
      style={{ padding: 15 }}>
      <div className="information-detial braft-output-content">
        <h3 class="information-title">Information</h3>
        <h4 class="information-name">How To Track My Order</h4>
        <p
          style={{ textAlign: "start" }}
          size={0}
          _root="undefined"
          __ownerid="undefined"
          __hash="undefined"
          __altered="false">
          <span style={{ lineHeight: "1.65" }}>
            <span style={{ color: "#000000" }}>
              <span style={{ letterSpacing: 0 }}>
                <span style={{ lineHeight: "1.2" }}>
                  <span style={{ fontSize: 16 }}>
                    As to the order status and shipping information of your
                    package, you can refer to "My Account" on our website. When
                    you click on the "View Detail" button, there is a column
                    called “Order Tracking”, where you can view all the detailed
                    information about your order.
                  </span>
                </span>
              </span>
            </span>
          </span>
        </p>
        <p style={{ textAlign: "start", textIndent: "2em" }}>
          <br />
          <span style={{ lineHeight: "1.65" }}>
            <span style={{ letterSpacing: 0 }}>
              <span style={{ lineHeight: "1.2" }}>
                <span style={{ fontSize: 16 }}>
                  <span style={{ color: "#000000" }}>
                    If you have received your order, please click on the
                    "Confirm Delivery" button.
                  </span>
                </span>
              </span>
            </span>
          </span>
          <br />
        </p>
        <p style={{ textAlign: "start", textIndent: "2em" }} />
        <p style={{ textAlign: "start", textIndent: "2em" }}>
          <span style={{ lineHeight: "1.65" }}>
            <span style={{ color: "#000000" }}>
              <strong>Step 1</strong>
            </span>
          </span>{" "}
          <span style={{ lineHeight: "1.65" }}>
            <span style={{ color: "#000000" }}>Log in to "My Account"</span>
          </span>
        </p>
        <p style={{ textAlign: "start", textIndent: "2em" }} />
        <p
          style={{ textAlign: "start", textIndent: "2em" }}
          className="MsoNormal">
          <span style={{ lineHeight: "1.65" }}>
            <span style={{ color: "#111111" }}>
              <span style={{ backgroundColor: "#ffffff" }}>
                You should sign in first with the correct and the same email
                address and password that you used when you made the order.
              </span>
            </span>
          </span>
        </p>
        <p style={{ textAlign: "start", textIndent: "2em" }} />
        <div
          className="media-wrap image-wrap align-start"
          style={{ textAlign: "start" }}>
          <Image
            className="media-wrap image-wrap"
            src="/image/catalog/activity/NZ3CoqhAr21616743320.jpg"
            alt="3"
            width="1000"
            height="600"
          />
        </div>
        <p style={{ textAlign: "start", textIndent: "2em" }}>
          <br />
          <br />
          <span style={{ lineHeight: "1.65" }}>
            <span style={{ color: "#000000" }}>
              <strong>Step 2</strong>
            </span>
          </span>{" "}
          <span style={{ lineHeight: "1.65" }}>
            <span style={{ color: "#000000" }}>Click on "Order".</span>
          </span>
        </p>
        <p style={{ textAlign: "start", textIndent: "2em" }} />
        <p style={{ textAlign: "start", textIndent: "2em" }} />
        <div
          className="media-wrap image-wrap align-start"
          style={{ textAlign: "start" }}>
          <Image
            className="media-wrap image-wrap"
            src="/image/catalog/activity/DsxHnsnOTV1616743363.jpg"
            alt="3"
            width="1000"
            height="600"
          />
        </div>
        <p style={{ textAlign: "start", textIndent: "2em" }} />
        <p style={{ textAlign: "start", textIndent: "2em" }}>
          <span style={{ lineHeight: "1.65" }}>
            <span style={{ color: "#000000" }}>
              In "My Order", you can get an overview of your order history and
              status.
            </span>
          </span>
        </p>
        <p style={{ textAlign: "start", textIndent: "2em" }} />
        <p style={{ textAlign: "start", textIndent: "2em" }}>
          <span style={{ lineHeight: "1.65" }}>
            <span style={{ color: "#000000" }}>
              <strong>Click "View Details" for more information.</strong>
            </span>
          </span>
        </p>
      </div>
    </div>
  );
};
export default Body;
