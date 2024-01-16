import Link from "helpers/Link";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const data = [
  { id: 1, name: "About Us", selected: 0, href: "/information/about-us/" },
  {
    id: 4,
    name: "Affiliate Program",
    selected: 0,
    href: "/information/affiliate-program/",
  },
  {
    id: 6,
    name: " Payment Methods",
    selected: 0,
    href: "/information/payment-methods/",
  },
  {
    id: 7,
    name: "Shipping & Delivery",
    selected: 0,
    href: "/information/shipping-delivery/",
  },
  {
    id: 8,
    name: "Return Policy",
    selected: 0,
    href: "/information/return-policy/",
  },
  {
    id: 9,
    name: "Pre Order Guidance",
    selected: 0,
    href: "/information/pre-order-guidance/",
  },
  {
    id: 10,
    name: "Privacy Policy",
    selected: 0,
    href: "/information/privacy-policy/",
  },
  { id: 11, name: "terms", selected: 0, href: "/information/terms/" },
  {
    id: 12,
    name: "How To Track My Order",
    selected: 0,
    href: "/information/how-to-track-my-order/",
  },
  {
    id: 13,
    name: "How to Choose Your Size",
    selected: 0,
    href: "/information/how-to-choose-your-size/",
  },
  {
    id: 14,
    name: "Influencer Program",
    selected: 0,
    href: "/information/influencer-program/",
  },
  { id: 15, name: "SMS Terms ", selected: 0, href: "/information/sms-terms/" },
  { id: 16, name: "FAQs ", selected: 0, href: "/information/faqs/" },
  {
    id: 17,
    name: " About Wallet ",
    selected: 0,
    href: "/information/about-credit-wallet/",
  },
];
const Sidebar = () => {
  const [selectedLink, setSelectedLink] = useState(null);
  const router = useRouter();

  const handleLinkClick = (e, path) => {
    setSelectedLink(path);
  };
  return (
    <div
      className="flex flex-col justify-start items-start flex-grow-0 flex-shrink-0 w-[312px] gap-4 px-4 pt-4 pb-6 rounded bg-white sticky"
      style={{ top: 156, transition: "all 0.3s ease 0s" }}
    >
      <div className="flex flex-col justify-start items-start self-stretch flex-grow-0 flex-shrink-0 relative gap-2">
        <p className="flex-grow-0 flex-shrink-0 text-base text-left text-[#31353c]">
          Information
        </p>
        <div className="flex flex-col justify-end items-center self-stretch flex-grow-0 flex-shrink-0 h-px relative">
          <div className="self-stretch flex-grow-0 flex-shrink-0 h-px bg-[#e0e1e3]" />
        </div>
      </div>
      <div className="flex flex-col justify-start items-start self-stretch flex-grow-0 flex-shrink-0 gap-2">
        {data.map((item, index) => {
          return (
            <a
              onClick={(e) => handleLinkClick(e, item.href)}
              key={index}
              style={{ cursor: "pointer" }}
              className={` ${
                router.asPath === item.href ? "bg-[#d2d1d1]" : ""
              } flex justify-start items-center self-stretch flex-grow-0 flex-shrink-0 relative gap-2.5 px-4 py-[6.5px] rounded text-[#31353c]
              `}
            >
              <Link href={item.href}>
                <p
                  className={` ${
                    router.asPath === item.href || selectedLink === item.href
                      ? "font-[700]"
                      : ""
                  } w-full text-[16px] leading-[20px] text-left truncate`}
                >
                  {item.name}
                </p>
              </Link>
            </a>
          );
        })}
      </div>
    </div>
  );
};
export default Sidebar;
