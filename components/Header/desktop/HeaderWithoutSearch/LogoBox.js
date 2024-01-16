import { useEffect, useState } from "react";
import Link from "../../../../helpers/Link";

const LogoBox = () => {
  const [icon, setIcon] = useState(
    "https://backend-live.clearance.ae/storage/company/2023-02-06-63e08deba2852.png"
  );
  return (
    <Link href="/">
      <img
        alt=""
        style={{
          height: "25px",
        }}
        className="logo"
        src={icon}
      />
    </Link>
  );
};
export default LogoBox;
