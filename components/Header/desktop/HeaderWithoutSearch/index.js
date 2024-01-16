import { useEffect, useState } from "react";
import LeftBox from "./LeftBox";
import LogoBox from "./LogoBox";
import RightBox from "./RightBox";
import SwipedCart from "components/SwipedCart/desktop";
import SwipedCategories from "../SwipedCategories";
import { throttle } from "lodash";

const HeaderWithoutSearch = ({ categories }) => {
  const [isSticky, setIsSticky] = useState(false);
  const [cartOpened, setCartOpen] = useState(false);
  const [categoryOpened, setCategoryOpened] = useState(false);
  const [hideHeader, setHideHeader] = useState(false);

  useEffect(() => {
    const handleScroll = throttle(() => {
      const scrollTop =
        window.pageYOffset || document.documentElement.scrollTop;
      const isScrolledDown = scrollTop > 0;
      setHideHeader(isScrolledDown);
    }, 200);

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return (
    <>
      <div
        id="headerMainComp"
        className={`header __header top-[-1px] transition-all duration-500 z-[4] fixed w-full transition-all duration-500 ease-in-out ${
          hideHeader ? "-translate-y-full" : "translate-y-0"
        }`}
      >
        <div id="header-wrapper">
          <div id="header_container"></div>
        </div>
        <div className="hidden m-header">
          <div className="indexstyle-igpf96-0 ktwJDv m-header-content">
            <div className="header">
              <LeftBox
                setCategoryOpened={() => {
                  setCategoryOpened(true);
                }}
              />
              <LogoBox />
              <RightBox
                openCart={() => {
                  setCartOpen(true);
                }}
              />
            </div>
          </div>
        </div>
        <SwipedCart
          open={cartOpened}
          close={() => {
            setCartOpen(false);
          }}
        />
        <SwipedCategories
          open={categoryOpened}
          close={() => {
            setCategoryOpened(false);
          }}
        />
      </div>
      {cartOpened && <div className="global--mask" />}
      {categoryOpened && <div className="global--mask" />}
    </>
  );
};
export default HeaderWithoutSearch;
