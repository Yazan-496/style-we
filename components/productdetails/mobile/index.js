import React, { useEffect, useState } from 'react';
import ModalBodyComponent from '../../card-modal/mobile/ModalBodyComponent';
import ItemDetail from './ItemDetail';
import RecentlyProduct from './RecentlyProducts';
import CartModal from '../../Body/mobile/CartModal';
import ShowedProduct from '../../Body/mobile/ShowedProduct';
import { useDispatch, useSelector } from 'react-redux';
import Products from '../../Body/mobile/products';
import Toast from '../../../helpers/Toast';
import { BannerLogo } from 'helpers/Loader/Loading';
import { useTranslation } from 'react-i18next';

const ProductDetails = ({
    product,
    recentlyProduct,
    requestAddProduct,
    requestedProduct,
    requestisSizeRequired,
}) => {
    const [openCartModal, setOpenCartModal] = useState(false);
    const [qtyState, setQtyState] = useState(1);
    const [showedProductModal, setShowedProductModal] = useState(false);
    const [showedProduct, setShowedProduct] = useState([]);
    const cartLoading = useSelector((state) => state?.CartReducer?.cartLoading);
    const addedToCart = useSelector((state) => state?.CartReducer?.addedToCart);
    const [showToast, setShowToast] = useState({});
    const [selectedSize, setSelectedSize] = useState(null);
    const [isSizeRequired, setIsSizeRequired] = useState(
        product?.variation?.length > 0
    );
    const sync = useSelector((store) => store.CartReducer.sync);

    const cartProduct = useSelector((state) => state?.CartReducer?.cartProduct);
    const productLoading = useSelector(
        (state) => state?.ProductReducer?.productLoading
    );
    useEffect(() => {
        if (openCartModal || showedProductModal) {
            // Add overflow hidden to the body when the modal is open
            document.body.style.overflow = 'hidden';
        } else {
            // Restore the default overflow when the modal is closed
            document.body.style.overflow = 'auto';
        }

        return () => {
            // Restore the default overflow when the component unmounts
            document.body.style.overflow = 'auto';
        };
    }, [openCartModal, showedProductModal]);
    const dispatch = useDispatch();

    function handleClose() {
        setOpenCartModal(false);
        setSelectedSize('');
        dispatch({
            type: 'REMOVE_PRODUCT_CART',
            payload: null,
        });
        setSelectedSize('');
    }

    function addToCart(product) {
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
                    setShowToast({
                        show: false,
                        message: '',
                    });
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

    const toastMessage = useSelector(
        (state) => state?.CartReducer.toastMessage
    );
    const _closeAfterSuccess = () => {
        if (addedToCart && !cartLoading) {
            handleClose();
            dispatch({ type: 'RESET_ADDED_TO_CART' });
        }
    };

    useEffect(() => {
        if (addedToCart && !toastMessage) {
            _closeAfterSuccess();
        }
    }, [addedToCart, cartLoading]);
    useEffect(() => {
        setIsSizeRequired(product?.variation?.length > 0);
    }, [product, addedToCart]);
    useEffect(() => {
        if (requestedProduct) {
            addToCart(requestedProduct);
        }
    }, [requestAddProduct, requestedProduct]);
    // useEffect(() => {
    //     if (requestisSizeRequired) {
    //         console.log('requestisSizeRequired');
    //         setIsSizeRequired(true);
    //     }
    // }, [requestisSizeRequired]);

    useEffect(() => {}, [showToast, isSizeRequired]);
    const { t, i18n } = useTranslation('translation');
    return (
        <div className="h-full">
            <div className="bg-white flex justify-center items-center pb-[30px]">
                <div className="w-full">
                    {product && !productLoading ? (
                        <ModalBodyComponent
                            setQtyState={(qtyState) => setQtyState(qtyState)}
                            qtyState={qtyState}
                            addToCart={(product) => addToCart(product)}
                            setSelectedSize={(selectedSize) =>
                                setSelectedSize(selectedSize)
                            }
                            setIsSizeRequired={(isSizeRequired) =>
                                setIsSizeRequired(isSizeRequired)
                            }
                            isSizeRequired={isSizeRequired}
                            selectedSize={selectedSize}
                            loading={cartLoading}
                            product={product}
                            cartProduct={cartProduct}
                            showToast={showToast}
                        />
                    ) : (
                        <div className="h-[90vh]">
                            <BannerLogo
                                width={'100%'}
                                height={'80%'}
                                viewBox={'0 0 100 130'}
                            />
                        </div>
                    )}
                    <ItemDetail product={product} />
                    {product?.related_products?.length > 0 && (
                        <div className="py-10">
                            <RecentlyProduct
                                setOpenCartModal={() => setOpenCartModal(true)}
                                setCloseCartModal={() =>
                                    setOpenCartModal(false)
                                }
                                recentlyProduct={product?.related_products}
                                productId={product?.id}
                                title={t('user.related_products')}
                            />
                        </div>
                    )}
                    {product?.similar_products?.length > 0 && (
                        <div className="py-10">
                            <RecentlyProduct
                                setOpenCartModal={() => setOpenCartModal(true)}
                                setCloseCartModal={() =>
                                    setOpenCartModal(false)
                                }
                                recentlyProduct={product?.similar_products}
                                productId={product?.id}
                                title={t('user.similar_products')}
                            />
                        </div>
                    )}
                    {recentlyProduct?.length > 0 && (
                        <div className="py-10">
                            <RecentlyProduct
                                setOpenCartModal={() => setOpenCartModal(true)}
                                setCloseCartModal={() =>
                                    setOpenCartModal(false)
                                }
                                recentlyProduct={recentlyProduct}
                                productId={product?.id}
                                title={t('user.recently_viewed')}
                            />
                        </div>
                    )}
                </div>
            </div>
            <CartModal
                qtyState={qtyState}
                isSizeRequired={isSizeRequired}
                setQtyState={(qtyState) => setQtyState(qtyState)}
                addToCart={(product) => addToCart(product)}
                setShowedProduct={(showedProduct) =>
                    setShowedProduct(showedProduct)
                }
                setShowedProductModal={() => setShowedProductModal(true)}
                setCloseProductModal={() => {
                    setShowedProductModal(false);
                    setShowedProduct(null);
                }}
                setSelectedSize={(selectedSize) =>
                    setSelectedSize(selectedSize)
                }
                setIsSizeRequired={(isSizeRequired) =>
                    setIsSizeRequired(isSizeRequired)
                }
                selectedSize={selectedSize}
                product={product}
                openModal={openCartModal}
                onClose={() => {
                    handleClose();
                }}
                showToast={showToast}
            />
            <ShowedProduct
                showedProduct={showedProduct}
                openShowedProduct={showedProductModal}
                onClose={() => {
                    setShowedProduct(null);
                    setShowedProductModal(false);
                }}
            />
            {showToast?.show && (
                <Toast message={showToast?.message} timeout={4000} />
            )}
            {toastMessage && <Toast message={toastMessage} timeout={4000} />}
        </div>
    );
};

export default ProductDetails;
