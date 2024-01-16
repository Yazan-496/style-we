import React from "react";

const CollectionDescription = () => {
  return (
    <div className="collection-description">
      <div className="collection-description__inner">
        <div className="collection-description__content line-camp-4">
          StyleWe's Clothing Edit include the most popular items for work and
          play also dating. Find a selection of the best clothes for women,
          including the best pants for women and the best blouses for women so
          you can build the perfect wardrobe. Also we have fashion dresses for
          any occassion you need.
        </div>
        <div className="collection-description__shadow">
          StyleWe's Clothing Edit include the most popular items for work and
          play also dating. Find a selection of the best clothes for women,
          including the best pants for women and the best blouses for women so
          you can build the perfect wardrobe. Also we have fashion dresses for
          any occassion you need.
        </div>
        <div className="collection-description__bt" style={{ display: "none" }}>
          <div className="collection-description__bt-bg" />
          <div className="collection-description__more-btn btn_more">
            <span>VIEW MORE</span>
            <i className="iconfont icon-c_icon_left" />
          </div>
          <div
            className="collection-description__more-btn btn_less"
            style={{ display: "none" }}>
            <span>VIEW LESS</span>
            <i
              className="iconfont icon-c_icon_left"
              style={{ transform: "rotate(90deg)" }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CollectionDescription;
