import React from "react";
import ItemResult from "./ItemResult";
import FilterDashboard from "./FilterDashboard";
const FilterItems = ({ name }) => {
  return (
    <div className="flex gap-6">
      <FilterDashboard />
      <ItemResult />
    </div>
  );
};
export default FilterItems;
