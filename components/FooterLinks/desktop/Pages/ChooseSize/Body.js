import React from "react";
import Image from "helpers/image";

const Body = () => {
  return (
    <div className="w-full flex flex-col justify-start items-center relative gap-6 px-14 py-8 rounded bg-white">
      <h1 className="flex-grow-0 flex-shrink-0 text-2xl font-semibold text-left text-[#31353c]">
        How to Choose Your Size
      </h1>
      <div className="information-detial braft-output-content">
        <p style={{ textAlign: "start", textIndent: "2em" }}>
          <span style={{ lineHeight: "1.65" }}>
            <span style={{ backgroundColor: "#ffffff" }}>
              <span style={{ color: "#000000" }}>
                <span style={{ fontSize: 16 }}>
                  Our size chart is placed right as is shown in the picture. To
                  choose the best size that suits you, please check the size
                  chart on the product page, and refer to the measurements below
                  each size.
                </span>
              </span>
            </span>
          </span>
        </p>
        <p style={{ textAlign: "start", textIndent: "2em" }} />
        <p style={{ textAlign: "start", textIndent: "2em" }}>
          <span style={{ lineHeight: "1.65" }}>
            <span style={{ backgroundColor: "#ffffff" }}>
              <span style={{ color: "#000000" }}>
                <span style={{ fontSize: 16 }}>
                  You can also refer to our measuring guide to see how to
                  measure your size.
                </span>
              </span>
            </span>
          </span>
        </p>
        <p style={{ textAlign: "start", textIndent: "2em" }} />
        <div
          className="media-wrap image-wrap align-start"
          style={{ textAlign: "start" }}
        >
          <Image
            className="media-wrap image-wrap"
            src="/image/catalog/activity/23TvQAqcMV1616745345.jpg"
            alt="3"
            width="1000"
            height="600"
          />
        </div>
        <p style={{ textAlign: "start", textIndent: "2em" }} />
        <p style={{ textAlign: "start", textIndent: "2em" }} />
        <p style={{ textAlign: "start", textIndent: "2em" }}>
          <span style={{ lineHeight: "1.65" }}>
            <span style={{ color: "#000000" }}>
              <span style={{ fontSize: 16 }}>
                <span style={{ backgroundColor: "#ffffff" }}>
                  Just click on the "
                </span>
                Size Guide"
              </span>
            </span>
          </span>{" "}
          <span style={{ lineHeight: "1.65" }}>
            <span style={{ color: "#000000" }}>
              <span style={{ fontSize: 16 }}>
                <span style={{ backgroundColor: "#ffffff" }}>
                  button on each product page to find out the measurements which
                  you can view in centimeters and inches, and to see how to
                  measure to make sure the product fits perfectly.
                </span>
              </span>
            </span>
          </span>
        </p>
        <p />
      </div>
    </div>
  );
};
export default Body;
