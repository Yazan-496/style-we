import React, { useEffect, useState } from "react";

const presale = [
  { id: 1, name: "Shipping Inquiry", selected: 0, href: "" },
  { id: 2, name: "Payment Inquiry", selected: 0, href: "" },
  { id: 3, name: "product Inquiry", selected: 0, href: "" },
];
const Account = [
  {
    id: 1,
    name: "Password Reset Request",
    selected: 0,
    href: "",
  },
  {
    id: 2,
    name: "Can’t Log in",
    selected: 0,
    href: "",
  },
  {
    id: 3,
    name: "Delete Account",
    selected: 0,
    href: "",
  },
];

const discount = [
  {
    id: 2,
    name: "How to Apply Coupon/Code",
    selected: 0,
    href: "",
  },
  {
    id: 3,
    name: "Coupon/Code Not Applied",
    selected: 0,
    href: "",
  },
];
const orders = [
  { id: 1, name: "Order Status", selected: 0, href: "" },
  { id: 2, name: "Cancel An Order", selected: 0, href: "" },
  { id: 3, name: "Edit An Order", selected: 0, href: "" },
];

const returns = [
  { id: 1, name: "More information about Return ", selected: 0, href: "" },
  { id: 2, name: "Submit Return Request ", selected: 0, href: "" },
];
const Others = [
  {
    id: 1,
    name: "Cooperation/Suggestion",
    selected: 0,
    href: "",
  },
  {
    id: 1,
    name: "Wholesale Inquiry",
    selected: 0,
    href: "",
  },
  {
    id: 1,
    name: "Tax Inquiry",
    selected: 0,
    href: "",
  },
  {
    id: 1,
    name: "More Information about the Website",
    selected: 0,
    href: "",
  },
  {
    id: 1,
    name: "Others",
    selected: 0,
    href: "",
  },
];

const ContactUsModal = ({ onClose, openModal }) => {
  const [isOpen, setIsOpen] = useState({});

  const toggleDropdown = (dropdownName) => {
    setIsOpen((prevState) => ({
      [dropdownName]: !prevState[dropdownName],
    }));
  };
  return (
    <>
      <div className={`contactmodal-content ${openModal ? "open" : ""} `}>
        <div
          className="pure-modal 0.4920546001953141"
          style={{
            transform: "translate(0px, 0px)",
            transition: "none 0s ease 0s",
          }}
        >
          <div
            onClick={() => onClose(false)}
            className="close-icon"
            data-statis-click='{"ec":"login_cancel"}'
            data-collect-click='{"event_id":"login_cancel"}'
          >
            <img
              src="data:image/svg+xml,%3csvg t='1629449815102' class='icon' viewBox='0 0 1024 1024' version='1.1' xmlns='http://www.w3.org/2000/svg' p-id='4161' width='200' height='200'%3e%3cpath d='M857.941333 94.833778l71.224889 71.224889L583.111111 512l345.998222 345.941333-71.224889 71.224889L512 583.111111l-345.941333 345.998222-71.224889-71.224889L440.888889 512 94.833778 166.058667 166.115556 94.833778 512 440.888889z' fill='%23141414' p-id='4162'%3e%3c/path%3e%3c/svg%3e"
              alt="close"
              className="type-modal-close"
              aria-hidden="true"
            />{" "}
          </div>

          <p className="type-modal-title">Please select question type</p>
          <div className="type-modal-content">
            <div className="type-modal-item">
              <button
                onClick={() => toggleDropdown(0)}
                className="modalbuttondropdown"
              >
                <p className="item-name" aria-hidden="true">
                  Presale
                  <img
                    src="data:image/svg+xml,%3c%3fxml version='1.0' encoding='UTF-8'%3f%3e %3csvg width='12px' height='12px' viewBox='0 0 12 12' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3e %3ctitle%3ehome_icon_right%3c/title%3e %3cg id='%e6%9c%8d%e5%8a%a1%e6%9d%a1%e6%ac%be%e9%9b%86%e5%90%88%e9%a1%b5' stroke='none' stroke-width='1' fill='none' fill-rule='evenodd'%3e %3cg transform='translate(-353.000000%2c -214.000000)' id='%e5%95%86%e5%93%81%e4%bf%a1%e6%81%af%e5%a4%87%e4%bb%bd-9'%3e %3cg transform='translate(0.000000%2c 98.000000)'%3e %3cg id='home_icon_right' transform='translate(353.000000%2c 116.000000)'%3e %3crect id='%e7%9f%a9%e5%bd%a2' fill='%23D8D8D8' opacity='0' x='0' y='0' width='12' height='12'%3e%3c/rect%3e %3cg id='%e8%bf%94%e5%9b%9e' transform='translate(6.327737%2c 6.000644) rotate(-180.000000) translate(-6.327737%2c -6.000644) translate(3.334728%2c 0.668029)' fill='%23999999' fill-rule='nonzero'%3e %3cpath d='M5.81452133%2c0.168814822 C5.70512958%2c0.0607879576 5.55604348%2c-1.89478063e-14 5.4004929%2c-1.89478063e-14 C5.24494232%2c-1.89478063e-14 5.09585622%2c0.0607879576 4.98646446%2c0.168814822 L0.172815173%2c4.93325927 C0.0622284306%2c5.04011881 0%2c5.18575384 0%2c5.33770371 C0%2c5.48965359 0.0622284306%2c5.63528862 0.172815173%2c5.74214816 L4.98646446%2c10.4977037 C5.21512605%2c10.7210722 5.58585974%2c10.7210722 5.81452133%2c10.4977037 C6.04318293%2c10.2743352 6.04318293%2c9.91218332 5.81452133%2c9.68881482 L1.4376493%2c5.33325927 L5.81452133%2c0.968814822 C6.03887632%2c0.747177969 6.03887632%2c0.390451674 5.81452133%2c0.168814822 L5.81452133%2c0.168814822 Z' id='Shape'%3e%3c/path%3e %3c/g%3e %3c/g%3e %3c/g%3e %3c/g%3e %3c/g%3e %3c/svg%3e"
                    alt="right_icon"
                    className="fold-icon icon "
                    style={{}}
                  />
                </p>
              </button>

              {isOpen[0] && (
                <ul>
                  {presale.map((item, i) => {
                    return (
                      <div key={i} className=" ">
                        <li
                          className=" second-item third-name "
                          aria-hidden="true"
                        >
                          {item.name}
                        </li>
                      </div>
                    );
                  })}
                </ul>
              )}
            </div>
            <div className="type-modal-item">
              <button
                onClick={() => toggleDropdown(1)}
                className="modalbuttondropdown"
              >
                <p className="item-name" aria-hidden="true">
                  Account
                  <img
                    src="data:image/svg+xml,%3c%3fxml version='1.0' encoding='UTF-8'%3f%3e %3csvg width='12px' height='12px' viewBox='0 0 12 12' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3e %3ctitle%3ehome_icon_right%3c/title%3e %3cg id='%e6%9c%8d%e5%8a%a1%e6%9d%a1%e6%ac%be%e9%9b%86%e5%90%88%e9%a1%b5' stroke='none' stroke-width='1' fill='none' fill-rule='evenodd'%3e %3cg transform='translate(-353.000000%2c -214.000000)' id='%e5%95%86%e5%93%81%e4%bf%a1%e6%81%af%e5%a4%87%e4%bb%bd-9'%3e %3cg transform='translate(0.000000%2c 98.000000)'%3e %3cg id='home_icon_right' transform='translate(353.000000%2c 116.000000)'%3e %3crect id='%e7%9f%a9%e5%bd%a2' fill='%23D8D8D8' opacity='0' x='0' y='0' width='12' height='12'%3e%3c/rect%3e %3cg id='%e8%bf%94%e5%9b%9e' transform='translate(6.327737%2c 6.000644) rotate(-180.000000) translate(-6.327737%2c -6.000644) translate(3.334728%2c 0.668029)' fill='%23999999' fill-rule='nonzero'%3e %3cpath d='M5.81452133%2c0.168814822 C5.70512958%2c0.0607879576 5.55604348%2c-1.89478063e-14 5.4004929%2c-1.89478063e-14 C5.24494232%2c-1.89478063e-14 5.09585622%2c0.0607879576 4.98646446%2c0.168814822 L0.172815173%2c4.93325927 C0.0622284306%2c5.04011881 0%2c5.18575384 0%2c5.33770371 C0%2c5.48965359 0.0622284306%2c5.63528862 0.172815173%2c5.74214816 L4.98646446%2c10.4977037 C5.21512605%2c10.7210722 5.58585974%2c10.7210722 5.81452133%2c10.4977037 C6.04318293%2c10.2743352 6.04318293%2c9.91218332 5.81452133%2c9.68881482 L1.4376493%2c5.33325927 L5.81452133%2c0.968814822 C6.03887632%2c0.747177969 6.03887632%2c0.390451674 5.81452133%2c0.168814822 L5.81452133%2c0.168814822 Z' id='Shape'%3e%3c/path%3e %3c/g%3e %3c/g%3e %3c/g%3e %3c/g%3e %3c/g%3e %3c/svg%3e"
                    alt="right_icon"
                    className="fold-icon icon "
                    style={{}}
                  />
                </p>
              </button>

              {isOpen[1] && (
                <ul>
                  {Account.map((item, i) => {
                    return (
                      <div key={i} className=" ">
                        <li
                          className=" second-item third-name "
                          aria-hidden="true"
                        >
                          {item.name}
                        </li>
                      </div>
                    );
                  })}
                </ul>
              )}
            </div>
            <div className="type-modal-item">
              <button
                onClick={() => toggleDropdown(3)}
                className="modalbuttondropdown"
              >
                <p className="item-name" aria-hidden="true">
                  Discount/Promotions
                  <img
                    src="data:image/svg+xml,%3c%3fxml version='1.0' encoding='UTF-8'%3f%3e %3csvg width='12px' height='12px' viewBox='0 0 12 12' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3e %3ctitle%3ehome_icon_right%3c/title%3e %3cg id='%e6%9c%8d%e5%8a%a1%e6%9d%a1%e6%ac%be%e9%9b%86%e5%90%88%e9%a1%b5' stroke='none' stroke-width='1' fill='none' fill-rule='evenodd'%3e %3cg transform='translate(-353.000000%2c -214.000000)' id='%e5%95%86%e5%93%81%e4%bf%a1%e6%81%af%e5%a4%87%e4%bb%bd-9'%3e %3cg transform='translate(0.000000%2c 98.000000)'%3e %3cg id='home_icon_right' transform='translate(353.000000%2c 116.000000)'%3e %3crect id='%e7%9f%a9%e5%bd%a2' fill='%23D8D8D8' opacity='0' x='0' y='0' width='12' height='12'%3e%3c/rect%3e %3cg id='%e8%bf%94%e5%9b%9e' transform='translate(6.327737%2c 6.000644) rotate(-180.000000) translate(-6.327737%2c -6.000644) translate(3.334728%2c 0.668029)' fill='%23999999' fill-rule='nonzero'%3e %3cpath d='M5.81452133%2c0.168814822 C5.70512958%2c0.0607879576 5.55604348%2c-1.89478063e-14 5.4004929%2c-1.89478063e-14 C5.24494232%2c-1.89478063e-14 5.09585622%2c0.0607879576 4.98646446%2c0.168814822 L0.172815173%2c4.93325927 C0.0622284306%2c5.04011881 0%2c5.18575384 0%2c5.33770371 C0%2c5.48965359 0.0622284306%2c5.63528862 0.172815173%2c5.74214816 L4.98646446%2c10.4977037 C5.21512605%2c10.7210722 5.58585974%2c10.7210722 5.81452133%2c10.4977037 C6.04318293%2c10.2743352 6.04318293%2c9.91218332 5.81452133%2c9.68881482 L1.4376493%2c5.33325927 L5.81452133%2c0.968814822 C6.03887632%2c0.747177969 6.03887632%2c0.390451674 5.81452133%2c0.168814822 L5.81452133%2c0.168814822 Z' id='Shape'%3e%3c/path%3e %3c/g%3e %3c/g%3e %3c/g%3e %3c/g%3e %3c/g%3e %3c/svg%3e"
                    alt="right_icon"
                    className="fold-icon icon "
                    style={{}}
                  />
                </p>
              </button>

              {isOpen[3] && (
                <ul>
                  {discount.map((item, i) => {
                    return (
                      <div key={i} className=" ">
                        <li
                          className=" second-item third-name "
                          aria-hidden="true"
                        >
                          {item.name}
                        </li>
                      </div>
                    );
                  })}
                </ul>
              )}
            </div>
            <div className="type-modal-item">
              <button
                onClick={() => toggleDropdown(4)}
                className="modalbuttondropdown"
              >
                <p className="item-name" aria-hidden="true">
                  Orders
                  <img
                    src="data:image/svg+xml,%3c%3fxml version='1.0' encoding='UTF-8'%3f%3e %3csvg width='12px' height='12px' viewBox='0 0 12 12' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3e %3ctitle%3ehome_icon_right%3c/title%3e %3cg id='%e6%9c%8d%e5%8a%a1%e6%9d%a1%e6%ac%be%e9%9b%86%e5%90%88%e9%a1%b5' stroke='none' stroke-width='1' fill='none' fill-rule='evenodd'%3e %3cg transform='translate(-353.000000%2c -214.000000)' id='%e5%95%86%e5%93%81%e4%bf%a1%e6%81%af%e5%a4%87%e4%bb%bd-9'%3e %3cg transform='translate(0.000000%2c 98.000000)'%3e %3cg id='home_icon_right' transform='translate(353.000000%2c 116.000000)'%3e %3crect id='%e7%9f%a9%e5%bd%a2' fill='%23D8D8D8' opacity='0' x='0' y='0' width='12' height='12'%3e%3c/rect%3e %3cg id='%e8%bf%94%e5%9b%9e' transform='translate(6.327737%2c 6.000644) rotate(-180.000000) translate(-6.327737%2c -6.000644) translate(3.334728%2c 0.668029)' fill='%23999999' fill-rule='nonzero'%3e %3cpath d='M5.81452133%2c0.168814822 C5.70512958%2c0.0607879576 5.55604348%2c-1.89478063e-14 5.4004929%2c-1.89478063e-14 C5.24494232%2c-1.89478063e-14 5.09585622%2c0.0607879576 4.98646446%2c0.168814822 L0.172815173%2c4.93325927 C0.0622284306%2c5.04011881 0%2c5.18575384 0%2c5.33770371 C0%2c5.48965359 0.0622284306%2c5.63528862 0.172815173%2c5.74214816 L4.98646446%2c10.4977037 C5.21512605%2c10.7210722 5.58585974%2c10.7210722 5.81452133%2c10.4977037 C6.04318293%2c10.2743352 6.04318293%2c9.91218332 5.81452133%2c9.68881482 L1.4376493%2c5.33325927 L5.81452133%2c0.968814822 C6.03887632%2c0.747177969 6.03887632%2c0.390451674 5.81452133%2c0.168814822 L5.81452133%2c0.168814822 Z' id='Shape'%3e%3c/path%3e %3c/g%3e %3c/g%3e %3c/g%3e %3c/g%3e %3c/g%3e %3c/svg%3e"
                    alt="right_icon"
                    className="fold-icon icon "
                    style={{}}
                  />
                </p>
              </button>

              {isOpen[4] && (
                <ul>
                  {discount.map((item, i) => {
                    return (
                      <div key={i} className=" ">
                        <li
                          className=" second-item third-name "
                          aria-hidden="true"
                        >
                          {item.name}
                        </li>
                      </div>
                    );
                  })}
                </ul>
              )}
            </div>
            <div className="type-modal-item">
              <button
                onClick={() => toggleDropdown(5)}
                className="modalbuttondropdown"
              >
                <p className="item-name" aria-hidden="true">
                  Returns
                  <img
                    src="data:image/svg+xml,%3c%3fxml version='1.0' encoding='UTF-8'%3f%3e %3csvg width='12px' height='12px' viewBox='0 0 12 12' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3e %3ctitle%3ehome_icon_right%3c/title%3e %3cg id='%e6%9c%8d%e5%8a%a1%e6%9d%a1%e6%ac%be%e9%9b%86%e5%90%88%e9%a1%b5' stroke='none' stroke-width='1' fill='none' fill-rule='evenodd'%3e %3cg transform='translate(-353.000000%2c -214.000000)' id='%e5%95%86%e5%93%81%e4%bf%a1%e6%81%af%e5%a4%87%e4%bb%bd-9'%3e %3cg transform='translate(0.000000%2c 98.000000)'%3e %3cg id='home_icon_right' transform='translate(353.000000%2c 116.000000)'%3e %3crect id='%e7%9f%a9%e5%bd%a2' fill='%23D8D8D8' opacity='0' x='0' y='0' width='12' height='12'%3e%3c/rect%3e %3cg id='%e8%bf%94%e5%9b%9e' transform='translate(6.327737%2c 6.000644) rotate(-180.000000) translate(-6.327737%2c -6.000644) translate(3.334728%2c 0.668029)' fill='%23999999' fill-rule='nonzero'%3e %3cpath d='M5.81452133%2c0.168814822 C5.70512958%2c0.0607879576 5.55604348%2c-1.89478063e-14 5.4004929%2c-1.89478063e-14 C5.24494232%2c-1.89478063e-14 5.09585622%2c0.0607879576 4.98646446%2c0.168814822 L0.172815173%2c4.93325927 C0.0622284306%2c5.04011881 0%2c5.18575384 0%2c5.33770371 C0%2c5.48965359 0.0622284306%2c5.63528862 0.172815173%2c5.74214816 L4.98646446%2c10.4977037 C5.21512605%2c10.7210722 5.58585974%2c10.7210722 5.81452133%2c10.4977037 C6.04318293%2c10.2743352 6.04318293%2c9.91218332 5.81452133%2c9.68881482 L1.4376493%2c5.33325927 L5.81452133%2c0.968814822 C6.03887632%2c0.747177969 6.03887632%2c0.390451674 5.81452133%2c0.168814822 L5.81452133%2c0.168814822 Z' id='Shape'%3e%3c/path%3e %3c/g%3e %3c/g%3e %3c/g%3e %3c/g%3e %3c/g%3e %3c/svg%3e"
                    alt="right_icon"
                    className="fold-icon icon "
                    style={{}}
                  />
                </p>
              </button>

              {isOpen[5] && (
                <ul>
                  {discount.map((item, i) => {
                    return (
                      <div key={i} className=" ">
                        <li
                          className=" second-item third-name "
                          aria-hidden="true"
                        >
                          {item.name}
                        </li>
                      </div>
                    );
                  })}
                </ul>
              )}
            </div>
            <div className="type-modal-item">
              <button
                onClick={() => toggleDropdown(6)}
                className="modalbuttondropdown"
              >
                <p className="item-name" aria-hidden="true">
                  Others
                  <img
                    src="data:image/svg+xml,%3c%3fxml version='1.0' encoding='UTF-8'%3f%3e %3csvg width='12px' height='12px' viewBox='0 0 12 12' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3e %3ctitle%3ehome_icon_right%3c/title%3e %3cg id='%e6%9c%8d%e5%8a%a1%e6%9d%a1%e6%ac%be%e9%9b%86%e5%90%88%e9%a1%b5' stroke='none' stroke-width='1' fill='none' fill-rule='evenodd'%3e %3cg transform='translate(-353.000000%2c -214.000000)' id='%e5%95%86%e5%93%81%e4%bf%a1%e6%81%af%e5%a4%87%e4%bb%bd-9'%3e %3cg transform='translate(0.000000%2c 98.000000)'%3e %3cg id='home_icon_right' transform='translate(353.000000%2c 116.000000)'%3e %3crect id='%e7%9f%a9%e5%bd%a2' fill='%23D8D8D8' opacity='0' x='0' y='0' width='12' height='12'%3e%3c/rect%3e %3cg id='%e8%bf%94%e5%9b%9e' transform='translate(6.327737%2c 6.000644) rotate(-180.000000) translate(-6.327737%2c -6.000644) translate(3.334728%2c 0.668029)' fill='%23999999' fill-rule='nonzero'%3e %3cpath d='M5.81452133%2c0.168814822 C5.70512958%2c0.0607879576 5.55604348%2c-1.89478063e-14 5.4004929%2c-1.89478063e-14 C5.24494232%2c-1.89478063e-14 5.09585622%2c0.0607879576 4.98646446%2c0.168814822 L0.172815173%2c4.93325927 C0.0622284306%2c5.04011881 0%2c5.18575384 0%2c5.33770371 C0%2c5.48965359 0.0622284306%2c5.63528862 0.172815173%2c5.74214816 L4.98646446%2c10.4977037 C5.21512605%2c10.7210722 5.58585974%2c10.7210722 5.81452133%2c10.4977037 C6.04318293%2c10.2743352 6.04318293%2c9.91218332 5.81452133%2c9.68881482 L1.4376493%2c5.33325927 L5.81452133%2c0.968814822 C6.03887632%2c0.747177969 6.03887632%2c0.390451674 5.81452133%2c0.168814822 L5.81452133%2c0.168814822 Z' id='Shape'%3e%3c/path%3e %3c/g%3e %3c/g%3e %3c/g%3e %3c/g%3e %3c/g%3e %3c/svg%3e"
                    alt="right_icon"
                    className="fold-icon icon "
                    style={{}}
                  />
                </p>
              </button>

              {isOpen[6] && (
                <ul>
                  {discount.map((item, i) => {
                    return (
                      <div key={i} className=" ">
                        <li
                          className=" second-item third-name "
                          aria-hidden="true"
                        >
                          {item.name}
                        </li>
                      </div>
                    );
                  })}
                </ul>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ContactUsModal;
