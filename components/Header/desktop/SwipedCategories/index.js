import Header from "./Header";
import Auth from "./Auth";
import SideBar from "./SideBar";
import Main from "./Main";
export default function SwipedCategories({ open, close }) {
  const handleClickOutsideBox = (event) => {
    // 👇️ the element the user clicked
    const box = document?.getElementById("categories-side-bar");
    if (!box?.contains(event.target)) {
      document?.removeEventListener("click", handleClickOutsideBox);
      close();
    }
  };
  if (open) {
    return (
      <div
        id="categories-side-bar"
        onMouseLeave={() => {
          document?.addEventListener("click", handleClickOutsideBox);
        }}
        className="w-[100%] h-full fixed top-0 z-[50] flex flex-col bg-[#f2f2f3] swiper-category-animate"
      >
        <div>
          <div className="h-[100vh] flex justify-center swiper-cart-height bg-[white]">
            <Header close={() => close(false)} />
          </div>
          <div className="indexstyle-e7rlid-0 bZVbIy">
            <Auth />
            <SideBar />
            <Main />
          </div>
        </div>
      </div>
    );
  } else {
    return <></>;
  }
}
