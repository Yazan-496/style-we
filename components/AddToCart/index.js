import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import styles from 'styles/AddToCart.module.css';
import { HeartSVG, SvgLoader } from 'components/svgs';
function AddToCart({ product , addToCart , loadingProvider }) {
    const [adedToCart, setadedToCart] = useState(false);
    const [check, setCheck] = useState(product?.is_favourite);
    const [buy, setBuy] = useState(false);
    const addedToCart = useSelector((store) => store.CartReducer.addedToCart);
    const dispatch = useDispatch();
    const { t, i18n } = useTranslation('translation');
    const router = useRouter();
    const handleAddToCart = () => {
        setadedToCart(true);
        addToCart(product);
    };
    function setFavorite() {
        dispatch({
            type: 'FAVORITE_PRODUCT',
            payload: { id: product?.id, isFavorite: check },
        });
        setCheck(!check);
    }

    useEffect(() => {
        if (product?.is_favourite) {
            setCheck(true);
        }
    }, [product]);
    useEffect(() => {
        if (addedToCart && buy) {
            dispatch({ type: 'RESET_ADDED_TO_CART' });
            dispatch({ type: 'START_LOADING_PRODUCT' });
            router.push('/payment-method');
        }
    }, [buy, addedToCart]);
    const syncInfo = useSelector((state) => state.AuthReducer.syncInfo);
    const [syncLoading, setSyncLoading] = useState(true)
    useEffect(() => {
        if (typeof window !== "undefined") {
          const customerInfo = JSON.parse(localStorage.getItem("CUSTOMER_INFO_STORAGE"))
            if (customerInfo?.customerInfo){
                setSyncLoading(false)
            }
        else{
                setSyncLoading(true)
            }
        }
    }, [syncInfo]);
    return (
        <div className={`flex fixed bottom-0 right-0 left-0 z-50 justify-center self-stretch flex-grow-0 flex-shrink-0 gap-4 bottom-0 left-0  purchase-btn mt-2 sticky pt-2 bg-white bg-opacity-95 flex-grow items-center lg:hidden`}>
            <div className="flex items-center justify-center m-5">
                <HeartSVG check={check} onClick={setFavorite} className={`cursor-pointer ${check ? 'text-red-500' : 'text-gray-400'}`} />
            </div>

          {product?.in_stock ? (
            <button
                disabled={loadingProvider}
                onClick={handleAddToCart}
                className={`${!adedToCart ? styles.animatedButton : ''} flex bg-black justify-center items-center overflow-hidden rounded disabled:opacity-80 disabled:cursor-not-allowed hover:opacity-80 active:opacity-90 active:shadow-[inset_0px_0px_8px_rgba(0,0,0,0.25)] group cm-btn-primary flex-grow h-12 gap-1`}
            >
                <div className="inline-block truncate opacity-1 group-active:opacity-90">
                    <p className="text-white flex-grow-0 flex-shrink-0 text-lg font-bold">
                        { (loadingProvider) ? <SvgLoader /> : t('user.add_to_cart')}
                    </p>
                </div>
            </button>
            ) : (
            <button
                disabled={loadingProvider}
                className={` flex bg-black/50 justify-center items-center overflow-hidden rounded disabled:opacity-80 disabled:cursor-not-allowed hover:opacity-80 active:opacity-90 active:shadow-[inset_0px_0px_8px_rgba(0,0,0,0.25)] group cm-btn-primary flex-grow h-12 gap-1`}
            >
                <div className="inline-block truncate opacity-1 group-active:opacity-90">
                    <p className="text-white flex-grow-0 flex-shrink-0 text-lg font-bold">
                        {t('user.out_of_stock')}
                    </p>
                </div>
            </button>
          )}
        </div>
    );
}

export default AddToCart;