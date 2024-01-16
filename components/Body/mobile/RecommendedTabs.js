import { useEffect, useRef, useState } from "react";

import dynamic from "next/dynamic";
const OwlCarousel = dynamic(import("react-owl-carousel"), {
  ssr: false,
});
const RecommendedTabs = () => {
  const tabs = [
    {
      id: "tab1",
      label: "Recommended",
      content: <div>Content for Recommended</div>,
    },
    {
      id: "tab2",
      label: "Best Sellers",
      content: <div>Content for Best Sellers</div>,
    },
    {
      id: "tab3",
      label: "Hot Dresses",
      content: <div>Content for Hot Dresses</div>,
    },
    {
      id: "tab4",
      label: "Tops",
      content: <div>Content for Tops</div>,
    },
    // {
    //   id: "tab5",
    //   label: "Bottoms",
    //   content: <div>Content for Bottoms</div>,
    // },
  ];
  const [activeTab, setActiveTab] = useState(tabs[0].id);
  const [click, setClick] = useState(true);
  const tabRef = useRef(null);
  const carouselRef = useRef(null);

  const handleTabClick = (tabId) => {
    setActiveTab(tabId);
    setClick(false);
    const activeTabElement = carouselRef.current?.querySelector(
      `[data-tab="${tabId}"]`
    );
    const carouselContainer = carouselRef.current?.parentNode;

    // Reset border for all tab elements
    const tabElements = carouselRef.current?.getElementsByClassName("tab");
    Array.from(tabElements).forEach((tabElement) => {
      tabElement.style.border = "none";
      tabElement.style.fontSize = "small";
      tabElement.style.fontWeight = "400";
    });

    // Apply border to active tab element
    if (activeTabElement) {
      activeTabElement.style.borderBottom = "2px solid black"; // Replace with your desired border style
      activeTabElement.style.fontSize = "larger"; // Replace with your desired border style
      activeTabElement.style.fontWeight = "600"; // Replace with your desired border style
    }

    // Scroll carousel to the active tab
    carouselContainer.scrollLeft =
      activeTabElement.offsetLeft - carouselContainer.offsetLeft;
  };
  return (
    <div className="component__panel--wrapper is-product-recommend initial-panel">
      <div className="hide-head-fixed">
        <div className="component__tabs--wrapper">
          <div className="component__tabs--head" style={{ padding: 0 }}>
            <div className="swiper-container component__swiper-container swiper-container-initialized swiper-container-horizontal swiper-container-free-mode">
              <div
                ref={carouselRef}
                className="carousel-container"
                style={{
                  paddingLeft: 10,
                  paddingRight: 10,
                  width: "max-content",
                }}
              >
                <div className="carousel">
                  <div className="swiper-slide">
                    {tabs.map((tab, index) => {
                      return (
                        <div
                          style={{ marginRight: 20, width: "max-content" }}
                          key={index}
                          onClick={() => handleTabClick(tab.id)}
                        >
                          <span
                            data-tab={tab.id}
                            className={`tab content ${
                              click && index === 0 ? "default-click" : ""
                            }`}
                          >
                            {tab.label}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
              <div className="component__tabs--body-mobile">
                {tabs.map((tab, index) => {
                  return (
                    <div
                      key={index}
                      className="component__tabs-bd-item macy-container-ready"
                      id={tab.id}
                      style={{
                        display: tab.id === activeTab ? "block" : "none",
                      }}
                    >
                      {tab.content}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default RecommendedTabs;
