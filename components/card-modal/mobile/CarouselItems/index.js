import React, { useEffect } from "react";
import BigCarousel from "./BigCarousel";
import SmallCarousel from "./SmallCarousel";
import CountFlashSale from "../../../Body/desktop/CountFlashSale";
const CarouselItemsCard = ({ product }) => {
  useEffect(() => {
    // console.log(product-details);
  }, [product]);
  return (
    <div className="w-full h-full flex justify-center">
      <div className="w-full flex flex-col justify-start items-end flex-grow-0 flex-shrink-0 max-h-[496px]">
        <div className="w-full flex justify-between items-start flex-grow-0 flex-shrink-0 relative h-full gap-3">
          {/*<SmallCarousel products={product-details} />*/}
          <BigCarousel products={product} />
        </div>
      </div>
    </div>
  );
};
//truncate
export default CarouselItemsCard;
