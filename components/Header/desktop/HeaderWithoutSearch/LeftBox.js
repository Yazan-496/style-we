import { AuthSVG, SvgMenu } from "components/svgs";
import { useState } from "react";

const LeftBox = ({ setCategoryOpened }) => {
  const [openCategoriesModal, setOpenCategoriesModal] = useState(false);
  return (
    <div className="left-box flex items-center justify-center">
      <div
        className="cursor-pointer"
        onClick={() => {
          setCategoryOpened(true);
        }}
        style={{ padding: "8px 8px 0 0" }}
      >
        <SvgMenu />
      </div>
      <div className="cursor-pointer">
        <AuthSVG />
      </div>
    </div>
  );
};
export default LeftBox;
