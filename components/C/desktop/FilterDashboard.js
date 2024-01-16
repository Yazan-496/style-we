import React, { useEffect, useMemo, useRef } from "react";
import { SvgCheckbox } from "components/svgs";
import Slider from "rc-slider";
const data = [
  {
    name: "Color",
    attributes: ["Red", "BLue", "Black", "Green", "White"],
    viewMore: true,
  },
  {
    name: "Size",
    attributes: ["S", "M", "L", "XL", "XXL", "XXXL"],
    viewMore: true,
  },
  {
    name: "Pattern",
    attributes: ["Striped", "Geometric", "Floral", "Polka Dots"],
    viewMore: true,
  },
  {
    name: "Style",
    attributes: ["Vintage", "Casual", "Vacation", "Urban"],
    viewMore: true,
  },
  {
    name: "Price",
    slider: true,
    attributes: [],
    viewMore: false,
  },
];
const FilterDashboard = () => {
  const [click, setClick] = React.useState(false);
  const [rangeValue, setRangeValue] = React.useState([0, 40]);
  const inputRefs = useMemo(
    () =>
      Array(data.length)
        .fill(0)
        .map((i) => React.createRef()),
    []
  );

  const checkRefs = useRef([]);
  const handleSetRange = (value) => {
    setRangeValue(value);
  };
  const handleExpand = (index, e) => {
    inputRefs[index].current = !inputRefs[index].current;
    setClick(!click);
  };
  const handleCheck = (i, index) => {
    checkRefs.current[i] = !checkRefs.current[i];
    setClick(!click);
  };
  const handleReset = () => {
    setRangeValue([0, 40]);
    const indexes = [0, 1, 2, 3, 4, 5, 6];
    const is = [0, 1, 2, 3, 4, 5, 6];
    is.map((ref, i) => {
      indexes.map((index) => {
        checkRefs.current[`${i}${index}`] = false;
      });
    });
    checkRefs.current.fill(false);
    setClick(!click);
  };
  useEffect(() => {
    inputRefs.map((one, index) => {
      one.current = false;
    });
  }, []);
  useEffect(() => {
    // console.log(
    //   checkRefs.current.filter((one) => one === true)[0],
    //   "checkRefs"
    // );
  }, [checkRefs, click]);
  return (
    <div className="w-[216px]">
      <div style={{ top: 133 }} className="style_stickyBox__SNnmA">
        <aside className="style_filter__je3Sd">
          <h1 className="text-lg leading-10 pb-3 font-semibold leading-0 text-black border-b border-[#E0E1E3]">
            FILTERS
          </h1>
          <div className="flex flex-col gap-3">
            <div className="rc-collapse bg-transparent">
              {data.map((item, index) => {
                return item.slider ? (
                  <>
                    {" "}
                    <span className="rc-collapse-header-text">
                      <h2
                        title="Color"
                        className="text-base font-semibold leading-10 truncate"
                      >
                        {item.name}
                      </h2>
                    </span>
                    <div className="flex justify-between items-center w-full h-3.5">
                      <p className="text-sm text-left text-[#5D626A] notranslate">
                        ${rangeValue[0]}
                      </p>
                      <p className="text-sm text-left text-[#5D626A] notranslate">
                        ${rangeValue[1]}
                      </p>
                    </div>
                    <Slider
                      range
                      trackStyle={{
                        backgroundColor: "rgb(34, 34, 34)",
                        height: "2px",
                      }}
                      railStyle={{
                        backgroundColor: "rgba(0, 0, 0, 0.15)",
                        height: "2px",
                      }}
                      handleStyle={{
                        backgroundColor: "rgb(34, 34, 34)",
                        borderColor: "rgb(34, 34, 34)",
                        width: "10px",
                        height: "10px",
                      }}
                      allowCross={false}
                      value={rangeValue}
                      defaultValue={[0, 40]}
                      onChange={handleSetRange}
                    />
                  </>
                ) : (
                  <div
                    ref={inputRefs[index]}
                    key={index}
                    id={index}
                    className="rc-collapse-item"
                  >
                    <div
                      onClick={(e) => handleExpand(index, e)}
                      className="rc-collapse-header"
                      aria-expanded={
                        inputRefs[index].current && inputRefs[index].current
                      }
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
                              inputRefs[index].current && inputRefs.current
                                ? ""
                                : "rotate-180"
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
                          title="Color"
                          className="text-base font-semibold leading-10 truncate"
                        >
                          {item.name}
                        </h2>
                      </span>
                    </div>
                    <div
                      className={
                        inputRefs[index].current && inputRefs[index].current
                          ? "rc-collapse-content rc-collapse-content-active"
                          : "rc-collapse-content rc-collapse-content-inactive rc-collapse-content-hidden"
                      }
                    >
                      <div className="rc-collapse-content-box">
                        <div className="">
                          <div className="flex flex-col gap-x-2 gap-y-4 w-full">
                            {item.attributes.map((attribute, i) => {
                              return (
                                <div
                                  onClick={(e) =>
                                    handleCheck(`${i}${index}`, index)
                                  }
                                  key={i}
                                  ref={checkRefs[`${i}${index}`]}
                                  className="flex gap-2 items-center cursor-pointer overflow-hidden filter-checkbox"
                                >
                                  <SvgCheckbox
                                    click={checkRefs.current[`${i}${index}`]}
                                  />
                                  <span className="text-[#484C52] text-[14px] leading-[17px] flex-1 truncate select-none">
                                    {attribute}
                                  </span>
                                </div>
                              );
                            })}
                          </div>
                          {item.viewMore && (
                            <button className="mt-2 py-2 flex w-full justify-start items-center gap-x-1 text-[14px] leading-[17px] text-black">
                              <span className="truncate font-[500]">
                                + VIEW MORE
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
            <button className="flex justify-center items-center overflow-hidden rounded disabled:opacity-20 disabled:cursor-not-allowed hover:opacity-80 active:opacity-90 active:shadow-[inset_0px_0px_8px_rgba(0,0,0,0.25)] group cm-btn-second border w-full px-4 h-10 border-[1.5px] self-center rounded-none">
              <div
                onClick={handleReset}
                className="inline-block truncate opacity-1 group-active:opacity-90"
              >
                RESET
              </div>
            </button>
          </div>
        </aside>
      </div>
    </div>
  );
};
export default FilterDashboard;
