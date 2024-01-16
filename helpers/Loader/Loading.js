import React, { useEffect, useState } from "react";
import ContentLoader, { List, Instagram } from "react-content-loader";
const MyBoxes = ({ count }) => {
  const boxCount = count;
  const boxWidth = "100%";
  const boxHeight = 300;
  const borderRadius = 10;

  const renderBoxes = () => {
    const boxes = [];

    for (let i = 0; i < boxCount; i++) {
      boxes.push(
        <ContentLoader
          key={i}
          speed={2}
          style={{ padding: 8 }}
          width={boxWidth}
          height={boxHeight}
          viewBox={`0 0 ${boxWidth} ${boxHeight}`}
          backgroundColor="#f3f3f3"
          foregroundColor="#ecebeb"
        >
          <rect
            x="0"
            y="0"
            rx={borderRadius}
            ry={borderRadius}
            width={boxWidth}
            height={boxHeight}
          />
        </ContentLoader>
      );
    }

    return boxes;
  };

  return <div className="flex">{renderBoxes()}</div>;
};
export const LoaderCategories = ({ count }) => {
  return (
    <>
      <ContentLoader
        className="pb-[10px]"
        speed={2}
        width={"100%"}
        height={50}
        style={{ paddingTop: 10 }}
        viewBox={"0 0 300 40"}
        backgroundColor="#f3f3f3"
        foregroundColor="#ecebeb"
      >
        <rect rx="0" ry="20" width="100%" height="100%" />
      </ContentLoader>
      <MyBoxes count={count} />
    </>
  );
};
export const LoaderCategory = ({ width, height, viewBox, notPadding }) => {
  return (
    <ContentLoader
      className={`${notPadding ? "" : " pb-[10px]"}`}
      speed={2}
      width={width}
      height={height}
      viewBox={viewBox}
      backgroundColor="#f3f3f3"
      foregroundColor="#ecebeb"
    >
      <rect width="100%" height="100%" />
    </ContentLoader>
  );
};
export const LoaderLogo = ({ width, height, viewBox, rotate }) => {
  return (
    <ContentLoader
      className=""
      speed={2}
      width={width}
      height={height}
      viewBox={viewBox}
      backgroundColor="#f3f3f3"
      foregroundColor="#ecebeb"
    >
      <rect rx="0" ry="20" width="100%" height="100%" r={rotate} />
    </ContentLoader>
  );
};
export const CategoriesLogo = ({ width, height, viewBox, rotate }) => {
  return (
    <ContentLoader
      className=""
      speed={1}
      width={width}
      height={height}
      viewBox={viewBox}
      backgroundColor="#f3f3f3"
      foregroundColor="#ecebeb"
    >
      <circle width="100%" height="100%" cx="250" cy="250" r="200" />
    </ContentLoader>
  );
};
export const BannerLogo = ({ width, height, viewBox }) => {
  return (
    <ContentLoader
      speed={2}
      width={width}
      height={height}
      viewBox={viewBox}
      backgroundColor="#f3f3f3"
      foregroundColor="#d9d8d8"
    >
      <rect x="0" y="0" rx="10" ry="10" width="100%" height="100%" />
    </ContentLoader>
  );
};

export const LoaderImage = () => {
  return (
    <ContentLoader
      speed={1}
      width={360}
      height={550}
      viewBox="0 0 120 190"
      backgroundColor="#f3f3f3"
      foregroundColor="#d9d8d8"
    >
      <rect x="0" y="0" rx="10" ry="10" width="100%" height="100%" />
    </ContentLoader>
  );
};
