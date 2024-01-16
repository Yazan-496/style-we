import React, {
  createRef,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { NiceSvg } from "../../svgs";
import { useDispatch, useSelector } from "react-redux";
import { log } from "next/dist/server/typescript/utils";
import { useTranslation } from "react-i18next";

const ModalFilters = ({
  handleCloseFiltersModal,
  collections,
  Products,
  setFilteredItems,
  removeFromFilter,
  setFinalFilteredItems,
}) => {
  const dispatch = useDispatch();
  const [click, setClick] = useState(false);
  const { t, i18n } = useTranslation("translation");
  const [pagination, setPagination] = useState({
    Sizes: 10,
    Brands: 10,
    Prices: 10,
  });
  const attributes = useSelector((state) => state.ProductReducer.Products);
  const sync = useSelector((store) => store.ProductReducer.sync);

  const [attributesArray, setAttributesArray] = useState([]);
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
  const [filters, setFilters] = useState([]);
  const Update_Filters = useSelector(
    (state) => state.ProductReducer.Update_Filters
  );
  useEffect(() => {
    setFilters(ObjectToArray(Update_Filters));
  }, [Update_Filters]);
  useEffect(() => {}, [filters, attributesArray]);
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
    inputRefs[index].current = !inputRefs[index].current;
    setClick(!click);
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
  const ObjectToArray = (filteredItems) => {
    return Object.entries(filteredItems).map(([key, value]) => ({
      key,
      value,
    }));
  };
  function getFilteredValues(filter) {
    return Object.entries(filter)
      .filter(([key, value]) => value.check === true)
      .map(([key, value]) => {
        return { key, value: value.value };
      });
  }

  const handleCheckFilters = (item, attribute) => {
    setFilterItems((prevState) => {
      const newState = {
        ...prevState,
        [item]: {
          ...prevState[item],
          [attribute.key]: {
            value: attribute.value,
            check: !prevState[item]?.[attribute.key]?.check,
          },
        },
      };
      return newState;
    });

    if (Update_Filters[item].some((a) => a.value === attribute.value)) {
      dispatch({ type: "Delete_Filters", payload: { attribute, item } });
    } else {
      dispatch({ type: "Add_Filter", payload: { attribute, item } });
    }
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
    dispatch({ type: "RESET_FILTERS" });
  };

  const handleScroll = useCallback(
    (item) => {
      const viewMoreBtn = document.getElementById(`viewMoreBtn-${item}`);
      if (parentRef.current && viewMoreBtn) {
        viewMoreBtn.scrollIntoView({ behavior: "smooth", block: "end" });
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

  const dispatchFun = useCallback((keysObject) => {
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
    // dispatchFun(keysObject);
  }, [dispatchFun, click]);

  function handleResetModal() {
    handleReset();
    handleCloseFiltersModal();
  }

  return (
    <div className="w-full h-full bg-white overflow-y-auto">
      <div className="flex pt-5 pb-5 px-5 w-full sticky top-0 z-10 bg-white ">
        <span className="font-[700] text-2xl">{t("user.filter")}</span>
        <button
          className="font-[700] relative left-[80%] text-2xl"
          onClick={handleCloseFiltersModal}
        >
          X
        </button>
      </div>
      <div className="">
        {attributesArray?.length > 0 &&
          attributesArray.map((item, index) => {
            return (
              <div
                ref={inputRefs[index]}
                key={index}
                id={index}
                className="mb-[0.75rem]"
              >
                <div
                  className={`${
                    item.attributes?.length === 0 ? "hidden" : ""
                  } flex h-[43px] p-1 items-center bg-gray-100`}
                >
                  <span
                    title={item.name}
                    className="text-xl text-[rgb(0 0 0/1)]"
                  >
                    {item.label}
                  </span>
                  <div
                    aria-expanded={inputRefs[index].current}
                    aria-disabled="false"
                    onClick={(e) => handleExpand(index)}
                    className="relative left-[80%]"
                  >
                    <svg
                      width={11}
                      height={7}
                      viewBox="0 0 11 7"
                      fill="none"
                      className={inputRefs[index].current ? "" : "rotate-180"}
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
                <div
                  className="transition-height duration-300"
                  aria-hidden="false"
                  style={{ height: "auto", overflow: "initial" }}
                >
                  <div className="p-1">
                    <ul className="flex flex-wrap">
                      {item.attributes?.length > 0 &&
                        item.attributes.map((attribute, i) => {
                          if (i < pagination[item?.name]) {
                            return (
                              <div>
                                <li
                                  onClick={(e) =>
                                    handleCheck(i, index, item?.name, attribute)
                                  }
                                  key={i}
                                  id={i}
                                  ref={checkRefs[index]?.attributes[i]}
                                  className={`${
                                    Update_Filters[item.name].some(
                                      (a) => a?.value === attribute?.value
                                    )
                                      ? "border border-black bg-gray-100 "
                                      : " border-gray-300"
                                  }  relative mr-3 mt-3 flex items-center border overflow-hidden rounded py-2 px-3`}
                                >
                                  <span className="text-ellipsis whitespace-nowrap text-base leading-tight text-gray-800 ">
                                    {attribute?.key}
                                  </span>
                                  {Update_Filters[item.name].some(
                                    (a) => a?.value === attribute?.value
                                  ) && (
                                    <div className="relative right-[-10px] bottom-[-8px]">
                                      <NiceSvg />
                                    </div>
                                  )}
                                </li>
                              </div>
                            );
                          }
                        })}
                      {pagination[item.name] < item?.attributes?.length && (
                        <li
                          id={`viewMoreBtn-${item.name}`}
                          onClick={() => handleViewMore(item.name)}
                          className="relative mt-3 flex items-center overflow-hidden rounded border border-gray-300 bg-white py-2 px-3 text-base leading-tight text-gray-800"
                        >
                          <span>+ </span>
                          <span className="ml-1/4 flex flex-nowrap overflow-x-auto whitespace-nowrap">
                            {t("user.view_more")}
                          </span>
                        </li>
                      )}
                    </ul>
                  </div>
                </div>
              </div>
            );
          })}
      </div>
      <div className="z-[50] p-10 flex justify-center self-stretch flex-grow-0 flex-shrink-0 gap-4 bottom-0 left-0  purchase-btn mt-2 sticky pt-2 bg-white bg-opacity-95 flex-grow items-end">
        <button
          onClick={handleCloseFiltersModal}
          className="w-[50%] flex justify-center items-center overflow-hidden rounded disabled:opacity-20 disabled:cursor-not-allowed hover:opacity-80 active:opacity-90 active:shadow-[inset_0px_0px_8px_rgba(0,0,0,0.25)] group cm-btn-primary flex-grow h-12 gap-1"
        >
          <div className=" inline-block truncate opacity-1 group-active:opacity-90">
            <p className="flex-grow-0 flex-shrink-0 text-lg font-bold">
              {t("user.done")}
            </p>
          </div>
        </button>
        <button
          onClick={handleResetModal}
          className="w-[50%] flex justify-center items-center overflow-hidden rounded disabled:opacity-20 disabled:cursor-not-allowed hover:opacity-80 active:opacity-90 active:shadow-[inset_0px_0px_8px_rgba(0,0,0,0.25)] group cm-btn-second border h-12 px-3"
        >
          <div className="inline-block truncate opacity-1 group-active:opacity-90">
            {t("user.reset")}
          </div>
        </button>
      </div>
    </div>
  );
};
export default ModalFilters;
