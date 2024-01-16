import React, { useEffect } from "react";
import Image from "helpers/image";

const SmallCarousel = ({ product, activeIndex, setActiveIndex }) => {
  return (
    <div className=" custom-pagination flex space-y-4 flex-row lg:flex-col items-start justify-start w-full h-full owl-dots">
      {product?.images?.map((photo, i) => (
        <span
          key={i}
          className={`w-[75px] cursor-pointer opacity-1111 opacity-1  ${
            parseInt(activeIndex) === parseInt(i)
              ? " border-y-[3px] border-x-[3px] p-0"
              : "p-2"
          }`}
          style={{
            display: "flex !important",
            flexDirection: "column !important",
            flexWrap: "nowrap !important",
          }}
          onClick={() => setActiveIndex(i)}
        >
          <Image
            className={`w-full h-full object-contain `}
            src={photo}
            alt={photo}
            width={500} 
            height={500} 
            layout="responsive"
            loading={"eager"}
          />
        </span>
      ))}
    </div>
  );
};

export default SmallCarousel;
