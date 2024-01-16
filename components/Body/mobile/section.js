import Swiper from "./swiper";
import LoadMore from "./loadMore";
import Categories from "./categories";
import Sale from "./sale";
import Photos from "./photos";
import Products from "./products.js";
import RelatedSearches from "../../RelatedSearches/mobile";
import { useEffect } from "react";

const Section = ({ section, index }) => {
  return (
    <>
      <div className={`item-wrap`}>
        {section.isSwiper ? <Swiper section={section} /> : null}
        {section.isCategories ? (
          <Categories section={section} style={{ paddingTop: "12px" }} />
        ) : null}
        {section.isSale ? <Sale section={section} /> : null}
        {section.isPhotos === 1 ? <Photos section={section} /> : null}
        {/*{section.isProducts ? <Products section={section} /> : null}*/}
        {section.hasMore ? <LoadMore /> : null}
        {/*{section ? <RelatedSearches /> : null}*/}
      </div>
    </>
  );
};

export default Section;
