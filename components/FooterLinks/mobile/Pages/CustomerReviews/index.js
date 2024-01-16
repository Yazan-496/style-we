import React, { useState } from "react";
import Body from "./Body";
import Layout from "../../Layout";
import CustomerModal from "./CustomerModal";
import Header from "components/Header/mobile";

const CustomerReviewsBody = () => {
  const [openModal, setOpenModal] = useState(false);
  const onClose = () => {
    setOpenModal(false);
  };
  const onOpen = () => {
    setOpenModal(true);
  };
  return (
    <div className={`customermodal-overlay ${openModal ? "open" : ""} `} id="">
      <Layout>
        <Body onOpen={() => onOpen(true)} openModal={openModal} />
        <CustomerModal openModal={openModal} onClose={() => onClose(false)} />
      </Layout>
    </div>
  );
};
export default CustomerReviewsBody;
