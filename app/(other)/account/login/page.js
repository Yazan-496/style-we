"use client";
import React, { useEffect, useState } from "react";
import Header from "components/Header/desktop";
import Footer from "components/Footer/desktop";
import IndexRegister from "components/Account/desktop/Login";


const Login = () => {
  return (
    <div>
      {/* <Header collection={false} /> */}
      <div className="flex items-start justify-center">
        <IndexRegister />
      </div>
      {/* <Footer /> */}
    </div>
  );
};

export default Login;
