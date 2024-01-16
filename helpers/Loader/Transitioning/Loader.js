import React from "react";

const Loader = () => {
  return (
    <div className="flex items-center z-[9999999999] justify-center h-screen">
      <div className="loader ease-linear rounded-full border-8 border-t-8 border-gray-200 h-16 w-16" />
    </div>
  );
};

export default Loader;
