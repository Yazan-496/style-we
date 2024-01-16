import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import styled, { keyframes, css } from "styled-components";
import ModalReturnProductBody from "./ModalReturnProductBody";
import LoadingComponent from "../../../../LoadingComponent/desktop";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

const ReturnProductModal = ({ show, onClose, product, type, order, padding }) => {
  const dispatch = useDispatch();
  const [isBrowser, setIsBrowser] = useState(false);
  const [loading, setLoading] = useState(true);
  const checkoutLoading = useSelector(
    (state) => state?.CheckoutReducer?.cartProduct
  );
  const closeModalProductReturn = useSelector(
    (state) => state?.CheckoutReducer?.closeModalProductReturn
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
    // dispatch({type: "RESET_RETURN_ORDER_DETAILS_REDUCER"})
    setLoading(true);
  };

  const [showToast, setShowToast] = useState({});
  const _closeAfterSuccess = () => {
    if (closeModalProductReturn) {
      onClose();
      dispatch({
        type: "RESET_RETURN_PRODUCT",
      });
    }
  };

  useEffect(() => {
    if (closeModalProductReturn) {
      _closeAfterSuccess();
    }
  }, [closeModalProductReturn, checkoutLoading]);

  function handleClose() {
    dispatch({
      type: "REMOVE_PRODUCT_CART",
      payload: null,
    });
  }

  const { t, i18n } = useTranslation("translation");

  const modalContent = show ? (
    <StyledModalOverlay isModalOpen={show}>
      <ModalContainer className="w-full p-0 pt-20 lg:p-20" isModalOpen={show}>
        <StyledModal className="w-full" padding={padding}>
          <StyledModalHeader>
            <div />
            <div className="text-gray-900 text-lg leading-6 ">
              {"Product Return Request"}
            </div>
            <div className="cursor-pointer" onClick={handleCloseClick}>
              x
            </div>
          </StyledModalHeader>
          <StyledModalBody padding={padding}>
            {!checkoutLoading ? (
              <ModalReturnProductBody
                product={product}
                order={order}
                type={type}
                setLoading={() => setLoading(true)}
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
  padding-top: 10px !important;
  padding-left: ${({ padding }) => (padding ? "50px" : 0)};
  padding-right: ${({ padding }) => (padding ? "50px" : 0)};
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
  position: sticky;
  top: 0;
  padding: 10px;
  opacity: 11111;
  z-index: 11111;
  background-color: white;
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
  opacity: 1111;
  z-index: 1111;
  padding: ${({ padding }) => (padding ? "50px" : 0)};
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
  width:  ${({ padding }) => (padding ? "auto" : "100%")};
  height: 100%;
  border-radius: 15px;
  z-index: 1111;
  opacity: 1111;
  overflow: auto;
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

export default ReturnProductModal;
