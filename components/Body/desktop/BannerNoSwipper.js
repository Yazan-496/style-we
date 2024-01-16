import { Swiper } from "swiper/react";
import React from "react";
import Link from "../../../helpers/Link";

const BannerNoSwipper = ({ section }) => {
  const isOddLength = section.length % 2 !== 0;
  function handleGetUrl(item) {
    let updatedUrl = item.url.replace(/https?:\/\/www\.clearance\.ae\/?/g, "/");
    if (updatedUrl.includes("www.clearance.ae")) {
      updatedUrl = item.url.replace("www.clearance.ae", "/");
    }
    if (item.resource_type === "brand") {
      updatedUrl = `/products/brands=${item.resource_id}`;
    }
    if (item.resource_type === "flash_deals") {
      updatedUrl = `/all-flash-deals`;
    }
    if (item.resource_type === "product") {
      updatedUrl = `/product/${item.resource_slug}`;
    }
    if (item.resource_type === "search") {
      updatedUrl = `/products/search_text=${item.search_keyword}`;
    }
    if (item.resource_type === "category") {
      updatedUrl = `/products/category=${item.resource_slug}`;
    }
    return updatedUrl;
  }

  return (
    <div className="pt-[0px]">
      <div>
        <div className="image-grid" style={{ padding: 20 }}>
          {section?.map((photo, i) => {
            return (
              <Link 
                href={handleGetUrl(photo)}
                className={`image-container ${
                  isOddLength && i === section.length - 1 ? "fullscreen" : ""
                }`}
                style={{
                  float: "left",
                  width: "100%",
                  padding: 20,
                }}
              >
                  <img
                    className={
                      isOddLength && i === section.length - 1
                        ? "fullimage w-fill-available"
                        : ""
                    }
                    src={photo.desktop_photo || item.photo || ""}
                    alt={`Image ${i + 1}`}
                  />
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
};
export default BannerNoSwipper;
