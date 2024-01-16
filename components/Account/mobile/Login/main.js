import React from "react";
import SignupTab from "./SignupTab";
import LoginTab from "./LoginTab.js";
const LoginMain = ({ translations }) => {
  return (
  
 
      <div className="layout-container">
        <div className="indexstyle-sc-1uk1vtd-0 gRmITN">
          <div className="indexstyle-sc-1kn6zs5-0 dOzMdU">
            <p className="nav-tabs">
              <span className="nav-item  active">Login</span>
              <span className="nav-item">Register</span>
            </p>
            <ul className="login-register only-pc-show">
              <LoginTab translations={translations} />
              <SignupTab translations={translations} />
            </ul>
          </div>
        </div>
      </div>
  
  );
};
export default LoginMain;
