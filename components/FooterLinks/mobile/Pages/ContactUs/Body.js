import React from "react";

const Body = ({ onOpen }) => {
  return (
    <>
      <div className="contactUs" aria-hidden="true">
        <div className="contactUs-wrapper">
          <div className="type-wrapper">
            <div className="type-title" style={{ marginTop: 30 }}>
              Question Type
            </div>
            <div
              className="type-content"
              aria-hidden="true"
              onClick={() => onOpen(true)}>
              <div className="content-left">
                <div className="type-item type-item-placeholder">
                  Find the most useful answers here
                </div>
              </div>

              <img
                src="data:image/svg+xml,%3c%3fxml version='1.0' encoding='UTF-8'%3f%3e %3csvg width='12px' height='12px' viewBox='0 0 12 12' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3e %3ctitle%3ehome_icon_right%3c/title%3e %3cg id='%e6%9c%8d%e5%8a%a1%e6%9d%a1%e6%ac%be%e9%9b%86%e5%90%88%e9%a1%b5' stroke='none' stroke-width='1' fill='none' fill-rule='evenodd'%3e %3cg transform='translate(-353.000000%2c -214.000000)' id='%e5%95%86%e5%93%81%e4%bf%a1%e6%81%af%e5%a4%87%e4%bb%bd-9'%3e %3cg transform='translate(0.000000%2c 98.000000)'%3e %3cg id='home_icon_right' transform='translate(353.000000%2c 116.000000)'%3e %3crect id='%e7%9f%a9%e5%bd%a2' fill='%23D8D8D8' opacity='0' x='0' y='0' width='12' height='12'%3e%3c/rect%3e %3cg id='%e8%bf%94%e5%9b%9e' transform='translate(6.327737%2c 6.000644) rotate(-180.000000) translate(-6.327737%2c -6.000644) translate(3.334728%2c 0.668029)' fill='%23999999' fill-rule='nonzero'%3e %3cpath d='M5.81452133%2c0.168814822 C5.70512958%2c0.0607879576 5.55604348%2c-1.89478063e-14 5.4004929%2c-1.89478063e-14 C5.24494232%2c-1.89478063e-14 5.09585622%2c0.0607879576 4.98646446%2c0.168814822 L0.172815173%2c4.93325927 C0.0622284306%2c5.04011881 0%2c5.18575384 0%2c5.33770371 C0%2c5.48965359 0.0622284306%2c5.63528862 0.172815173%2c5.74214816 L4.98646446%2c10.4977037 C5.21512605%2c10.7210722 5.58585974%2c10.7210722 5.81452133%2c10.4977037 C6.04318293%2c10.2743352 6.04318293%2c9.91218332 5.81452133%2c9.68881482 L1.4376493%2c5.33325927 L5.81452133%2c0.968814822 C6.03887632%2c0.747177969 6.03887632%2c0.390451674 5.81452133%2c0.168814822 L5.81452133%2c0.168814822 Z' id='Shape'%3e%3c/path%3e %3c/g%3e %3c/g%3e %3c/g%3e %3c/g%3e %3c/g%3e %3c/svg%3e"
                alt="right_icon"
              />
            </div>
            <p className="type-empty-tips">
              <span>*</span>Please select question type
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Body;
