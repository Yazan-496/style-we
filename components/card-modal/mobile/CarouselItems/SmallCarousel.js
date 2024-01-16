import React from "react";

const SmallCarousel = ({ products }) => {
  return (
    <div id="carousel-custom-dots" className="owl-dots">
      {products?.photos?.length > 0 &&
        products?.photos?.map((photo, i) => {
          return (
            <button
              key={i}
              style={{
                display: "flex",
                padding: 5,
                flexDirection: "column",
                flexWrap: "nowrap",
              }}
              className={`owl-dot`}
              id={`owl-dot`}
            >
              <img src={photo?.src} alt={photo.src} />
            </button>
          );
        })}
    </div>
  );
};
export default SmallCarousel;
