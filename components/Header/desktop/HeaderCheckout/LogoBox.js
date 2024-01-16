import { useEffect, useState } from "react";
import Link from "../../../../helpers/Link";
import { useTranslation } from "react-i18next";

const LogoBox = () => {
  const [icon, setIcon] = useState(
    "https://backend-live.clearance.ae/storage/company/2023-02-06-63e08deba2852.png"
  );
  const { t, i18n } = useTranslation("translation");
  return (
    <div className="flex items-center justify-start pl-10 h-28">
      <Link className="h-28  flex items-center" href="/">
          <img
            alt=""
            style={{
              height: "45px",
            }}
            className="logo"
            src={icon}
          />
      </Link>
      <span
        style={{
          margin: "0 40px",
          width: 1,
          height: 40,
          background: "#757575",
        }}
      />
      <img
        alt="secure"
        src="https://image.chicv.com/image/catalog/thirdpart/2023-04-10/ab36496c42e66f455c9812fee9351c0c.png"
      />
      <p
        className="h-28 flex items-center"
        style={{ fontSize: 24, paddingLeft: 30 }}
      >
        {t("user.secure_checkout")}
      </p>
    </div>
  );
};
export default LogoBox;
