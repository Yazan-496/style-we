import React, { useEffect, useState } from "react";
import ItemResult from "./ItemResult";
import FilterDashboard from "./FilterDashboard";
import { useDispatch, useSelector } from "react-redux";
import { XSvg } from "../../svgs";
import HTMLRenderer from "../../../helpers/HTMLRenderer";
const FilterItems = ({
  Products,
  collections,
  setFinalFilteredItems,
  ItemsProducts,
}) => {
  const [filteredItems, setFilteredItems] = useState({});
  const [removeFromFilter, setRemoveFromFilter] = useState({});

  const dispatch = useDispatch();
  const [filters, setFilters] = useState([]);
  const Update_Filters = useSelector(
    (state) => state.ProductReducer.Update_Filters
  );
  const ObjectToArray = (filteredItems) => {
    return Object.entries(filteredItems).map(([key, value]) => ({
      key,
      value,
    }));
  };
  useEffect(() => {
    setFilters(ObjectToArray(Update_Filters));
    // console.log(Update_Filters, "filteredItems");
  }, [Update_Filters]);
  const handleRemoveFromFilter = (attribute, item) => {
    // setRemoveFromFilter({ attribute, item });
    dispatch({ type: "Delete_Filters", payload: { attribute, item } });
  };
  return (
    <div className="p-3 ">

          <span id="collection-product-total-number">
            {Products?.category_h1 && (
              <HTMLRenderer htmlContent={Products?.category_h1} />
            )}
          </span>
      {filters?.map((filter) => {
        return (
          filter?.value?.length > 0 && (
            <div className="flex items-center gap-3 p-4 pl-2 pr-3 space-x-2">
              {filter.value.map(
                (key, index) =>
                  typeof key.key !== "number" && (
                    <div
                      className="truncate flex items-center space-x-4 min-w-[50px]  bg-[#E0E1E3] text-lg flex flex-row items-start justify-center"
                      key={index}
                    >
                      <span className="pl-[6px] text-base leading-[35px] text-[#484C52]">
                        {key.key}
                      </span>
                      <span
                        onClick={() => handleRemoveFromFilter(key, filter?.key)}
                        className="pr-[6px] cursor-pointer"
                      >
                        <XSvg />
                      </span>
                    </div>
                  )
              )}
            </div>
          )
        );
      })}
      <FilterDashboard
        ItemsProducts={ItemsProducts}
        setFilteredItems={(filteredItems) => setFilteredItems(filteredItems)}
        Products={Products}
        removeFromFilter={removeFromFilter}
        collections={collections}
        setFinalFilteredItems={(finalFilteredItems) =>
          setFinalFilteredItems(finalFilteredItems)
        }
      />

      <ItemResult
        filteredItems={filteredItems}
        ItemsProducts={ItemsProducts}
        Products={Products}
        collections={collections}
        setRemoveFromFilter={(attribute) => setRemoveFromFilter(attribute)}
      />
    </div>
  );
};
export default FilterItems;
