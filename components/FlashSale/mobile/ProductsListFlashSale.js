import Product from '../../Body/mobile/productItem';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CartModal from '../../Body/mobile/CartModal';
import ShowedProduct from '../../Body/mobile/ShowedProduct';
import Toast from '../../../helpers/Toast';
import LoadingComponentDesktop from '../../LoadingComponent/desktop';
import { useTranslation } from 'react-i18next';

const ProductsListFlashSale = ({ products }) => {
    const [product, setProduct] = useState([]);
    const [qtyState, setQtyState] = useState(1);
    const dispatch = useDispatch();
    const flashSaleProducts = useSelector(
        (state) => state?.FlashSaleReducer?.flashSaleProducts
    );
    const flashSaleLoading = useSelector(
        (state) => state?.FlashSaleReducer?.flashSaleLoading
    );
    const totalFlashSale = useSelector(
        (state) => state?.FlashSaleReducer?.totalFlashSale
    );
    const viewMoreButtonRef = useRef(null);

    const handleIncreaseOffset = () => {
        if (!flashSaleLoading) {
            // console.log(flashSaleProducts?.length, "flashSaleProducts");
            // console.log(totalFlashSale, "totalFlashSale");
            dispatch({ type: 'INCREASE_OFFSET_FLASH_SALE_REDUCER' });
        }
    };
    useEffect(() => {
        window.addEventListener('scroll', function () {
            const buttonElement = viewMoreButtonRef.current;

            if (buttonElement) {
                const buttonRect = buttonElement?.getBoundingClientRect();
                const isButtonVisible = buttonRect.top < window.innerHeight;

                if (
                    isButtonVisible &&
                    flashSaleProducts?.length < totalFlashSale
                ) {
                    handleIncreaseOffset();
                }
            }
        });
    }, [flashSaleLoading, flashSaleProducts?.length]);
    const [openCartModal, setOpenCartModal] = useState(false);
    const [showedProductModal, setShowedProductModal] = useState(false);
    const [showedProduct, setShowedProduct] = useState([]);
    const [filteredRecentlyProducts, setFilteredRecentlyProducts] = useState(
        []
    );
    const cartLoading = useSelector((state) => state?.CartReducer?.cartLoading);
    const addedToCart = useSelector((state) => state?.CartReducer?.addedToCart);
    const [showToast, setShowToast] = useState({});
    const [selectedSize, setSelectedSize] = useState(null);
    const [isSizeRequired, setIsSizeRequired] = useState(
        product?.variation?.length > 0
    );
    useEffect(() => {
        setIsSizeRequired(product?.variation?.length > 0);
    }, [product]);
    function handleClose() {
        setProduct(null);
        setOpenCartModal(false);
        dispatch({
            type: 'REMOVE_PRODUCT_CART',
            payload: null,
        });
        setSelectedSize('');
        setIsSizeRequired(false);
    }
    const { t, i18n } = useTranslation('translation');
    useEffect(() => {
        setIsSizeRequired(product?.variation?.length > 0);
    }, [product]);
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
    const _closeAfterSuccess = () => {
        if (addedToCart && !cartLoading) {
            handleClose();
            dispatch({ type: 'RESET_ADDED_TO_CART' });
        }
    };

    const toastMessage = useSelector(
        (state) => state?.CartReducer.toastMessage
    );
    useEffect(() => {
        if (addedToCart && !toastMessage) {
            _closeAfterSuccess();
        }
    }, [addedToCart, cartLoading]);
    return (
        <div className="pt-10 bg-gray-50 flex flex-wrap">
            {flashSaleLoading && flashSaleProducts?.length === 0 ? (
                <div className="flex items-center justify-center w-full h-[420px]">
                    {/* <LoadingComponentDesktop small={true} /> */}
                </div>
            ) : !flashSaleLoading && flashSaleProducts?.length === 0 ? (
                <span className="w-full items-center-center justify-center">
                    {t('main.no_flash_sale_found')}
                </span>
            ) : (
                <>
                    {flashSaleProducts?.map((product, index) => {
                        return (
                            <div
                                key={index}
                                className="p-4 bg-gray-50 w-[calc(50%)] h-[calc(50%-10px)]"
                            >
                                <div className="shadow-xl  bg-white">
                                    <Product
                                        setOpenCartModal={() =>
                                            setOpenCartModal(true)
                                        }
                                        setProduct={(product) =>
                                            setProduct(product)
                                        }
                                        setCloseCartModal={() =>
                                            setOpenCartModal(false)
                                        }
                                        product={product}
                                        flashSale={product?.flash_deal_details}
                                    />
                                </div>
                            </div>
                        );
                    })}
                    {flashSaleProducts?.length > 0 && flashSaleLoading ? (
                        <div
                            className={`${
                                flashSaleLoading ? '' : 'hidden'
                            } flex items-center justify-center w-full h-[120px]`}
                        >
                            <LoadingComponentDesktop small={true} />
                        </div>
                    ) : (
                        <div
                            className={`${
                                totalFlashSale > flashSaleProducts?.length
                                    ? ''
                                    : 'hidden'
                            } flex  flex-col items-stretch gap-5 mb-5 w-full items-center justify-center`}
                        >
                            <div
                                style={{
                                    alignSelf: 'center',
                                }}
                                className="p-1 w-[30%] h-[50%] flex items-center justify-center rounded-3xl style_paginationWrapper__YMATm"
                            >
                                <span
                                    ref={viewMoreButtonRef}
                                    className="hover:underline  cursor-pointer"
                                    onClick={handleIncreaseOffset}
                                >
                                    {t('main.view_more')}
                                </span>
                            </div>
                        </div>
                    )}
                    <div className="w-full flex items-center justify-center p-5 text-center text-base text-[#868C93]">
                        {flashSaleProducts?.length} {t('user.of')}{' '}
                        {totalFlashSale} {t('user.products')}
                    </div>
                </>
            )}

            <CartModal
                qtyState={qtyState}
                isSizeRequired={isSizeRequired}
                setQtyState={(qtyState) => setQtyState(qtyState)}
                addToCart={(product) => addToCart(product)}
                setSelectedSize={(selectedSize) =>
                    setSelectedSize(selectedSize)
                }
                setIsSizeRequired={(isSizeRequired) =>
                    setIsSizeRequired(isSizeRequired)
                }
                selectedSize={selectedSize}
                setShowedProduct={(showedProduct) =>
                    setShowedProduct(showedProduct)
                }
                setShowedProductModal={() => setShowedProductModal(true)}
                setCloseProductModal={() => {
                    setShowedProductModal(false);
                    setShowedProduct(null);
                }}
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
export default ProductsListFlashSale;
