import React from "react";
import ProductComponent from "./ProductComponent";
const ItemResult = ({ name }) => {
  const products = [
    {
      id: 111,
      name: "Product 1",
      link: "/products/casual-plain-spring-fall-polyester-daily-long-1-dress-h-line-shirt-collar-denim-dresses-for-women-15198575?variant=3609647",
      image:
        "/resize/335x445/image/catalog/product/2023-03/29/1943cbaeb2437ba6140728eab5712045.jpg",
      title: " Faux Denim Shirt Collar Casual Loose Denim Dress",
      price: "$49.99",
      offer: "Get 3rd 20% off",
    },
    {
      id: 222,
      name: "Product 1",
      link: "/products/casual-plain-spring-fall-polyester-daily-long-1-dress-h-line-shirt-collar-denim-dresses-for-women-15198575?variant=3609647",
      image:
        "/image_cache/resize/335x445/image/catalog/product/2023-03/29/1943cbaeb2437ba6140728eab5712045.jpg",
      title: " Faux Denim Shirt Collar Casual Loose Denim Dress",
      price: "$49.99",
      offer: "Get 3rd 20% off",
    },
  ];
  return (
    <div className="w-[calc(100%-216px-24px)]">
      <div className="flex gap-3 h-10 items-center mb-3">
        <h1 className="text-lg leading-none">{name}</h1>
        <div className="flex-1">
          <div className="flex justify-between items-center self-stretch flex-grow-0 flex-shrink-0 relative h-9">
            <div className="flex-grow-0 flex-shrink-0 text-sm font-normal text-center text-[#31353C]">
              <span className="notranslate">{products.length}</span> {/* */}
              Results
            </div>
            <div className="flex items-center gap-[6px]">
              <span className="text-base text-[#31353C] font-normal">
                Sort By
              </span>
              <div
                className="flex justify-start items-center h-9 gap-1 pl-3 pr-1.5 py-1 border border-black/20 cursor-pointer h-9"
                style={{ minWidth: 200, maxWidth: 240 }}
              >
                <p className="block flex-1 truncate text-[14px] text-left text-[#31353C] font-semibold">
                  Our Pick
                </p>
                <svg
                  stroke="#31353C"
                  viewBox="0 0 32 32"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="transition-transform -rotate-90"
                  width={28}
                  height={28}
                >
                  <path d="m20 8-8 8 8 8" strokeWidth={2} />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="product-list flex flex-wrap gap-6 w-full pb-20">
        {products.map((product, index) => {
          return <ProductComponent key={index} product={product} />;
        })}
      </div>
      <div className="flex flex-col items-stretch gap-5 pb-20">
        <div
          style={{
            alignSelf: "center",
          }}
          className="style_paginationWrapper__YMATm"
        >
          <ul
            className="pagination notranslate"
            role="navigation"
            aria-label="Pagination"
            style={{
              display: "inline-flex",
            }}
          >
            <li className="previous disabled">
              <a
                className=" "
                tabIndex={-1}
                role="button"
                aria-disabled="true"
                aria-label="Previous page"
                rel="prev"
              >
                <svg
                  stroke="#31353C"
                  viewBox="0 0 32 32"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  width={30}
                  height={30}
                  className="inline-block"
                >
                  <path d="m20 8-8 8 8 8" strokeWidth={2} />
                </svg>
              </a>
            </li>
            <li className="selected">
              <a
                rel="canonical"
                href="/collections/clothing"
                tabIndex={-1}
                aria-label="Page 1 is your current page"
                aria-current="page"
              >
                1
              </a>
            </li>
            <li className="previous disabled">
              <a
                className=" "
                tabIndex={-1}
                role="button"
                aria-disabled="true"
                aria-label="Previous page"
                rel="prev"
              >
                <svg
                  stroke="#31353C"
                  viewBox="0 0 32 32"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  width={30}
                  height={30}
                  className="inline-block rotate-180"
                >
                  <path d="m20 8-8 8 8 8" strokeWidth={2} />
                </svg>
              </a>
            </li>
          </ul>
        </div>
        <div className="text-center text-base text-[#868C93]">
          A total of {products.length} pages
        </div>
      </div>
      <div className="relative overflow-hidden mb-[60px] p-3 border border-black border-opacity-10 text-base text-[#5D626A]">
        <div className="whitespace-pre-line line-clamp-4">
          StyleWes Clothing Edit include the most popular items for work and
          play also dating. Find a selection of the best clothes for women,
          including the best pants for women and the best blouses for women so
          you can build the perfect wardrobe. Also we have fashion dresses for
          any occassion you need.
        </div>
        <div className="shadow absolute invisible pointer-events-none whitespace-pre-line">
          StyleWes Clothing Edit include the most popular items for work and
          play also dating. Find a selection of the best clothes for women,
          including the best pants for women and the best blouses for women so
          you can build the perfect wardrobe. Also we have fashion dresses for
          any occassion you need.
        </div>
      </div>
    </div>
  );
};
export default ItemResult;
