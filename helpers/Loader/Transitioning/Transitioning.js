import React from "react";

const Transitioning = ({ isTransitioning, children }) => {
  return (
    <div
      className={`transition-opacity duration-300 ${
        isTransitioning ? "opacity-100" : "opacity-100"
      }`}
    >
      {children}
    </div>
  );
};

export default Transitioning;
