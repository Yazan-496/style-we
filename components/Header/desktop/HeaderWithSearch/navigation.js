'use client';
import React, { useEffect, useState } from 'react';
import Link from 'helpers/Link';
import NavElement from '../navElement';
import { LoaderCategory } from 'helpers/Loader/Loading';
import ContentLoader from 'react-content-loader';
import { useSelector } from 'react-redux';
const Navigation = ({ loading, categories }) => {
  useEffect(() => {
    // console.log(loading, "loading");
  }, [loading]);
  const [dir, setDir] = useState('left');
  const [load, setLoad] = useState([1, 1, 1, 1, 1, 1, 1, 1, 1]);
  const categoryReducer = useSelector((state) => state.ProductReducer?.category);
  // console.log("Categories =====> ", categoryReducer)
  const HiddenFun = () => {
    // console.log("HiddenFun");
  };
  useEffect(() => {
    HiddenFun();
  }, [categoryReducer]);
  return (
    <>
      <div id="cm-header-navigation">
        <div className="cm-layout-max mx-auto flex justify-center items-center gap-2">
          <div id="slider-container" className="overflow-hidden -my-4">
            <div
              id="slide-nav-categories"
              className="w-max min-w-full flex justify-center items-center py-4 coltragap"
            >
              {loading ? (
                <div className="flex flex-row space-x-12">
                  {load.map((one, i) => {
                    return (
                      <div key={i}>
                        <LoaderCategory
                          width={100}
                          height={30}
                          viewBox={'0 0 290 80'}
                        />
                      </div>
                    );
                  })}
                </div>
              ) : (
                categories?.map((category, index) => (
                  <div
                    onMouseOver={() => {
                      if (document.getElementById(`nav-element-${index}`)) {
                        document
                          .getElementById(`nav-element-${index}`)
                          .classList.remove('hidden');
                      }
                    }}
                    onMouseLeave={() => {
                      if (
                        document.getElementById(`nav-element-${index}`) &&
                        !document
                          .getElementById(`nav-element-${index}`)
                          .parentNode.matches(':hover')
                      ) {
                        document
                          .getElementById(`nav-element-${index}`)
                          .classList.add('hidden');
                      }
                    }}
                    onClick={() => {
                      if (
                        document.getElementById(`nav-element-${index}`) &&
                        !document
                          .getElementById(`nav-element-${index}`)
                          .parentNode.matches(':hover')
                      ) {
                        document
                          .getElementById(`nav-element-${index}`)
                          .classList.add('hidden');
                      }
                    }}
                    key={index}
                    id={`category-num-${index}`}
                    className="group banner-category-item"
                  >
                    <Link className="relative block group leading-none cm-nav-1 py-[15px]" shallow href={`/products/category=${category.slug}`}>
                        <span
                          className={`whitespace-nowrap text-[18px] font-[700] group-hover:text-[color:var(--cm-color-hover-link)] ${
                            category.category_front_color ? 'text-black' : ''
                          } `}
                        >
                          {category.category}
                        </span>
                        <span
                          className={`ml-1 text-black whitespace-nowrap text-[14px] font-[600] group-hover:text-black
                           `}
                        >
                          ({category?.num_available_product})
                        </span>
                        {category?.isHot ? (
                          <span
                            className="absolute block leading-[14px] right-1/2 translate-x-1/2 top-[-5px]"
                            title="HOT"
                          >
                            <span
                              className="block whitespace-nowrap text-[12px] leading-[14px] rounded-sm bg-red-600 text-white px-[5px] truncate"
                              style={{ maxWidth: '96px' }}
                            >
                              HOT
                            </span>
                            <span className="absolute left-1/2 top-full -ml-[3px] border-t-4 border-l-4 border-r-4 border-solid border-t-[color:#DC2626] border-x-transparent"></span>
                          </span>
                        ) : null}
                        <span className="h-[3px] rounded-sm absolute bottom-px w-0 transition-all left-0 bg-[gray] group-hover:w-full"></span>
                    </Link>
                  </div>
                ))
              )}
            </div>
          </div>
          <div className="flex justify-center items-center relative before:pointer-events-none before:absolute before:inline-block before:w-10 before:h-10 before:-left-[46px] before:bg-gradient-to-r before:from-white/0 before:to-white">
            <button
              id="leftButton"
              className="w-5 h-5 flex justify-center items-center rotate-180"
              onClick={() => {
                if (document.getElementById('slide-nav-categories')) {
                  document.getElementById(
                    'slide-nav-categories'
                  ).style.transform = 'translateX(0px)';
                  setDir('left');
                }
              }}
              disabled={dir === 'left'}
            >
              <svg
                width="7"
                height="12"
                viewBox="0 0 7 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  id="leftSvgArrow"
                  d="M0.5 10.96L5.5 5.95996L0.5 0.959961"
                  stroke={dir === 'left' ? '#CED0D3' : '#31353C'}
                  strokeWidth="1.25"
                ></path>
              </svg>
            </button>
            <button
              id="rightButton"
              className="w-5 h-5 flex justify-center items-center"
              onClick={() => {
                if (document.getElementById('slide-nav-categories')) {
                  let scrollWidth = parseInt(
                    document.getElementById('slide-nav-categories').scrollWidth
                  );
                  let clientWidth = parseInt(
                    document.getElementById('slider-container').clientWidth
                  );
                  document.getElementById(
                    'slide-nav-categories'
                  ).style.transform = `translateX(-${
                    scrollWidth - clientWidth + 100
                  }px)`;
                  setDir('right');
                }
              }}
              disabled={dir === 'right'}
            >
              <svg
                width="7"
                height="12"
                viewBox="0 0 7 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  id="rightSvgArrow"
                  d="M0.5 10.96L5.5 5.95996L0.5 0.959961"
                  stroke={dir === 'right' ? '#CED0D3' : '#31353C'}
                  strokeWidth="1.25"
                ></path>
              </svg>
            </button>
          </div>
        </div>
        <div>
          {categories?.map((category, index) => {
            if (category.sub_categories && category.sub_categories.length > 0) {
              return (
                <NavElement
                  category={category.sub_categories}
                  parentCategory={category.category}
                  index={index}
                  key={`${index}-sub`}
                />
              );
            }
          })}
        </div>
      </div>
    </>
  );
};

export default Navigation;
