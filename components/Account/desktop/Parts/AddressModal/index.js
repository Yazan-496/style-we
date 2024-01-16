import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import styled, { keyframes, css } from "styled-components";
import ModalAddressBody from "./ModalAddressBody";
import LoadingComponent from "../../../../LoadingComponent/desktop";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

const AddressModal = ({ show, onClose, close, address, isEdit, addressId }) => {
  const dispatch = useDispatch();
  const [isBrowser, setIsBrowser] = useState(false);
  const [loading, setLoading] = useState(true);
  const checkoutLoading = useSelector(
    (state) => state?.CheckoutReducer?.cartProduct
  );
  const addedAddress = useSelector(
    (state) => state?.CheckoutReducer?.addedAddress
  );
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

  const [showToast, setShowToast] = useState({});
  const _closeAfterSuccess = () => {
    if (addedAddress) {
      onClose();
      dispatch({
        type: "RESET_ADDED_ADDRESS",
      });
    }
  };

  useEffect(() => {
    if (addedAddress) {
      _closeAfterSuccess();
    }
  }, [addedAddress, checkoutLoading]);

  function handleClose() {
    dispatch({
      type: "REMOVE_PRODUCT_CART",
      payload: null,
    });
  }

  const { t, i18n } = useTranslation("translation");

  const modalContent = show ? (
    <StyledModalOverlay isModalOpen={show}>
      <ModalContainer isModalOpen={show}>
        <StyledModal>
          <StyledModalHeader>
            <div />
            <div className="text-gray-900 text-lg leading-6 ">
              {isEdit ? " Edit Address" : "Add New Address"}
            </div>
            <div className="cursor-pointer" onClick={handleCloseClick}>
              x
            </div>
          </StyledModalHeader>
          <StyledModalBody>
            {!checkoutLoading ? (
              <ModalAddressBody
                setLoading={() => setLoading(true)}
                address={address}
                isEdit={isEdit}
                addressId={addressId}
              />
            ) : (
              // <LoadingComponent />
              ""
            )}
          </StyledModalBody>
        </StyledModal>
      </ModalContainer>
    </StyledModalOverlay>
  ) : null;

  if (isBrowser) {
    return ReactDOM.createPortal(
      modalContent,
      document.getElementById("modal-root")
    );
  } else {
    return null;
  }
};

const StyledModalBody = styled.div`
  padding-top: 10px;
`;
const shrinkOut = keyframes`
  from {
    opacity: 1;
    transform: scale(1);
  }
  to {
    opacity: 0;
    transform: scale(0);
  }
`;
const zoomIn = keyframes`
  from {
    opacity: 0;
    transform: scale(0);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
`;

const zoomInOverlay = keyframes`
  from {
    opacity: 0;
    transform: scale(0);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
`;

const zoomOutOverlay = keyframes`
  from {
    opacity: 1;
    transform: scale(1);
  }
  to {
    opacity: 0;
    transform: scale(0);
  }
`;
const StyledModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 25px;
  border-bottom: 1px solid rgb(231, 231, 231);
  margin: 0px;
`;
const ModalContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1111;
  opacity: 1111;
  display: flex;
  justify-content: center;
  align-items: center;
  animation: ${({ isModalOpen }) =>
    isModalOpen
      ? css`
          ${zoomIn} 0.4s ease-in-out forwards
        `
      : css`
          ${shrinkOut} 0.4s ease-in-out forwards
        `};
`;

const StyledModal = styled.div`
  background: white;
  width: auto;
  height: auto;
  border-radius: 15px;
  padding: 15px;
  z-index: 1111;
  opacity: 1111;
  overflow-y: hidden;
`;
const StyledModalOverlay = styled.div`
  position: fixed;
  display: flex;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: ${({ isModalOpen }) => (isModalOpen ? 1111 : 0)};
  overflow: auto;
  justify-content: center;
  align-items: center;
  background-color: ${({ isModalOpen }) =>
    isModalOpen ? "rgba(0, 0, 0, 0.5)" : "transparent"};
  transition: all 0.4s ease-in-out;
`;

export default AddressModal;
