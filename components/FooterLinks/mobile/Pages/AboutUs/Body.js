import React from "react";
import Image from "helpers/image";

const Body = () => {
  return (
    <>
      <div className="page-identity-information information">
        <h3 className="information-title">Information</h3>
        <h4 className="information-name">About Us</h4>
        <div className="information-content">
          <p className="p" />
          <div className="media-wrap image-wrap">
            <img
              className="media-wrap image-wrap"
              src="/image/catalog/activity/dv3GxUYhuu1655433682.jpg"
            />
          </div>
          <p />
          <div className="media-wrap image-wrap">
            <img
              className="media-wrap image-wrap"
              src="/image/catalog/activity/lsh4BDpmLC1655433725.jpg"
            />
          </div>
          <p />
          <div className="media-wrap image-wrap">
            <img
              className="media-wrap image-wrap"
              src="/image/catalog/activity/pLpcwA2kzM1655433746.jpg"
            />
          </div>
          <p />
          <p>
            <span style={{ letterSpacing: 0 }}>
              Organization: Beijing Xike Network Technology Co., Ltd.{" "}
            </span>
          </p>
          <p>
            <span style={{ letterSpacing: 0 }}>
              Address: Building 1, Panshan ThinkTank, Panyu North street, Panyu
              Disctrict, Guangzhou, Guangdong, China
            </span>
          </p>
          <p>
            <span style={{ letterSpacing: 0 }}>Contact number: </span>+1
            877-277-7209
          </p>
          <p />
        </div>
      </div>
    </>
  );
};
export default Body;
