import React, { useEffect, useRef, useState } from 'react';
import ModalBodyComponent from './Body';
import ItemDetail from './ItemDetail';
import RecentlyProduct from './RecentlyProducts';
import { useDispatch, useSelector } from 'react-redux';
import ShowedProduct from '../../Body/mobile/ShowedProduct';
import Toast from '../../../helpers/Toast/Big';
import { useTranslation } from 'react-i18next';
import AddToCart from 'components/AddToCart';
import { useCart } from '../../context/CartContext';

const ProductDetails = ({ product, recentlyProduct, openCart }) => {
    const [selectedSize, setSelectedSize] = useState(null);
    const { addToCart, loadingProvider } = useCart();
    const [isSizeRequired, setIsSizeRequired] = useState(
        product?.variation?.length > 0
    );
    const [qtyState, setQtyState] = useState(1);
    const toastMessage = useSelector((state) => state?.CartReducer.toastMessage);
    const [showToast, setShowToast] = useState({});
    const dispatch = useDispatch();
    useEffect(() => {
        setIsSizeRequired(product?.variation?.length > 0);
    }, [product]);

    function addToCartt(product) {
        if (isSizeRequired) {
            if (selectedSize) {
                addToCart({ id: product?.id, quantity: qtyState || 1, choice: selectedSize?.type, isModal: false });
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
                    message: `${t('main.please_choose_the_size')}`
                });
                setTimeout(() => {
                    setShowToast({ show: false, message: '' });
                }, 4000);
            }
        } else {
            addToCart({ id: product?.id, quantity: qtyState || 1, choice: null, isModal: false });
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

    const [isSticky, setIsSticky] = useState(false);
    const productRef = useRef(null);

    useEffect(() => {
        function handleScroll() {
            // console.log("handleScroll")
            const productElement = productRef.current;
            if (productElement) {
                // console.log("productElement")
                const productRect = productElement.getBoundingClientRect();
                if (productRect.bottom < window.innerHeight) {
                    // console.log("etIsSticky(true);")
                    setIsSticky(true);
                } else {
                    // console.log("etIsSticky(false);")
                    setIsSticky(false);
                }
            }
        }

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);
    const { t, i18n } = useTranslation('translation');
    return (
        <div className='absolute w-full left-0 top-0 px-3 lg:px-10 bg-white flex flex-col justify-center items-center'>
            <div className='w-full h-full'>
                <ModalBodyComponent
                    addProduct={(product) => addToCartt(product)}
                    setSelectedSize={(selectedSize) => setSelectedSize(selectedSize)}
                    setQtyState={(qtyState) => setQtyState(qtyState)}
                    qtyState={qtyState}
                    loadingProvider={loadingProvider}
                    isSizeRequired={isSizeRequired}
                    setIsSizeRequired={(isSizeRequired) =>
                        setIsSizeRequired(isSizeRequired)
                    }
                    selectedSize={selectedSize}
                    product={product}
                    showToast={showToast}
                />
                {product?.related_products?.length > 0 && (
                    <div className='py-10'>
                        <RecentlyProduct
                            recentlyProduct={product?.related_products}
                            productId={product?.id}
                            title={t('user.related_products')}
                        />
                    </div>
                )}
                {product?.similar_products?.length > 0 && (
                    <div className='py-10'>
                        <RecentlyProduct
                            recentlyProduct={product?.similar_products}
                            productId={product?.id}
                            title={t('user.similar_products')}
                        />
                    </div>
                )}
                {recentlyProduct?.length > 0 && (
                    <div className='py-10'>
                        <RecentlyProduct
                            recentlyProduct={recentlyProduct}
                            productId={product?.id}
                            title={t('user.recently_viewed')}
                        />
                    </div>
                )}
            </div>
            <div ref={productRef}></div>
            <div
                className={`${isSticky ? 'sticky' : 'fixed' } bottom-0 w-full z-50`}
            >
                <AddToCart
                    loadingProvider = {loadingProvider}
                    product={product}
                    addToCart={(product) => addToCartt(product)}
                />
            </div>
            {showToast?.show && <Toast message={showToast?.message} timeout={4000} />}
            {toastMessage && <Toast message={toastMessage} timeout={4000} />}
        </div>
    );
};

export default ProductDetails;
