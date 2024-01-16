import React, { useState } from "react";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { useDispatch } from "react-redux";
// import { Transition } from "@headlessui/react";
import ModalFilters from "./ModalFilters";
import { useTranslation } from "react-i18next";

const FilterDashboard = ({
  collections,
  Products,
  setFilteredItems,
  removeFromFilter,
  setFinalFilteredItems,
  ItemsProducts,
}) => {
  const { t, i18n } = useTranslation("translation");
  const SortBy = [
    { name: t("filter.latest"), value: "latest", key: "latest" },
    { name: t("filter.oldest"), value: "oldest" },
    { name: t("filter.low_high"), value: "low-high" },
    { name: t("filter.high_low"), value: "high-low" },
    { name: t("filter.a_z"), value: "a-z" },
    { name: t("filter.z_a"), value: "z-a" },
  ];
  const FilterSelect = [
    { name: t("filter.best_selling"), value: "best-selling" },
    { name: t("filter.top_rated"), value: "top-rated" },
    { name: t("filter.most_favorite"), value: "most-favorite" },
    { name: t("filter.featured_deal"), value: "featured_deal" },
    // { name: t("filter.discounted"), value: "discounted" },
  ];
  const [modalOpen, setModalOpen] = useState(false);
  const dispatch = useDispatch();
  const [sortByValue, setSortByValue] = useState("");
  const [filterSelectValue, setFilterSelectValue] = useState("");
  function handleFilterSelectChange(event) {
    const selectedValue = event.target.value;
    setFilterSelectValue(selectedValue);
    dispatch({ type: "Set_Filter", payload: { filter: selectedValue } });
  }
  function handleSortByChange(event) {
    const selectedValue = event.target.value;
    setSortByValue(selectedValue);
    dispatch({ type: "Set_SortBy", payload: { sortBy: selectedValue } });
  }

  const handleOpenFiltersModal = () => {
    setModalOpen(true);
    // document.body.classList.add("brightness-75");
  };

  const handleCloseFiltersModal = () => {
    setModalOpen(false);
    // document.body.classList.remove("brightness-75");
  };

  return (
    <div id="component-sorter" className="p-[10px]">
      <div className="space-x-8 flex items-center ">
        {/*<div className="left-box py-10">*/}
        {/*<div className="w-[100%] h-full flex items-center gap-6">*/}
        <FormControl size="small" fullWidth>
          <InputLabel id="SortBy-select-label">{t("user.sortby")}</InputLabel>
          <Select
            className="w-[100%]"
            labelId="SortBy-select-label"
            id="SortBy-select-label"
            value={sortByValue}
            label={t("user.sortby")}
            onChange={handleSortByChange}
          >
            {SortBy.map((option, i) => (
              <MenuItem key={option.value} value={option.value}>
                {option.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl size="small" fullWidth>
          <InputLabel id="Filter-select-label">{t("user.filter")}</InputLabel>
          <Select
            className=" w-[100%]"
            labelId="Filter-select-label"
            id="Filter-select-label"
            value={filterSelectValue}
            label={t("user.filter")}
            onChange={handleFilterSelectChange}
          >
            {FilterSelect.map((option, i) => (
              <MenuItem key={option.value} value={option.value}>
                {option.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        {/*</div>*/}
        {/*</div>*/}
        <button
          className="component__filter-btn"
          data-statis-click='{"ec":"filter"}'
          data-collect-click='{"event_id":"btn_filter","third_category":5766}'
        >
          <div
            onClick={handleOpenFiltersModal}
            className="component__filter-btn-inner"
          >
            {t("user.filter")}
          </div>
          <i className="iconfont icon-c_icon_filter_sel" />
          <span className="count notranslate" />
        </button>
      </div>
      <div
        className={`${
          !modalOpen ? "hidden" : ""
        } flex h-full object-cover w-[100%] h-[100%] pure-modal-backdrop  fixed w-full z-[50]`}
      >
        {/* <Transition
          show={modalOpen}
          enter="transition-opacity duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="transition-opacity duration-300"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        > */}
          <div
            className={` fixed top-0 z-50 right-0 w-4/5 md:w-80 h-full bg-black bg-opacity-50 transition-transform duration-300 transform ${
              modalOpen ? "translate-x-0" : "-translate-x-full"
            }`}
          >
            <ModalFilters
              setFilteredItems={(filteredItems) =>
                setFilteredItems(filteredItems)
              }
              Products={Products}
              removeFromFilter={removeFromFilter}
              collections={collections}
              setFinalFilteredItems={(finalFilteredItems) =>
                setFinalFilteredItems(finalFilteredItems)
              }
              handleCloseFiltersModal={handleCloseFiltersModal}
            />
          </div>
        {/* </Transition> */}
      </div>
    </div>
  );
};
export default FilterDashboard;
