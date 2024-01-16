const shops = [
  {
    id: 1,
    image: "/image/catalog/activity/3rM9TITjNm1675412289.png",
    name: "Tops",
    href: "#",
  },
  {
    id: 2,
    image: "/image/catalog/activity/3rM9TITjNm1675412289.png",
    name: "Tops2",
    href: "#",
  },
  {
    id: 3,
    image: "/image/catalog/activity/3rM9TITjNm1675412289.png",
    name: "Tops3",
    href: "#",
  },
  {
    id: 4,
    image: "/image/catalog/activity/3rM9TITjNm1675412289.png",
    name: "Tops4",
    href: "#",
  },
  {
    id: 5,
    image: "/image/catalog/activity/3rM9TITjNm1675412289.png",
    name: "Tops5",
    href: "#",
  },
];
const Main = () => {
  return (
    <div className="main">
      <div className="nav-sec">
        <div className="nav-sec-hd">
          <span className="">Shop all</span>
          <a href="#">All &gt;</a>
        </div>
        <div className="nav-sec-bd">
          {shops.map((shop) => {
            return (
              <a className="nav-third" href={shop.href}>
                <div className="nav-third-img">
                  <picture className="indexstyle-sc-97p5a0-0 bSFdpY undefined image-lazy-finish-load">
                    <div>
                      <img
                        alt={shop.name}
                        className="lazyloaded"
                        src={shop.image}
                        title="Tops"
                      />
                    </div>
                  </picture>
                </div>
                <div className="nav-third-name hot">{shop.name}</div>
              </a>
            );
          })}
        </div>
      </div>
    </div>
  );
};
export default Main;
