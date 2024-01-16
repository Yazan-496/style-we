import React from "react";
import CHeader from "./CHeader";
import RecommendedItems from "./RecommendedItem";
import FilterItems from "./FilterItems";
const CollectionBody = ({ name }) => {
  return (
    <div className="cm-layout-max mx-auto w-full">
      <div className="flex flex-col items-stretch my-6 gap-y-3">
        <CHeader name={name} />
        <RecommendedItems />
        <FilterItems />
      </div>
    </div>
  );
};
export default CollectionBody;
