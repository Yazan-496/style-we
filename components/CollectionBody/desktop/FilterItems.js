import React, { useState } from "react";
import ItemResult from "./ItemResult";
import FilterDashboard from "./FilterDashboard";
const FilterItems = ({ Products, collections, setFinalFilteredItems }) => {
  const [filteredItems, setFilteredItems] = useState({});
  const [removeFromFilter, setRemoveFromFilter] = useState({});
  return (
    <div className="flex lg:gap-6">
      <FilterDashboard
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
        Products={Products?.products}
        collections={collections}
        setRemoveFromFilter={(attribute) => setRemoveFromFilter(attribute)}
      />
    </div>
  );
};
export default FilterItems;
