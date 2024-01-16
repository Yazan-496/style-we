import React from "react";
import BigCarousel from "./BigCarousel";
import SmallCarousel from "./SmallCarousel";
const CarouselItemsCard = ({ product }) => {
    return (
        <div className="w-full h-full gap-3">
            <div className=" border-10 flex items-center w-full h-full">
                <BigCarousel product={product} />
            </div>
        </div>
    );
};

export default CarouselItemsCard;
