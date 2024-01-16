import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';
import ModalBodyComponent from './ModalBodyComponent';
import LoadingComponent from '../../LoadingComponent/desktop';
import { useSelector } from 'react-redux';
import CartModal from '../../Body/mobile/CartModal';
import Toast from '../../../helpers/Toast';
import { useTranslation } from 'react-i18next';

const AddToCardModal = ({ show, onClose, close, product, children }) => {
  const [isBrowser, setIsBrowser] = useState(false);
  const [qtyState, , setQtyState] = useState(1);
  const [loading, setLoading] = useState(true);
  const [showToast, setShowToast] = useState({});
  const [selectedSize, setSelectedSize] = useState(null);
  const [isSizeRequired, setIsSizeRequired] = useState(
    product?.variation?.length > 0
  );
  useEffect(() => {
    setIsSizeRequired(product?.variation?.length > 0);
  }, [product]);
  const cartLoading = useSelector((state) => state?.CartReducer?.cartLoading);
  const cartProduct = useSelector((state) => state?.CartReducer?.cartProduct);
  const addedToCart = useSelector((state) => state?.CartReducer?.addedToCart);
  useEffect(() => {
    setIsBrowser(true);
    show
      ? (document.body.style.overflow = 'hidden')
      : (document.body.style.overflow = 'unset');
  }, [show]);
  useEffect(() => {
    setTimeout(() => setLoading(false), 3000);
  }, [show]);

  const handleCloseClick = (e) => {
    e.preventDefault();
    onClose();
    setLoading(true);
    setSelectedSize('');
    setIsSizeRequired(false);
  };
  const { t, i18n } = useTranslation('translation');
  function addToCart(product) {
    // console.log("yes here");
    if (isSizeRequired) {
      if (selectedSize) {
        dispatch({
          type: 'ADD_TO_CART',
          payload: {
            id: product?.id,
            quantity: qtyState || 1,
            choice_1: selectedSize?.type,
          },
        });
      } else {
        setShowToast({
          show: true,
          message: `${t('main.please_choose_the_size')}`,
        });
        setTimeout(() => {
          setShowToast({ show: false, message: '' });
        }, 4000);
      }
    } else {
      dispatch({
        type: 'ADD_TO_CART',
        payload: {
          id: product?.id,
          quantity: qtyState || 1,
        },
      });
    }
  }

  const modalContent = show ? (
    <StyledModalOverlay>
      <StyledModal>
        <StyledModalHeader>
          <a href="#" onClick={handleCloseClick}>
            x
          </a>
        </StyledModalHeader>
        <StyledModalBody>
          {!loading ? (
            <ModalBodyComponent
              setQtyState={(qtyState) => setQtyState(qtyState)}
              qtyState={qtyState}
              addToCart={(product) => addToCart(product)}
              setSelectedSize={(selectedSize) => setSelectedSize(selectedSize)}
              setIsSizeRequired={(isSizeRequired) =>
                setIsSizeRequired(isSizeRequired)
              }
              selectedSize={selectedSize}
              setLoading={() => setLoading(true)}
              onClose={() => onClose(close)}
              loading={loading}
              product={product}
              showToast={showToast}
            />
          ) : (
            <LoadingComponent />
          )}
          {showToast?.show && (
            <Toast message={showToast?.message} timeout={4000} />
          )}
        </StyledModalBody>
      </StyledModal>
    </StyledModalOverlay>
  ) : null;

  if (isBrowser) {
    return ReactDOM.createPortal(
      modalContent,
      document.getElementById('modal-root')
    );
  } else {
    return null;
  }
};

const StyledModalBody = styled.div`
  padding-top: 10px;
`;
const StyledModalTitle = styled.div`
  padding-top: 10px;
`;

const StyledModalHeader = styled.div`
  display: flex;
  justify-content: flex-end;
  font-size: 25px;
`;

const StyledModal = styled.div`
  background: white;
  width: auto;
  height: auto;
  border-radius: 15px;
  padding: 15px;
  z-index: 1111111;
  opacity: 1111111;
  overflow-y: hidden;
`;
const StyledModalOverlay = styled.div`
  position: fixed;
  display: flex;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1111111;
  opacity: 1111111;
  overflow: auto;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.5);
`;

export default AddToCardModal;
