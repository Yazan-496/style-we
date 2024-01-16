import React from 'react';
const items = [
  { name: 'New In', link: '/collections/ss-2023' },
  { name: 'Dresses', link: '/collections/dresses-67263' },
  { name: 'Blouse Shirts', link: '/collections/blouse-shirts-67271' },
  { name: 'Pants', link: '/collections/pants' },
  { name: 'Outerwear', link: '/collections/outerwear-67285' },
  { name: 'Matching Sets', link: '/collections/jumpsuits-sets' },
  { name: 'Skirts', link: '/collections/skirts  ' },
];
const RecommendedItems = () => {
  return (
    <div className="flex items-center w-full overflow-hidden gap-3 px-6 py-7 bg-[#F2F2F3] m-h-[72px]">
      <p className="flex-grow-0 flex-shrink-0 text-base text-left capitalize text-[#222]">
        Recommend
      </p>
      <div className="flex flex-wrap items-center gap-3 max-h-[76px] overflow-hidden">
        {items.map((item, index) => {
          return (
            <Link className="flex items-center justify-center space-x-2 flex-grow-0 flex-shrink-0 text-sm leading-4 px-3 py-2 bg-white text-[#5D626A] hover:bg-[#111] hover:text-white" key={index} href={`/products/category=${item?.slug}`}>
              <img className="w-8 h-8" src={item?.icon} alt={item?.icon} />
              <div>{item.name}</div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};
export default RecommendedItems;
