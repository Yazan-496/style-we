import React from "react";
import Image from "helpers/image";

const Body = () => {
  return (
    <div
      className="w-full flex flex-col justify-start items-center relative gap-6 px-14 py-8 rounded bg-white"
      style={{ padding: 15 }}>
      <div className="information-detial braft-output-content">
        <h3 class="information-title">Information</h3>
        <h4 class="information-name">Influencer Program</h4>
        <p />
        <p className="media-wrap image-wrap" />
        <Image
          className="media-wrap image-wrap"
          src="/image/catalog/activity/derahBD0Yu1650789789.jpg"
          alt="3"
          width="1000"
          height="600"
        />
        <p />
        <Image
          className="media-wrap image-wrap"
          src="/image/catalog/activity/6snpBcOMtl1650789798.jpg"
          alt="3"
          width="1000"
          height="600"
        />
        <p />
        <div className="media-wrap image-wrap">
          <a
            style={{ display: "inline-block" }}
            href="https://docs.google.com/forms/d/e/1FAIpQLSdUlj_GgCwUH5uUq5uuYRj4wgx4Bgk2V3FRCTg3pMs22OyWiQ/viewform"
            target="_blank">
            <Image
              className="media-wrap image-wrap"
              src="/image/catalog/activity/v5bUz1wApj1650789807.jpg"
              alt="3"
              width="1000"
              height="600"
            />
          </a>
        </div>
      </div>
    </div>
  );
};
export default Body;
