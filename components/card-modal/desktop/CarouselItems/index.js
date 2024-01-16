import React from "react";
import BigCarousel from "./BigCarousel";
import SmallCarousel from "./SmallCarousel";
const CarouselItemsCard = ({ product }) => {
  return (
    <div className="w-full lg:w-[484px] md:w-full h-auto ">
      <div className="flex  flex-col justify-start items-end flex-grow-0 flex-shrink-0 h-[446px] lg:h-[340px]">
        <div className="flex w-full justify-center items-center flex-grow-0 flex-shrink-0 relative h-full gap-3">
          <BigCarousel product={product} />
        </div>
      </div>
    </div>
  );
};

export default CarouselItemsCard;
