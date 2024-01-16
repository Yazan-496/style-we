import React, { useState } from "react";
import Body from "./Body";
import Layout from "../../Layout";
import ContactUsModal from "./ContactUsModal";
import Header from "components/Header/mobile";

const ContactUsBody = () => {
  const [openModal, setOpenModal] = useState(false);
  const onClose = () => {
    setOpenModal(false);
  };
  const onOpen = () => {
    setOpenModal(true);
  };
  return (
    <div className={`contactmodal-overlay ${openModal ? "open" : ""} `} id="">
      <Layout>
        <Header />
        <Body onOpen={() => onOpen(true)} />
        <ContactUsModal openModal={openModal} onClose={() => onClose(false)} />
      </Layout>
    </div>
  );
};
export default ContactUsBody;
