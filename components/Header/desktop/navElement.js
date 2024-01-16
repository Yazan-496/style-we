import Link from "helpers/Link";
import React, { useEffect } from "react";
import store from "../../../store";
import { useSelector } from "react-redux";

const NavElement = (props) => {
  // const categoryReducer = useSelector((state) => state.ProductReducer?.category);
  // const HiddenFun = () => {
  //   // console.log("HiddenFun");
  //   if (
  //     document.getElementById(`nav-element-${props.index}`) &&
  //     !document.getElementById(`category-num-${props.index}`)?.matches(":hover")
  //   ) {
  //     document
  //       .getElementById(`nav-element-${props.index}`)
  //       .classList.add("hidden");
  //   }
  // };
  // useEffect(() => {
  //   HiddenFun();
  // }, [categoryReducer]);
  return (
    <div
      onMouseLeave={() => {
        if (
          document.getElementById(`nav-element-${props.index}`) &&
          !document
            .getElementById(`category-num-${props.index}`)
            .matches(":hover")
        ) {
          document
            .getElementById(`nav-element-${props.index}`)
            .classList.add("hidden");
        }
      }}
      id={`nav-element-${props.index}`}
      key={`nav-element-${props.index}`}
      className="top-auto absolute z-10 w-full left-0 -translate-y-px mx-auto py-5 px-[50px] bg-white border-b border-solid border-b-[#e7e7e7] shadow-[0_1px_4px_rgba(0,0,0,0.15)] hidden"
    >
      <div className="max-w-[1450px] mx-auto flex justify-center">
        <div className="category-container">
          {props.category?.map((sub, index) => {
            return (
              <div key={index} className="category">
                <Link key={index} href={`/products/category=${sub.slug}`}>
                  <span className="cursor-pointer font-black truncate">
                    {sub.name}{" "}
                    <span className="text-sm relative left-0">
                      ({sub?.num_available_product})
                    </span>
                  </span>
                </Link>
                <div className="child-list">
                  {sub.childes?.map((child, i) => {
                    return (
                      <Link key={i} href={`/products/category=${child.slug}`}>
                        <span className="font-[700] truncate">
                          {child.name}{" "}
                          <span className="text-sm relative left-0">
                            ({child?.num_available_product})
                          </span>
                        </span>
                      </Link>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
        <div className="flex items-start justify-center max-w-[660px] m-5 gap-5">
          {props.category?.map((sub, i) => {
            return (
              <div key={i} className="relative">
                {/*<Link href={sub.banner}>*/}
                <a>
                  <img src={sub.icon} alt="navigation photo ad" />
                </a>
                {/*</Link>*/}
              </div>
            );
          })}{" "}
        </div>
      </div>
    </div>
  );
};

export default NavElement;
