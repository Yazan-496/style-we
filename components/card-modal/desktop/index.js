import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import ModalBodyComponent from './ModalBodyComponent';
import LoadingComponent from '../../LoadingComponent/desktop';
import { useDispatch, useSelector } from 'react-redux';
import Toast from '../../../helpers/Toast/Big';
import { useTranslation } from 'react-i18next';
import Link from 'helpers/Link';
import {useCart} from "../../context/CartContext";

const AddToCardModal = ({ show, onClose, close, product }) => {
    const dispatch = useDispatch();
    const {addToCart, loadingProvider} = useCart()
    const [qtyState, setQtyState] = useState(1);
    const [isBrowser, setIsBrowser] = useState(false);
    const [loading, setLoading] = useState(true);
    const [selectedSize, setSelectedSize] = useState(null);
    const [isSizeRequired, setIsSizeRequired] = useState(product?.variation?.length > 0);
    useEffect(() => {
        window.innerWidth = screen.width;
        window.innerHeight = screen.height;
    }, []);
    useEffect(() => {
        setIsSizeRequired(product?.variation?.length > 0);
    }, [product]);

    const cartLoading = useSelector((state) => state?.CartReducer?.cartLoading);
    const cartProduct = useSelector((state) => state?.CartReducer?.cartProduct);
    const addedToCart = useSelector((state) => state?.CartReducer?.addedToCart);

    useEffect(() => {
        setIsBrowser(true);
        show ? (document.body.style.overflow = 'hidden') : (document.body.style.overflow = 'unset');
    }, [show]);

    useEffect(() => {
        setTimeout(() => setLoading(false), 3000);
    }, [show]);

    const handleCloseClick = (e) => {
        if (e.target.classList.contains('modal-background') || e.target.classList.contains('modal-exit')) {
            onClose();
            setLoading(true);
            setSelectedSize('');
        }
    };


    const [showToast, setShowToast] = useState({});

    const _closeAfterSuccess = () => {
        if (addedToCart && !cartLoading) {
            onClose();
            dispatch({ type: 'RESET_ADDED_TO_CART' });
        }
    };


    function handleClose() {
        setSelectedSize('');
        dispatch({
            type: 'REMOVE_PRODUCT_CART',
            payload: null
        });
        setSelectedSize('');
    }

    const { t, i18n } = useTranslation('translation');

    // function addToCart(product) {
    //     if (isSizeRequired) {
    //         if (selectedSize) {
    //             dispatch({
    //                 type: 'ADD_TO_CART',
    //                 payload: {
    //                     id: product?.id,
    //                     quantity: qtyState || 1,
    //                     choice_1: selectedSize?.type,
    //                     openCart: false
    //                 }
    //             });
    //         } else {
    //             setShowToast({
    //                 show: true,
    //                 message: `${t('main.please_choose_the_size')}`
    //             });
    //             setTimeout(() => {
    //                 setShowToast({ show: false, message: '' });
    //             }, 4000);
    //         }
    //     } else {
    //         dispatch({
    //             type: 'ADD_TO_CART',
    //             payload: {
    //                 id: product?.id,
    //                 quantity: qtyState || 1,
    //                 openCart: false
    //             }
    //         });
    //     }
    // }
    function addToCartt(product) {
        if (isSizeRequired) {
            if (selectedSize) {
                addToCart({id: product?.id, quantity: qtyState || 1, choice: selectedSize?.type, isModal: true, onClose: () => onClose()
            })
                // dispatch({
                //   type: 'ADD_TO_CART',
                //   payload: {
                //     id: product?.id,
                //     quantity: qtyState || 1,
                //     choice_1: selectedSize?.type,
                //     openCart: true,
                //   },
                // });
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
            addToCart({id: product?.id, quantity: qtyState || 1, choice: null, isModal: true, onClose: () => onClose()})
            // dispatch({
            //   type: 'ADD_TO_CART',
            //   payload: {
            //     id: product?.id,
            //     quantity: qtyState || 1,
            //     openCart: true,
            //   },
            // });
        }
    }

    useEffect(() => {
        // console.log(selectedSize, "selectedSize");
    }, [selectedSize]);
    useEffect(() => {
        setIsBrowser(true);
        show
            ? (document.body.style.overflow = "hidden")
            : (document.body.style.overflow = "unset");
    }, [show])
    const modalContent = show ? (

        <div className="relative h-[100vh] w-[100vw]">
            <div
                className={`fixed modal-background  backdrop-brightness-75 top-0 left-0 lg:items-center lg:justify-center md:items-center md:justify-center w-full h-full z-100 ${show ? 'opacity-100' : 'opacity-0'} flex justify-end items-end transition-all duration-400 ease-in-out`} onClick={handleCloseClick}>
                <div
                    className=' flex lg:h-fit h-full sm:items-end sm:justify-end md:px-10 lg:left-auto lg:p-4 lg:w-auto pt-10 absolute sm:left-0 sm:w-full w-full'>
                    <div className='rounded-tr-xl rounded-tl-xl md:w-[90%] bg-white h-full lg:w-auto max-h-fit opacity-100 overflow-auto p-15 pb-10 relative rounded-15 sm:h-full w-full z-50'>
                        <div className=' sticky right-0 top-0 flex justify-end p-2 bg-white z-50'>
                            <p className=' hover:cursor-pointer modal-exit' onClick={handleCloseClick}>x</p>
                        </div>
                        <div className='lg:px-10 h-full sm:px-10'>
                            {!cartLoading ? (
                                <ModalBodyComponent
                                    isSizeRequired={isSizeRequired}
                                    qtyState={qtyState}
                                    setQtyState={(qtyState) => setQtyState(qtyState)}
                                    setLoading={() => setLoading(true)}
                                    addToCart={(product) => addToCartt(product)}
                                    setSelectedSize={(selectedSize) =>
                                        setSelectedSize(selectedSize)
                                    }
                                    setIsSizeRequired={(isSizeRequired) =>
                                        setIsSizeRequired(isSizeRequired)
                                    }
                                    selectedSize={selectedSize}
                                    onClose={() => onClose(close)}
                                    loading={loadingProvider}
                                    product={cartProduct}
                                    cartProduct={cartProduct}
                                    showToast={showToast}
                                />
                            ) : (
                                <LoadingComponent />
                            )}
                            {showToast?.show && (
                                <Toast message={showToast?.message} timeout={4000} />
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>) : null;

    if (isBrowser) {
        return ReactDOM.createPortal(
            modalContent,
            document.getElementById('modal-root')
        );
    } else {
        return null;
    }
};

export default AddToCardModal;
