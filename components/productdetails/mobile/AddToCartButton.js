import { useTranslation } from 'react-i18next';
import { useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';

const AddToCartButton = ({ addToCart, product }) => {
    const handleAddToCart = () => {
        addToCart(product);
    };
    const { t, i18n } = useTranslation('translation');
    const router = useRouter();
    const shippingCart = useSelector((store) => store.CartReducer.shippingCart);
    const addedToCart = useSelector((store) => store.CartReducer.addedToCart);
    const [buy, setBuy] = useState(false);
    function handleBuy() {
        setBuy(true);
        addToCart(product);
    }
    const cartLoading = useSelector((state) => state?.CartReducer?.cartLoading);
    const dispatch = useDispatch();
    useEffect(() => {
        if (addedToCart && buy) {
            dispatch({ type: 'RESET_ADDED_TO_CART' });
            dispatch({ type: 'START_LOADING_PRODUCT' });
            router.push('/payment-method');
        }
    }, [buy, addedToCart]);
    return (
        <div className="z-[50] flex justify-center self-stretch flex-grow-0 flex-shrink-0 gap-4 bottom-0 left-0  purchase-btn mt-2 sticky pt-2 bg-white bg-opacity-95 flex-grow items-end">
            <button
                disabled={cartLoading}
                onClick={handleAddToCart}
                className="flex justify-center items-center overflow-hidden rounded disabled:opacity-20 disabled:cursor-not-allowed hover:opacity-80 active:opacity-90 active:shadow-[inset_0px_0px_8px_rgba(0,0,0,0.25)] group cm-btn-primary flex-grow h-12 gap-1"
            >
                <div className="inline-block truncate opacity-1 group-active:opacity-90">
                    <p className="text-white flex-grow-0 flex-shrink-0 text-lg font-bold">
                        {t('user.add_to_cart')}
                    </p>
                </div>
            </button>
            <button
                onClick={handleBuy}
                className="flex justify-center items-center overflow-hidden rounded disabled:opacity-20 disabled:cursor-not-allowed hover:opacity-80 active:opacity-90 active:shadow-[inset_0px_0px_8px_rgba(0,0,0,0.25)] group cm-btn-second border h-12 px-3"
            >
                <div className="inline-block truncate opacity-1 group-active:opacity-90">
                    {t('user.buy_now')}
                </div>
            </button>
        </div>
    );
};
export default AddToCartButton;
