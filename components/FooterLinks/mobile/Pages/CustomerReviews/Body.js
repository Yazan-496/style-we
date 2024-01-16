import React from "react";

const Body = ({ openModal, onOpen }) => {
  return (
    <>
      <div className="reviews-wrapper">
        <ul className style={{ position: "relative", height: 500 }}>
          <li
            className="reviews-item"
            style={{ position: "absolute", left: 0, top: 0 }}>
            <a href="/products/long-sleeve-work-shift-top">
              <img
                alt=""
                className="image"
                src="/image/catalog/activity/I8Khu3wAluGx3q537n3b6fqUs7At6swlpPhnPXNk.jpg"
              />
              <h2>Amazing shirt</h2>
              <p className="review">
                The shirt is honestly so fabulous, just like the picture.
              </p>
              <p className="email">j***2@gmail.com</p>
              <span className="indexstyle-jnmv24-0 jWNtM">
                <span style={{ display: "inline-block", direction: "ltr" }}>
                  <span
                    style={{
                      cursor: "inherit",
                      display: "inline-block",
                      position: "relative",
                    }}>
                    <span style={{ visibility: "hidden" }}>
                      <svg aria-hidden="true" className="icon">
                        <use xlinkHref="#star-empty" />
                      </svg>
                    </span>
                    <span
                      style={{
                        display: "inline-block",
                        position: "absolute",
                        overflow: "hidden",
                        top: 0,
                        left: 0,
                        width: "100%",
                      }}>
                      <svg aria-hidden="true" className="icon">
                        <use xlinkHref="#impulse-star-full" />
                      </svg>
                    </span>
                  </span>
                  <span
                    style={{
                      cursor: "inherit",
                      display: "inline-block",
                      position: "relative",
                    }}>
                    <span style={{ visibility: "hidden" }}>
                      <svg aria-hidden="true" className="icon">
                        <use xlinkHref="#star-empty" />
                      </svg>
                    </span>
                    <span
                      style={{
                        display: "inline-block",
                        position: "absolute",
                        overflow: "hidden",
                        top: 0,
                        left: 0,
                        width: "100%",
                      }}>
                      <svg aria-hidden="true" className="icon">
                        <use xlinkHref="#impulse-star-full" />
                      </svg>
                    </span>
                  </span>
                  <span
                    style={{
                      cursor: "inherit",
                      display: "inline-block",
                      position: "relative",
                    }}>
                    <span style={{ visibility: "hidden" }}>
                      <svg aria-hidden="true" className="icon">
                        <use xlinkHref="#star-empty" />
                      </svg>
                    </span>
                    <span
                      style={{
                        display: "inline-block",
                        position: "absolute",
                        overflow: "hidden",
                        top: 0,
                        left: 0,
                        width: "100%",
                      }}>
                      <svg aria-hidden="true" className="icon">
                        <use xlinkHref="#impulse-star-full" />
                      </svg>
                    </span>
                  </span>
                  <span
                    style={{
                      cursor: "inherit",
                      display: "inline-block",
                      position: "relative",
                    }}>
                    <span style={{ visibility: "hidden" }}>
                      <svg aria-hidden="true" className="icon">
                        <use xlinkHref="#star-empty" />
                      </svg>
                    </span>
                    <span
                      style={{
                        display: "inline-block",
                        position: "absolute",
                        overflow: "hidden",
                        top: 0,
                        left: 0,
                        width: "100%",
                      }}>
                      <svg aria-hidden="true" className="icon">
                        <use xlinkHref="#impulse-star-full" />
                      </svg>
                    </span>
                  </span>
                  <span
                    style={{
                      cursor: "inherit",
                      display: "inline-block",
                      position: "relative",
                    }}>
                    <span style={{ visibility: "hidden" }}>
                      <svg aria-hidden="true" className="icon">
                        <use xlinkHref="#star-empty" />
                      </svg>
                    </span>
                    <span
                      style={{
                        display: "inline-block",
                        position: "absolute",
                        overflow: "hidden",
                        top: 0,
                        left: 0,
                        width: "100%",
                      }}>
                      <svg aria-hidden="true" className="icon">
                        <use xlinkHref="#impulse-star-full" />
                      </svg>
                    </span>
                  </span>
                </span>
              </span>
            </a>
          </li>
        </ul>
      </div>
      <div
        className={`toggle-category ${openModal ? "open" : ""} `}
        onClick={() => onOpen(true)}>
        <p className="category-btn">Category</p>
      </div>
    </>
  );
};

export default Body;
