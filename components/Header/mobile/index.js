import HeaderMobile from "./Header";
import { useEffect, useState } from "react";
import TopBanner from "./TopBanner";
import { throttle } from "lodash";
import HeaderCheckout from "./HeaderCheckout";

export default function Header({
  openSideBar,
  loading,
  collection,
  categories,
  handleCloseSearchModal,
  handleOpenSearchModal,
  checkout,
  title,
}) {
  const [scrollPosition, setScrollPosition] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentPosition = window.pageYOffset;
      setScrollPosition(currentPosition);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return (
    <>
      <div className="flex flex-col">
        <div
          className={`w-full top-0 z-[50]
          `}
        >
          {/*<TopBanner />*/}
        </div>
        <nav
          className={`navbar ${
            scrollPosition > 55 ? "fixed" : ""
          } w-full z-[40]`}
        >
          {checkout ? (
            <HeaderCheckout title={title} />
          ) : (
            <HeaderMobile
              handleCloseSearchModal={handleCloseSearchModal}
              handleOpenSearchModal={handleOpenSearchModal}
              openSideBar={openSideBar}
              loading={loading}
              collection={collection}
              categories={categories}
            />
          )}
        </nav>
      </div>
    </>
  );
}
