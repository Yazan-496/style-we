import React, {
  createRef,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { SvgCheckbox } from "../../svgs";
import Slider from "rc-slider";
import { useDispatch, useSelector } from "react-redux";
import { log } from "next/dist/server/typescript/utils";
import { XSvg } from "../../svgs";
import { useTranslation } from "react-i18next";
import FilterIcon from "components/icons/FilterIcon";
import {LoaderCategory} from "../../../helpers/Loader/Loading";

const FilterDashboard = ({
  collections,
  Products,
  setFilteredItems,
  removeFromFilter,
  setFinalFilteredItems,
}) => {
  const { t, i18n } = useTranslation("translation");
  const [isDropdownVisible, setDropdownVisible] = useState(false);
  const dispatch = useDispatch();
  const [click, setClick] = useState(false);
  const [click1, setClick1] = useState(false);
  const [pagination, setPagination] = useState({
    Sizes: 10,
    Brands: 10,
    Prices: 10,
  });
  const productLoading = useSelector(
      (state) => state?.ProductReducer?.productLoading
  );
  const attributes = useSelector((state) => state.ProductReducer.Products);
  const sync = useSelector((store) => store.ProductReducer.sync);
  const [attributesArray, setAttributesArray] = useState([]);
  const [activeCollapseId, setActiveCollapseId] = useState([]);
  const [filterItems, setFilterItems] = useState({});
  const [syncItem, setSyncItem] = useState(false);
  const [Item, setItem] = useState(null);
  const [rangeValue, setRangeValue] = useState([0, 40]);

  const parentRef = useRef(null);
  // {{*Start*  UseRef for parent attributes (color, size, ....  ) **}}
  const getSizeOptions = (attri) => {
    return (
      (attri?.attributes?.length > 0 &&
        attri?.attributes[0]?.options?.map((size) => {
          return { key: size, value: size };
        })) ||
      []
    );
  };
  useEffect(() => {
    if(attributesArray.length > 0){
      setActiveCollapseId(attributesArray.map((_, index) => index));
    }
  }, [attributesArray]);
  const getBrandName = (attri) => {
    return (
      attri?.brands?.map((brand) => {
        return { key: brand?.name, value: brand?.id };
      }) || []
    );
  };

  const getPriceRanges = (attri) => {
    return (
      attri?.prices?.map((price) => {
        return {
          key: price?.text,
          value: `${price?.min_price}-${price?.max_price}`,
        };
      }) || []
    );
  };

  const _mergeAttributes = (sizeOptions, brandName, priceRanges) => {
    const mergedAttributes = [
      { label: t("filter.sizes"), name: "Sizes", attributes: sizeOptions },
      { label: t("filter.brands"), name: "Brands", attributes: brandName },
      { label: t("filter.prices"), name: "Prices", attributes: priceRanges },
    ];
    setAttributesArray(mergedAttributes);
  };

  const getAttributesArrays = useCallback((attri) => {
    const sizeOptions = getSizeOptions(attri);
    const brandName = getBrandName(attri);
    const priceRanges = getPriceRanges(attri);
    _mergeAttributes(sizeOptions, brandName, priceRanges);
  }, []);
  useEffect(() => {
    if (attributes) {
      getAttributesArrays(attributes);
    }
  }, [getAttributesArrays, attributes]);

  const inputRefs = useMemo(
    () =>
      Array(attributesArray.length)
        .fill(0)
        .map((i) => React.createRef()),
    [attributesArray]
  );
  useEffect(() => {}, [attributesArray]);

  const handleExpand = (index) => {
    if (activeCollapseId.includes(index)) {
      setActiveCollapseId((prev) => prev.filter(id => id !== index));
    } else {
      setActiveCollapseId((prev) => [...prev, index]);
    }
  };

  // {{*End*  UseRef for parent attributes (color, size, ....  ) **}}

  // {{*Start*  UseRef for Child attributes (red, XXL, ....  ) **}}

  const checkRefs = useMemo(() => {
    if (attributesArray?.length > 0) {
      return attributesArray.map((item, index) => {
        inputRefs[index].current = inputRefs[index].current || createRef();
        return {
          attributes: Array(item.attributes.length)
            .fill(0)
            .map((i) => createRef()),
        };
      });
    }
  }, [attributesArray]);

  const handleCheckFilters = (item, attribute) => {
    setFilterItems((prevState) => ({
      ...prevState,
      [item]: {
        ...prevState[item],
        [attribute.key]: {
          value: attribute.value,
          check: !prevState[item][attribute.key]?.check,
        },
      },
    }));
  };

  const handleCheck = (i, index, item, attribute) => {
    // i = 00
    if (typeof checkRefs[index].attributes[i].current === "object") {
      checkRefs[index].attributes[i].current = true;
    } else {
      checkRefs[index].attributes[i].current =
        !checkRefs[index].attributes[i].current;
    }
    handleCheckFilters(item, attribute);
    setClick(!click);
  };

  // {{*End*  UseRef for Child attributes (red, XXL, ....  ) **}}

  const handleSetRange = (value) => {
    setRangeValue(value);
  };
  const handleReset = () => {
    setFilterItems([])
    dispatch({ type: "RESET_FILTERS" });
  };

  const handleScroll = useCallback(
    (item) => {
      if (typeof window !== "undefined") {
        const viewMoreBtn = document.getElementById(`viewMoreBtn-${item}`);
        if (parentRef.current && viewMoreBtn) {
          viewMoreBtn.scrollIntoView({ behavior: "smooth", block: "end" });
        }
      }
    },
    [syncItem]
  );

  const handleViewMore = (item) => {
    setPagination((prevState) => ({
      ...prevState,
      [item]: prevState[item] + 10,
    }));
    setSyncItem(!syncItem);
    setItem(item);
  };
  useEffect(() => {
    handleScroll(Item);
  }, [syncItem, handleScroll, Item]);
  useEffect(() => {
    setFilteredItems(filterItems);
  }, [filterItems]);
  useEffect(() => {
    const updatedFilterItems = attributesArray.reduce(
      (prevState, item) => {
        if (item.attributes?.length > 0) {
          const attributes = item.attributes.reduce((acc, attribute) => {
            acc[attribute.key] = {
              value: attribute.value,
              check: false,
            };
            return acc;
          }, {});

          prevState[item.name] = {
            ...prevState[item.name],
            ...attributes,
          };
        }

        return prevState;
      },
      { ...filterItems }
    );
    setFilterItems(updatedFilterItems);
  }, [attributesArray]);
  useEffect(() => {
    if (removeFromFilter?.attribute && removeFromFilter?.item) {
      handleCheckFilters(removeFromFilter.item, removeFromFilter.attribute);
    }
  }, [removeFromFilter]);
  function getFilteredValues(filter) {
    return Object.entries(filter)
      .filter(([key, value]) => value.check === true)
      .map(([key, value]) => {
        return { key, value: value.value };
      });
  }
  const ObjectToArray = (filteredItems) => {
    return Object.entries(filteredItems).map(([key, value]) => ({
      key,
      value,
    }));
  };

  const dispatchFun = useCallback((keysObject) => {
    // console.log(keysObject, "keysObject");
    dispatch({ type: "Add_Filters", payload: keysObject });
  }, []);

  useEffect(() => {
    const filtersArray = ObjectToArray(filterItems);
    const keysObject = filtersArray?.reduce((acc, filter) => {
      if (getFilteredValues(filter.value)?.length > 0) {
        const mappedValues = getFilteredValues(filter.value).map((key) => key);
        acc[filter.key] = mappedValues;
      }
      return acc;
    }, {});
    dispatchFun(keysObject);
  }, [dispatchFun, click]);
  return (
      <div>
        {productLoading ? (
            <LoaderCategory
                notPadding={true}
                width={100}
                height={30}
                viewBox={'0 0 330 70'}
            />
        ) : (
        <button
            className={`${t('user.dir')} lg:hidden block absolute text-gray-500  top-2 right-3 flex justify-center items-center`}
            onClick={() => setDropdownVisible(!isDropdownVisible)}
        >
          {t("user.filter")}
          <FilterIcon />
        </button>
            )}
        <div className={`lg:block ${isDropdownVisible ? ' flex h-full object-cover bg-black bg-opacity-50 fixed w-[100%] h-[100%] pure-modal-backdrop  fixed w-full z-[50]' : 'hidden'}`}></div>
        <div className={`lg:block ${isDropdownVisible ? ' fixed top-0 z-50 right-0 w-4/5 md:w-80 h-full bg-black bg-opacity-50 transition-transform duration-300 transform translate-x-0' : 'hidden'} w-[80%] lg:w-[216px]`}>
          <div style={{ top: 133 }} className="style_stickyBox__SNnmA w-full h-full bg-white overflow-y-auto">
            <aside className="style_filter__je3Sd">
              <div className="flex justify-between pt-5 pb-5 px-5 w-full sticky top-0 z-10 bg-white font-[700] text-lg lg:font-[400]">
                <span className="leading-0">{t("user.filter")}</span>
                <button className="font-[900] text-lg lg:hidden text-2xl leading-8 left-[80%]" onClick={() => setDropdownVisible(false)}>
                  <XSvg />
                </button>
              </div>
              <div className="flex flex-col gap-3">
                <div className="rc-collapse bg-transparent">
                  {attributesArray?.length > 0 &&
                      attributesArray.map((item, index) => {
                        return (
                            <div
                                ref={inputRefs[index]}
                                key={index}
                                id={index}
                                className="rc-collapse-item border border-t-0 border-l-0 border-r-0 border-b-[#e7e7e7]"
                            >
                              <div
                                  onClick={(e) => handleExpand(index)}
                                  className={`${
                                      item.attributes?.length === 0 ? "hidden" : ""
                                  } rc-collapse-header flex justify-start gap-2 items-center  h-[43px] p-1 items-center bg-gray-100 lg:bg-white lg:font ${activeCollapseId.includes(index) ? "rc-collapse-content-active" : "rc-collapse-content-inactive rc-collapse-content-hidden"}`}
                                  aria-expanded={inputRefs[index].current}
                                  aria-disabled="false"
                                  role="button"
                                  tabIndex={0}
                              >
                                <div className="rc-collapse-expand-icon">
                                  <div className="basis-4">
                                    <svg
                                        width={11}
                                        height={7}
                                        viewBox="0 0 11 7"
                                        fill="none"
                                        className={
                                          inputRefs[index].current ? "rotate-180" : ""
                                        }
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                      <path
                                          d="M9.84766 6L5.84766 2L1.84766 6"
                                          stroke="#31353C"
                                          strokeWidth={2}
                                      />
                                    </svg>
                                  </div>
                                </div>
                                <span className="rc-collapse-header-text">
                          <h2
                              title={item.label}
                              className="text-base font-semibold leading-10 lg:leadeing-0 truncate"
                          >
                            {item.label}
                          </h2>
                        </span>
                              </div>
                              <div
                                  ref={parentRef}
                                  id={`item-${item.name}`}
                                  className={`h-auto lg:max-h-[120px] p-2 overflow-auto
                          ${activeCollapseId.includes(index) ? "block" : "hidden"}`}
                              >
                                <div className="rc-collapse-content-box">
                                  <div className="">
                                    <div className="flex flex-row lg:flex-col flex-wrap mr-3 mt-3 w-full">
                                      {item.attributes?.length > 0 &&
                                          item.attributes.map((attribute, i) => {
                                            if (i < pagination[item?.name]) {
                                              return (
                                                  <div
                                                      onClick={(e) =>
                                                          handleCheck(
                                                              i,
                                                              index,
                                                              item?.name,
                                                              attribute
                                                          )
                                                      }
                                                      key={i}
                                                      id={i}
                                                      ref={checkRefs[index]?.attributes[i]}
                                                      className="flex gap-2 items-center cursor-pointer overflow-hidden filter-checkbox"
                                                  >
                                                    {/*{filterItems[item]?.[attribute.key] && (*/}
                                                    {/*     <div className="hidden lg:block">*/}

                                                    <SvgCheckbox
                                                        click={
                                                            filterItems?.[item.name]?.[
                                                                attribute.key
                                                                ]?.check ?? false
                                                        }
                                                    />
                                                         {/*</div>*/}
                                                    {/*)}*/}
                                                    <span className=" border-gray-300  relative mr-3 mt-3 lg:mr-0 lg:mt-0 flex items-center border lg:border-none overflow-hidden rounded py-2 px-3 lg:py-0 ">
                                          {attribute?.key}
                                        </span>
                                                  </div>
                                              );
                                            }
                                          })}
                                    </div>
                                    {pagination[item.name] <
                                        item?.attributes?.length && (
                                            <button
                                                id={`viewMoreBtn-${item.name}`}
                                                onClick={() => handleViewMore(item.name)}
                                                className="mt-2 py-2 flex w-full justify-start items-center gap-x-1 text-[14px] leading-[17px] text-black"
                                            >
                                <span className="cursor-pointer truncate font-[400]">
                                  + {t("main.view_more")}
                                </span>
                                            </button>
                                        )}
                                  </div>
                                </div>
                              </div>
                            </div>
                        );
                      })}
                </div>
              </div>

              <button
                  onClick={handleReset}
                  className="flex justify-center bg-black items-center overflow-hidden rounded disabled:opacity-20 disabled:cursor-not-allowed hover:opacity-80 active:opacity-90 active:shadow-[inset_0px_0px_8px_rgba(0,0,0,0.25)] group cm-btn-second border w-full px-4 h-10 border-[1.5px] self-center rounded-none"
              >
                <div className="text-white inline-block truncate opacity-1 group-active:opacity-90">
                  {t("main.reset")}
                </div>
              </button>
            </aside>
          </div>
        </div>
      </div>

  );
};
export default FilterDashboard;
