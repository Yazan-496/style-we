import React from "react";
import Image from "helpers/image";

const Body = () => {
  return (
    <div
      className="w-full flex flex-col justify-start items-center relative gap-6 px-14 py-8 rounded bg-white"
      style={{ padding: 15 }}>
      <div className="information-detial braft-output-content">
        <h3 class="information-title">Information</h3>
        <h4 class="information-name">Intellectual Property Rights</h4>
        <p className="p">
          <span style={{ color: "#5c5c5c" }}>
            Stylewe&nbsp;respects the intellectual property rights and interests
            of third parties and will take measures and steps to protect such
            rights and interests.
          </span>
        </p>
        <p className="p" />
        <p className="MsoNormal">
          <span style={{ color: "#5c5c5c" }}>
            In the event of any concerns or complaints about violation of
            intellectual property rights, such as the unauthorized use of
            third-party trademarks or patents, or the selling of counterfeit
            goods, please{" "}
          </span>
          <span style={{ color: "#07a9fe" }}>
            <a href="/contact-us" target="_blank">
              Contact Us
            </a>
          </span>{" "}
          or{" "}
          <span style={{ color: "#07a9fe" }}>
            <a href="https://direct.lc.chat/12657117/7" target="_blank">
              chat with us online.
            </a>
          </span>
        </p>
        <p className="p" />
        <p>
          <span style={{ color: "#5c5c5c" }}>Information required:</span>
        </p>
        <p className="p">
          <span style={{ color: "#5c5c5c" }}>
            1.A description of the allegedly infringing works , behaviors or
            materials ;
          </span>
        </p>
        <p className="p">
          <span style={{ color: "#5c5c5c" }}>
            2.A description of the location where the allegedly infringing
            materials showed (product(s) URL);
          </span>
        </p>
        <p className="p">
          <span style={{ color: "#5c5c5c" }}>
            3.Information that permit us to contact you, such as your address,
            telephone number and e-mail address.
          </span>
        </p>
        <p className="MsoNormal">
          <span style={{ color: "#5c5c5c" }}>
            If you have any questions, please feel free&nbsp;to{" "}
          </span>
          <span style={{ color: "#07a9fe" }}>
            <a href="/contact-us" target="_blank">
              Contact Us
            </a>
            .
          </span>
        </p>
      </div>
    </div>
  );
};
export default Body;
