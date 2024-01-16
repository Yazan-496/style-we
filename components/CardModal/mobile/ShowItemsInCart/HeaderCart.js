import React, { useEffect, useState } from "react";
import Link from "helpers/Link";
import Offer from "./Offer";
import { useTranslation } from "react-i18next";

const HeaderCart = ({ items, priceForFree }) => {
  const [isSticky, setIsSticky] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset;
      setIsSticky(scrollTop > 0);
    };

    window.addEventListener("scroll", handleScroll);

    // Cleanup event listener on component unmount
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  const { t, i18n } = useTranslation("translation");
  return (
    <>
      <header
        className={`${isSticky ? "sticky-header-mobile-2" : ""} header-mobile`}
      >
        <div className="components-nav-bar-mobile no-mask-nav  show v2">
          <Link href="/">
              {/*<a>*/}
              <i className="iconfont icon-c_icon_left show" />
              {/*</a>*/}
          </Link>
          <div className="title-header-mobile ">
            <div className="show">{t("user.my_bag")}</div>
          </div>
        </div>
      </header>
      <div className={`z-[11] fixed top-10 w-full bg-white border-b-[1px] `}>
        <Offer items={items} priceForFree={priceForFree} />
      </div>
    </>
  );
};

export default HeaderCart;
