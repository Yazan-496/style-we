import React from "react";
import Image from "helpers/image";
import Link from "../../../../../helpers/Link";

const AdsAccount = ({ onOpen, guest, token, userData }) => {
  const handleAction = () => {
    if (token && !guest) {
    } else {
      onOpen(true);
    }
  };
  return (
    <div aria-hidden="true" className="account-ads">
      <Link href="/">
        <a>
          <Image
            className="hidden media-wrap image-wrap"
            src="/image/catalog/activity/08pugMdIc41684397666.jpg"
            alt="3"
            width="300"
            height="200"
          />
        </a>
      </Link>
    </div>
  );
};

export default AdsAccount;
