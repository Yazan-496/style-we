"use client"
import Layout from './layout';
import Navigation from './navigation';
import SwipedCart from 'components/SwipedCart/desktop';
import { useEffect, useState } from 'react';
import { throttle } from 'lodash';
import TopBanner from '../TopBanner';
import HeaderDesktop from '../HeaderDesktop';
// import { Transition } from '@headlessui/react';
import { useSelector } from 'react-redux';
const HeaderWithSearch = ({ loading, categories }) => {
  const [cartOpened, setCartOpen] = useState(false);
  const [isSticky, setIsSticky] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(true);
  const openCartReducer = useSelector((store) => store.CartReducer.openCart);

  useEffect(() => {
    const handleScroll = () => {
      const ScrollPosition = window.scrollY;
      // console.log(ScrollPosition, "ScrollPosition");
      if (ScrollPosition > 0 && ScrollPosition <= 400) {
        setIsSticky(true);
        setScrollPosition(false);
      } else if (ScrollPosition === 0) {
        setIsSticky(false);
        setScrollPosition(true);
      } else {
        setScrollPosition(false);
        setIsSticky(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  useEffect(() => {
    setCartOpen(openCartReducer);
  }, [openCartReducer]);
  return (
    <>
      {/*<div className="flex flex-col">*/}
      <div
        className={`overflow-hidden w-full top-0 z-[50]
        `}
      >
        {/*<TopBanner />*/}
        <nav
          className={` w-full bg-white z-50 ${
            !scrollPosition && isSticky
              ? 'fixed  top-0  '
              : !isSticky && scrollPosition
              ? ' fixed shadow-lg top-0 '
              : !isSticky && !scrollPosition
              ? 'fixed top-[-150px]'
              : ''
          }  transition-all duration-200`}
        >
          <HeaderDesktop
            loading={loading}
            setCartOpen={() => setCartOpen(true)}
            // hideHeader={scrollPosition > 505}
            categories={categories}
          />
        </nav>
      </div>
      <SwipedCart
        open={cartOpened}
        close={() => {
          setCartOpen(false);
        }}
      />
      {cartOpened && <div className="global--mask" />}
      {/*</div>*/}
    </>
  );
};
export default HeaderWithSearch;
