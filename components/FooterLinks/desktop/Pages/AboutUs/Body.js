import React from "react";
import Image from "helpers/image";

const Body = () => {
  return (
    <div className="w-full flex flex-col justify-start items-center relative gap-6 px-14 py-8 rounded bg-white">
      <h1 className="flex-grow-0 flex-shrink-0 text-2xl font-semibold text-left text-[#31353c]">
        About Us
      </h1>
      <div className="information-detial braft-output-content">
        <p className="p" />
        <div className="media-wrap image-wrap">
          <Image
            className="media-wrap image-wrap"
            src="/image/catalog/activity/dv3GxUYhuu1655433682.jpg"
            alt="1"
            width="1000"
            height="600"
          />
        </div>
        <p />
        <div className="media-wrap image-wrap">
          <Image
            className="media-wrap image-wrap"
            src="/image/catalog/activity/lsh4BDpmLC1655433725.jpg"
            alt="2"
            width="1000"
            height="600"
          />
        </div>
        <p />
        <div className="media-wrap image-wrap">
          <Image
            className="media-wrap image-wrap"
            src="/image/catalog/activity/pLpcwA2kzM1655433746.jpg"
            alt="3"
            width="1000"
            height="600"
          />
        </div>
        <p />
      </div>
    </div>
  );
};
export default Body;
