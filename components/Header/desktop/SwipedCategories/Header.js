import LogoBox from "../HeaderWithoutSearch/LogoBox";
import { CloseIconSvg, SvgArrowLeft } from "components/svgs";

const Header = ({ close }) => {
  return (
    <>
      <div
        id="headerMainComp"
        className={
          "sticky-header-noshadow header __header top-[-1px] transition-all duration-500 z-[4]"
        }
      >
        <div id="header-wrapper" className={"sticky-header-noshadow"}>
          <div id="header_container"></div>
        </div>
        <div className="m-header w-[100vw]">
          <div className="indexstyle-igpf96-0 padding-8 ktwJDv m-header-content">
            <div className="header flex">
              <div className=" cursor-pointer " onClick={() => close()}>
                <SvgArrowLeft />
              </div>
              <LogoBox />
              <div>
                <CloseIconSvg fill="white" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Header;
