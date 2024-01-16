import React from "react";
import Link from "helpers/Link";
import { useTranslation } from "react-i18next";
const CHeader = ({ name }) => {
  const { t, i18n } = useTranslation("translation");

  return (
    <div className="flex justify-start items-center flex-grow-0 flex-shrink-0 text-base font-normal leading-5 text-[#000]">
      <span className="flex items-center last:font-bold last:text-[#000] group">
        <Link className="hover:underline" href="/">
          {t("main.home")}
        </Link>
        <span className="mx-[2px] group-last:hidden">
          <svg
            stroke="#31353C"
            viewBox="0 0 32 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            width={16}
            height={16}
            style={{ transform: "rotate(180deg)" }}
          >
            <path d="m20 8-8 8 8 8" strokeWidth={2} />
          </svg>
        </span>
      </span>
      <span className="flex items-center last:font-bold last:text-[#000] group">
        <span
          style={{
            textTransform: "uppercase",
          }}
        >
          {name}
        </span>
        <span className="mx-[2px] group-last:hidden">
          <svg
            stroke="#31353C"
            viewBox="0 0 32 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            width={16}
            height={16}
            style={{ transform: "rotate(180deg)" }}
          >
            <path d="m20 8-8 8 8 8" strokeWidth={2} />
          </svg>
        </span>
      </span>
    </div>
  );
};
export default CHeader;
