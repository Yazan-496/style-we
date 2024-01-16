import React from "react";
import CollectionHeader from "./CollectionHeader";
import RecommendedItems from "./RecommendedItem";
import FilterItems from "./FilterItems";
import ClothingCollection from "./ClothingCollection";
import CollectionDescription from "./CollectionDescription";
const CollectionBody = ({ name }) => {
  return (
    <>
      <CollectionHeader />
      <ClothingCollection />
      <CollectionDescription />
      {/* <RecommendedItems />
        <FilterItems /> */}
    </>
  );
};
export default CollectionBody;
