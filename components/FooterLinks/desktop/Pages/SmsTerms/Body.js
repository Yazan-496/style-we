import React from "react";
import Image from "helpers/image";

const Body = () => {
  return (
    <div className="w-full flex flex-col justify-start items-center relative gap-6 px-14 py-8 rounded bg-white">
      <h1 className="flex-grow-0 flex-shrink-0 text-2xl font-semibold text-left text-[#31353c]">
        SMS Terms
      </h1>
      <div className="information-detial braft-output-content">
        <p>SMS Terms</p>
        <p>
          On the premise that customers are willing to accept our SMS
          notification messages on the registration and checkout pages of our
          website, we will regularly send SMS messages about account changes,
          order notifications, waybill notifications, and product promotions to
          customers.
        </p>
        <p>
          Regarding product promotion text messages, if you feel disturbed, you
          can reply STOP or OPT to unsubscribe at any time. Once you
          unsubscribe, we will no longer send you any product marketing text
          messages. If you want to receive marketing text messages again, you
          can log in to your account and re-check it.
        </p>
        <p>
          We will strictly protect user privacy and will never actively disclose
          any personal information of users to third parties, such as name,
          gender, age, phone number, home address, etc. If you have any
          questions about your privacy disclosure, please feel free to contact
          us.
        </p>
      </div>
    </div>
  );
};
export default Body;
