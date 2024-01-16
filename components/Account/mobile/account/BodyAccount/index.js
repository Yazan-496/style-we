import React from "react";
import MyOrders from "./MyOrders";
import MoreServices from "./MoreServices";
import AdsAccount from "./AdsAccount";
import Recommend from "./Recommend";
const BodyAccount = ({ onOpen, guest, token, userData }) => {
  return (
    <div>
      <MyOrders
        onOpen={() => onOpen(true)}
        guest={guest}
        token={token}
        userData={userData}
      />
      <MoreServices
        onOpen={() => onOpen(true)}
        guest={guest}
        token={token}
        userData={userData}
      />
      {/*<AdsAccount*/}
      {/*  onOpen={() => onOpen(true)}*/}
      {/*  guest={guest}*/}
      {/*  token={token}*/}
      {/*  userData={userData}*/}
      {/*/>*/}
      {/*<Recommend*/}
      {/*  onOpen={() => onOpen(true)}*/}
      {/*  guest={guest}*/}
      {/*  token={token}*/}
      {/*  userData={userData}*/}
      {/*/>*/}
    </div>
  );
};

export default BodyAccount;
