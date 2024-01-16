import Sidebar from "../Sidebar";
import { useState } from "react";
import { useRouter } from "next/navigation";

const Layout = ({ children }) => {
  return (
    <div className="pb-[24px] bg-[#f8f9f9] Information_information__GCoJY">
      <div className="max-w-[1080px] 2xl:max-w-[1320px] mx-auto pt-[24px]">
        <div className="flex justify-start items-start flex-grow-0 flex-shrink-0 gap-6">
          <Sidebar />
          <main>{children}</main>
        </div>
      </div>
    </div>
  );
};
export default Layout;
