import { CategoriesLogo, LoaderLogo } from "../../../helpers/Loader/Loading";
import React from "react";
import { SwiperSlide } from "swiper/react";
import { useTranslation } from "react-i18next";
import Link from "../../../helpers/Link";
const Categories = ({ loading, section }) => {
  const arr = [1, 1, 1, 1, 1, 1, 1, 1];
  const filteredImages =
    section?.length % 2 === 1 ? section?.slice(0, -2) : section;

  // Divide the images into rows
  let rows = [];
  for (let i = 0; i < filteredImages?.length; i += 4) {
    const rowImages = filteredImages?.slice(i, i + 4);
    rows.push(rowImages);
  }
  const { t, i18n } = useTranslation("translation");
  return (
    <>
      <div className=" w-full pt-[0px] px-[5px] flex flex-wrap ">
        <div className="relative after:clear-both after:table  w-full">
          <a className="cursor-pointer categoriesMainPhoto flex flex-wrap flex-row justify-center items-center">
            {loading ? (
              <LoaderLogo
                width={"100vw"}
                height={50}
                viewBox={"0 0 1000 30"}
                rotate={"0"}
              />
            ) : (
              // <img
              //   layout="fill"
              //   src="https://stylewe.vercel.app/image/catalog/activity/mguU51FPev1680258696.jpg"
              //   alt="shop by Category"
              //   className="w-[100%] h-[25px]"
              // />
              <div className="font-[400] text-l text-gray-500 p-2 flex items-center justify-center bg-[#f9eae7] w-[100%] h-[25px]">
                {t("main.shop_by_category")}
              </div>
            )}
          </a>
        </div>
        {!section?.length > 0 ? (
          arr.map((one, index) => {
            return (
              <div key={index}>
                <CategoriesLogo
                  width={"25%"}
                  height={120}
                  viewBox={"0 0 440 430"}
                  rotate={"0"}
                />
              </div>
            );
          })
        ) : (
          <div className="aspect-[2/1] flex flex-wrap justify-center items-center px-[0px] bg-[#f9eae7] ">
            {filteredImages.map((category, i) => {
              return (
                <div key={i} className="p-2 w-1/3 h-1/3">
                  <Link className="relative rounded-[5px] border border-solid border-gray-300 w-[100%] h-[100%] flex flex-row justify-center items-center cursor-pointer bg-[white] " href={`/products/category=${category.slug}`}>
                    <img
                      src={category?.icon}
                      alt="shop by category"
                      className="rounded-[10px] pl-2 p-1 bg-[white] w-[35%] h-[100%]"
                    />
                    <div className=" rounded-[10px] self-center flex justify-center items-center text-center bg-[white] w-[55%] h-[100%]">
                      <span className="flex flex-col text-xs font-[200]">
                        {category.category}
                        <span className="text-xs  font-[100] relative left-0">
                          ({category?.num_available_product})
                        </span>
                      </span>
                    </div>
                  </Link>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </>
  );
};

export default Categories;
