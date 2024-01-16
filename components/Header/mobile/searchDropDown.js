import Image from "next/legacy/image";
import {
  RecentSearchSVG,
  TrashSearchSVG,
  TrendingSearchSVG,
  HotSearchSVG,
} from "components/svgs";
import Link from "helpers/Link";

const SearchDropDown = (props) => {
  return (
    <>
      <div className="absolute max-h-[340px] overflow-auto z-[1] top-auto flex flex-col justify-start items-start gap-6 px-[20px] py-[20px] bg-white rounded-[4px] mt-[2px] uudytydtgee">
        <div className="flex flex-col justify-start items-start self-stretch flex-grow-0 flex-shrink-0 gap-4">
          <div className="flex justify-between items-center self-stretch flex-grow-0 flex-shrink-0 relative">
            <div className="flex-grow-0 flex-shrink-0 text-base text-left text-[#000000] flex items-center">
              <RecentSearchSVG />
              Recent Search
            </div>
            <span className="cursor-pointer ">
              <TrashSearchSVG />
            </span>
          </div>
          <div className="flex flex-wrap justify-start items-start self-stretch flex-grow-0 flex-shrink-0 gap-[16px] ml-[20px]">
            <Link href="/search?q=Sandals">
                <div className="flex justify-center items-center flex-grow-0 flex-shrink-0 h-8 relative gap-1 px-[16px] py-[6px] rounded-[4px] bg-[#F2F2F2] text-[#31353C] hover:bg-[#E7E7E7]">
                  <div className="flex-grow-0 flex-shrink-0 text-sm text-left">
                    Sandals
                  </div>
                </div>
            </Link>
            <Link href="/search?q=Sandals">
                <div className="flex justify-center items-center flex-grow-0 flex-shrink-0 h-8 relative gap-1 px-[16px] py-[6px] rounded-[4px] bg-[#F2F2F2] text-[#31353C] hover:bg-[#E7E7E7]">
                  <div className="flex-grow-0 flex-shrink-0 text-sm text-left">
                    Jacket
                  </div>
                </div>
            </Link>
          </div>
        </div>
        <div className="flex flex-col justify-start items-start self-stretch flex-grow-0 flex-shrink-0 gap-4">
          <div className="flex justify-start items-center self-stretch flex-grow-0 flex-shrink-0 relative gap-[90px]">
            <div className="flex-grow-0 flex-shrink-0 text-base text-left text-[#000000] flex items-center">
              <TrendingSearchSVG />
              Trending
            </div>
          </div>
          <div className="flex flex-wrap justify-start items-start self-stretch flex-grow-0 flex-shrink-0 gap-[16px] ml-[20px]">
            <Link className="flex justify-center items-center flex-grow-0 flex-shrink-0 h-8 relative gap-1 px-[16px] py-[6px] rounded-[4px] bg-[#F2F2F2] text-black hover:bg-[#E7E7E7]" href="/collections/ss-2021-67472">
                <HotSearchSVG />
                <div className="flex-grow-0 flex-shrink-0 text-sm text-left text-[#31353C]">
                  Hot sale
                </div>
            </Link>
            <Link className="flex justify-center items-center flex-grow-0 flex-shrink-0 h-8 relative gap-1 px-[16px] py-[6px] rounded-[4px] bg-[#F2F2F2] text-black hover:bg-[#E7E7E7]" href="/collections/blouse-shirts-67271">
                <div className="flex-grow-0 flex-shrink-0 text-sm text-left text-[#31353C]">
                  Blouse Shirts
                </div>
            </Link>
            <Link className="flex justify-center items-center flex-grow-0 flex-shrink-0 h-8 relative gap-1 px-[16px] py-[6px] rounded-[4px] bg-[#F2F2F2] text-black hover:bg-[#E7E7E7]" href="/collections/blouse-shirts-67271">
                <div className="flex-grow-0 flex-shrink-0 text-sm text-left text-[#31353C]">
                  New Swimwear
                </div>
            </Link>
            <Link className="flex justify-center items-center flex-grow-0 flex-shrink-0 h-8 relative gap-1 px-[16px] py-[6px] rounded-[4px] bg-[#F2F2F2] text-black hover:bg-[#E7E7E7]" href="/collections/blouse-shirts-67271">
                <HotSearchSVG />
                <div className="flex-grow-0 flex-shrink-0 text-sm text-left text-[#31353C]">
                  Plus
                </div>
            </Link>
            <Link className="flex justify-center items-center flex-grow-0 flex-shrink-0 h-8 relative gap-1 px-[16px] py-[6px] rounded-[4px] bg-[#F2F2F2] text-black hover:bg-[#E7E7E7]" href="/collections/blouse-shirts-67271">
                <div className="flex-grow-0 flex-shrink-0 text-sm text-left text-[#31353C]">
                  Cocktail Dresses
                </div>
            </Link>
            <Link className="flex justify-center items-center flex-grow-0 flex-shrink-0 h-8 relative gap-1 px-[16px] py-[6px] rounded-[4px] bg-[#F2F2F2] text-black hover:bg-[#E7E7E7]" href="/collections/blouse-shirts-67271">
                <div className="flex-grow-0 flex-shrink-0 text-sm text-left text-[#31353C]">
                  Matching Sets
                </div>
            </Link>
            <Link className="flex justify-center items-center flex-grow-0 flex-shrink-0 h-8 relative gap-1 px-[16px] py-[6px] rounded-[4px] bg-[#F2F2F2] text-black hover:bg-[#E7E7E7]" href="/collections/blouse-shirts-67271">
                <div className="flex-grow-0 flex-shrink-0 text-sm text-left text-[#31353C]">
                  Floral Dresses
                </div>
            </Link>
            <Link className="flex justify-center items-center flex-grow-0 flex-shrink-0 h-8 relative gap-1 px-[16px] py-[6px] rounded-[4px] bg-[#F2F2F2] text-black hover:bg-[#E7E7E7]" href="/collections/blouse-shirts-67271">
                <div className="flex-grow-0 flex-shrink-0 text-sm text-left text-[#31353C]">
                  SS 2023
                </div>
            </Link>
            <Link className="flex justify-center items-center flex-grow-0 flex-shrink-0 h-8 relative gap-1 px-[16px] py-[6px] rounded-[4px] bg-[#F2F2F2] text-black hover:bg-[#E7E7E7]" href="/collections/blouse-shirts-67271">
                <div className="flex-grow-0 flex-shrink-0 text-sm text-left text-[#31353C]">
                  ACC
                </div>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default SearchDropDown;
