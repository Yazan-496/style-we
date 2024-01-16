import React, { useEffect, useState } from "react";
import CollectionHeader from "./CollectionHeader";
import RecommendedItems from "./RecommendedItem";
import FilterItems from "./FilterItems";
import { useSelector } from "react-redux";
const CollectionBody = ({ name, collections, Products }) => {
  const [children, setChildren] = useState([]);
  const [parentCategory, setParentCategory] = useState([]);
  const CategoriesReducer = useSelector(
    (state) => state.mainReducer?.mainPageData?.categories
  );
  const childCategories = useSelector(
    (state) => state.ProductReducer?.Products?.child_categories
  );
  function getSubCategoriesByName(categoryName, categoryArray) {
    if (categoryName) {
      for (const category of categoryArray) {
        const categories = categoryName?.split("-");
        setParentCategory(categories);
        const lastItem = categories[categories.length - 1]; // Get the first item of the array
        if (lastItem?.includes(category.name)) {
          return category.childes;
        } else if (lastItem?.includes(category.category)) {
          return category.sub_categories;
        }
        if (category.sub_categories) {
          const subCategories = getSubCategoriesByName(
            categoryName,
            category.sub_categories
          );
          if (subCategories) {
            return subCategories;
          }
        }

        if (category.childes) {
          const childes = getSubCategoriesByName(
            categoryName,
            category.childes
          );
          if (childes) {
            return childes;
          }
        }
      }
    }
    return [];
  }
  useEffect(() => {
    // const aa = getSubCategoriesByName(name, CategoriesReducer);
    // setChildren(aa);
  }, [name]);
  const ItemsProducts = useSelector(
    (state) => state.ProductReducer.ItemsProducts
  );
  useEffect(() => {}, [children]);
  const productLoading = useSelector(
    (state) => state?.ProductReducer?.productLoading
  );
  return (
    <>
      <div
        className={`${
          productLoading ? "h-[80vh] " : "h-full"
        } page-identity-collection bg-white filter-type-v0`}
      >
        <CollectionHeader
          ItemsProducts={ItemsProducts}
          name={name}
          Products={Products}
        />
        <RecommendedItems
          collections={childCategories}
          parentCategory={parentCategory}
        />
        <FilterItems
          ItemsProducts={ItemsProducts}
          collections={collections}
          Products={Products}
        />
      </div>
    </>
  );
};
export default CollectionBody;
