import SwiperComponents from "./swiper";
import SwiperComponent from "./SwiperComponent";
import BannerNoSwipper from "./BannerNoSwipper";
import LoadMore from "./loadMore";
import Categories from "./categories";
import Sale from "./sale";
import Photos from "./photos";
import Products from "./products.js";

const Section = ({ section, index }) => {
  return (
    <>
      <div
        className={`mx-auto empty:hidden ${index === 0 ? "" : ""}`}
        style={
          section?.hasPadding
            ? { paddingTop: `${section.padding}px` }
            : { paddingTop: "0px" }
        }
      >
        {section ? <SwiperComponents section={section} /> : null}
        {/*{section.isCategories ? <Categories section={section} /> : null}*/}
        {/*{section.isFeatured ? <SwiperComponent section={section} /> : null}*/}
        {/*{section.isFeaturedNoSwiper ? <BannerNoSwipper section={section} /> : null}*/}
        {/*{section.isSale ? <Sale section={section} /> : null}*/}
        {/*{section.isPhotos ? <Photos section={section} /> : null}*/}
        {/*{section.isProducts ? <Products section={section} /> : null}*/}
        {/*{section.hasMore ? <LoadMore /> : null}*/}
      </div>
    </>
  );
};

export default Section;
