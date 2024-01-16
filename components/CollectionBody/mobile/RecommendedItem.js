import React, { useEffect } from 'react';
import Link from '../../../helpers/Link';
const items = [
  { name: 'New In', link: '/collections/ss-2023' },
  { name: 'Dresses', link: '/collections/dresses-67263' },
  { name: 'Blouse Shirts', link: '/collections/blouse-shirts-67271' },
  { name: 'Pants', link: '/collections/pants' },
  { name: 'Outerwear', link: '/collections/outerwear-67285' },
  { name: 'Matching Sets', link: '/collections/jumpsuits-sets' },
  { name: 'Skirts', link: '/collections/skirts  ' },
];
const RecommendedItems = ({ collections, parentCategory }) => {
  useEffect(() => {
    // console.log(collections, "collections");
  }, [collections]);
  return (
    <>
      <div
        id="collection-header"
        className="header-v-2 overflow-x-auto"
        style={{ top: 44 }}
      >
        <div className="component__classify overflow-x-auto">
          <div
            className="overflow-x-auto swiper-container swiper-container-initialized swiper-container-horizontal swiper-container-free-mode"
            id="component-classify"
          >
            <div className=" overflow-x-auto swiper-wrapper">
              {collections?.length > 0 &&
                collections?.map((item, index) => {
                  return (
                    <div className="swiper-slide pb-5">
                      <div className="component__classify-inner">
                        <div className="component__classify-wrapper">
                          <Link
                            key={index}
                            href={`/products/category=${item?.slug}`}
                            className="flex items-center justify-center space-x-2 flex-grow-0 flex-shrink-0 text-sm leading-4 px-3 py-2 bg-white text-[#5D626A] hover:bg-[#111] hover:text-white"
                          >
                            <img
                              className="w-8 h-8"
                              src={item?.icon}
                              alt={item?.icon}
                            />
                            <div>{item.name}</div>
                          </Link>
                        </div>
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default RecommendedItems;
