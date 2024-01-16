import { BannerLogo } from "helpers/Loader/Loading";
import React from "react";

const ImageLoader = ({ src, width, height }) => {
  // console.log(`Loader called for image source: ${src}`);
  return src;
  // <div className="w-full h-full">
  //   <BannerLogo width={"100vw"} height={"85vh"} viewBox={"0 0 100 50"} />
  // </div>
};

export default ImageLoader;
