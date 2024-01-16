'use client'
import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import styled from "styled-components";
import Popup from "./Popup"

const ModalPopup = ({ show, onClose, close, product, children }) => {
  const [isBrowser, setIsBrowser] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setIsBrowser(true);
    show
      ? (document.body.style.overflow = "hidden")
      : (document.body.style.overflow = "unset");
  }, [show]);
  useEffect(() => {
    setTimeout(() => setLoading(false), 3000);
  }, [show]);

  const handleCloseClick = (e) => {
    e.preventDefault();
    onClose();
    setLoading(true);
  };

  useEffect(() => {
  }, [loading, close]);
  const modalContent = show ? (
    <StyledModalOverlay>
      <StyledModal>
        <StyledModalBody>
        <Popup onClose={onClose} />
        </StyledModalBody>
      </StyledModal>
    </StyledModalOverlay>
  ) : null;

  if (isBrowser) {
    return ReactDOM.createPortal(
      modalContent,
      document.getElementById("popup")
    );
  } else {
    return null;
  }
};

const StyledModalBody = styled.div`
  padding-top: 0;
`;
const StyledModal = styled.div`
  background: white;
  width: auto;
  height: auto;
  border-radius: 15px;
  padding: 0;
  z-index: 999;
  opacity: 999;
  overflow-y: hidden;
`;
const StyledModalOverlay = styled.div`
  position: fixed;
  display: flex;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 999;
  opacity: 999;
  overflow: auto;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.5);
`;

export default ModalPopup;
