import { useState } from "react";
import { useRouter } from "next/navigation";

const Layout = ({ children }) => {
  return (
    <div>
      <main>{children}</main>
    </div>
  );
};
export default Layout;
