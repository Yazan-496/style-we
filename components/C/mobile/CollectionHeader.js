import React from "react";
const CollectionHeader = ({ name }) => {
  return (
    <>
      <div>
        <div className="title-number-wrapper ">
          <span className="title">CLOTHING</span>
          <span className="number">
            <span id="collection-product-total-number"> 3064 </span> Products
          </span>
        </div>
        <div id="collection-header" className="header-v-2" style={{ top: 44 }}>
          <div className="component__classify">
            <div
              className="swiper-container swiper-container-initialized swiper-container-horizontal swiper-container-free-mode"
              id="component-classify"
            >
              <span
                className="swiper-notification"
                aria-live="assertive"
                aria-atomic="true"
              />
            </div>
          </div>

          <div id="component-sorter" className="component__sorter ">
            <div className="component__sorter-inner">
              <div className="left-box">
                <button
                  className="component__sorter-btn"
                  data-sort-data='{"id":"new","text":"New","has_arrow":false,"sort_up":"","sort_down":"-released_at"}'
                >
                  <div className="component__sorter-btn-inner">New</div>
                </button>
                <button
                  className="component__sorter-btn"
                  data-sort-data='{"id":"bestSale","text":"Best Sale","has_arrow":false,"sort_up":"","sort_down":"-statistic.month_sold"}'
                >
                  <div className="component__sorter-btn-inner">Best Sale</div>
                </button>
                <button
                  className="component__sorter-btn has-arrow"
                  data-sort-data='{"id":"price","text":"Price-1","has_arrow":true,"sort_up":"+price","sort_down":"-price"}'
                >
                  <div className="component__sorter-btn-inner">Price</div>
                  <div className="component__sorter-btn-updown">
                    <i className="up iconfont icon-c_icon_up_nor" />
                    <i className="down iconfont icon-c_icon_up_nor" />
                  </div>
                </button>
              </div>
              <div className="hr" />
              <button
                className="component__filter-btn"
                data-statis-click='{"ec":"filter"}'
                data-collect-click='{"event_id":"btn_filter","third_category":5766}'
              >
                <div className="component__filter-btn-inner">Filter</div>
                <i className="iconfont icon-c_icon_filter_sel" />
                <span className="count notranslate" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default CollectionHeader;
