import React from "react";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import HTMLRenderer from "../../../helpers/HTMLRenderer";
import { LoaderCategory } from "../../../helpers/Loader/Loading";
import Link from "../../../helpers/Link";
const CollectionHeader = ({ name, Products, ItemsProducts }) => {
  const CategoriesReducer = useSelector(
    (state) => state.mainReducer.mainPageData?.categories
  );
  const productLoading = useSelector(
    (state) => state?.ProductReducer?.productLoading
  );
  const categoryParent = useSelector(
    (state) => state.ProductReducer?.Products?.category_parent
  );
  const categoryName = useSelector(
    (state) => state.ProductReducer?.Products?.category
  );
  const categoryParentParent = useSelector(
    (state) => state.ProductReducer?.Products?.category_parent_parent
  );
  function getIdByName(categoryName, categoryArray) {
    for (const category of categoryArray) {
      if (
        category.category === categoryName ||
        category.name === categoryName
      ) {
        return category.id;
      }

      if (category.sub_categories) {
        const subCategoryId = getIdByName(
          categoryName,
          category.sub_categories
        );
        if (subCategoryId) {
          return subCategoryId;
        }
      }

      if (category.childes) {
        const childId = getIdByName(categoryName, category.childes);
        if (childId) {
          return childId;
        }
      }
    }

    return null;
  }
  const { t, i18n } = useTranslation("translation");
  return (
    <>
        <div className="title-number-wrapper ">
          <span className="">
            <span className="flex items-center flex-wrap last:font-bold last:text-[#000] group">
              {categoryParentParent && (
                <span
                  className="flex"
                  style={{
                    textTransform: "uppercase",
                  }}
                >
                  <Link
                    href={`/products/category=${categoryParentParent?.slug}`}
                    className="p-1 truncate hover:underline"
                  >
                    <p className="truncate flex flex-row">
                      {categoryParentParent?.name}
                      <span className="mx-[2px] pt-1">
                        <svg
                          stroke="#31353C"
                          viewBox="0 0 32 32"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                          width={16}
                          height={16}
                          style={{ transform: "rotate(180deg)" }}
                        >
                          <path d="m20 8-8 8 8 8" strokeWidth={2} />
                        </svg>
                      </span>
                    </p>
                  </Link>
                </span>
              )}
              {categoryParent && (
                <span
                  className="flex"
                  style={{
                    textTransform: "uppercase",
                  }}
                >
                  <Link className="p-1 truncate hover:underline" href={`/products/category=${categoryParent?.slug}`}>
                      <p className="truncate flex flex-row">
                        {categoryParent?.name}{" "}
                        <span className="mx-[2px] pt-1">
                          <svg
                            stroke="#31353C"
                            viewBox="0 0 32 32"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            width={16}
                            height={16}
                            style={{ transform: "rotate(180deg)" }}
                          >
                            <path d="m20 8-8 8 8 8" strokeWidth={2} />
                          </svg>
                        </span>
                      </p>
                  </Link>
                </span>
              )}
              {categoryName && (
                <span
                  className="flex"
                  style={{
                    textTransform: "uppercase",
                  }}
                >
                  <Link className="p-1 truncate hover:underline" href={`/products/category=${categoryName?.slug}`}>
                    <p className="truncate flex flex-row">
                      <p className="truncate flex flex-row">
                        {categoryName?.name}
                      </p>
                      <span className="mx-[2px] pt-1">
                        <svg
                          stroke="#31353C"
                          viewBox="0 0 32 32"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                          width={16}
                          height={16}
                          style={{ transform: "rotate(180deg)" }}
                        >
                          <path d="m20 8-8 8 8 8" strokeWidth={2} />
                        </svg>
                      </span>
                    </p>
                  </Link>
                </span>
              )}
            </span>
          </span>
          {productLoading ? (
            <LoaderCategory
              notPadding={true}
              width={100}
              height={30}
              viewBox={"0 0 330 70"}
            />
          ) : (
            <span className={` items-center number space-x-1`}>
              <span id="collection-product-total-number">
                {ItemsProducts?.length} {t("user.of")} {Products?.total_size}{" "}
                {t("user.products")}
              </span>
            </span>
          )}
        </div>
          <div
              className={`px-4 flex justify-start items-center flex-grow-0 flex-shrink-0 text-base font-normal leading-5 text-[#000]`}
          >
      <span className="flex items-center last:font-bold last:text-[#000] group">
        <a className="uppercase hover:underline"> {Products?.result_for}</a>
      </span>
          </div>
    </>)
};
export default CollectionHeader;
