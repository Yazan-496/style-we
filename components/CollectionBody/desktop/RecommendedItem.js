import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import Link from '../../../helpers/Link';
// const items = [
//   { name: "New In", link: "/collections/ss-2023" },
//   { name: "Dresses", link: "/collections/dresses-67263" },
//   { name: "Blouse Shirts", link: "/collections/blouse-shirts-67271" },
//   { name: "Pants", link: "/collections/pants" },
//   { name: "Outerwear", link: "/collections/outerwear-67285" },
//   { name: "Matching Sets", link: "/collections/jumpsuits-sets" },
//   { name: "Skirts", link: "/collections/skirts  " },
// ];
const RecommendedItems = ({ collections, parentCategory }) => {
  const { t, i18n } = useTranslation('translation');
  useEffect(() => {
    // console.log(collections, "collections");
    // console.log(parentCategory, "parentCategory");
  }, [collections, parentCategory]);
  return collections?.length > 0 ? (
    <div className="lg:pt-12 lg:flex items-center w-full overflow-hidden gap-3 px-2 py-2 lg:px-6 lg:py-7 bg-white lg:bg-[#F2F2F3] m-h-[72px] mt-3">
      <p className="hidden lg:block flex-grow-0 flex-shrink-0 text-base text-left capitalize text-[#222]">
        {t('main.categories')}
      </p>
      <div className="flex flex-row flex-wrap items-center gap-1 mt-1 lg:mt-0 lg:gap-3 overflow-hidden">
        {collections?.length > 0 &&
          collections?.map((item, index) => {
            return (
              <Link className="flex items-center justify-center space-x-2 flex-grow-0 flex-shrink-0 text-xs leading-4 px-1 py-1 lg:px-3 lg:py-2 bg-[#F2F2F3] lg:bg-white text-[#5D626A] hover:bg-[#111] hover:text-white" key={index} href={`/products/category=${item?.slug}`}>
                  <img className="hidden lg:block w-8 h-8" src={item?.icon} alt={item?.icon} />
                  <div>{item.name}</div>
              </Link>
            );
          })}
      </div>
    </div>
  ) : (
    <></>
  );
};
export default RecommendedItems;
