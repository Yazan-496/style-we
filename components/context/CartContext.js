'use client';
import React, {
    createContext,
    useCallback,
    useContext,
    useEffect,
    useState,
} from 'react';
import {
    AddToCartServer,
    ChangeQuantityServer,
    DeleteFromCartServer,
} from 'helpers/actions/fetchServer';
import {
    ShowNotificationServer,
    ShowConsoleServer,
} from 'helpers/API/ShowNoti';
import { ToastContainer } from 'react-toastify';
import { I18nextProvider } from 'react-i18next';
import { useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import store from '../../store';
import Cookies from 'js-cookie';

export const CartContext = createContext({
    cartItem: [],
    setCloseModalProvider: () => {},
    addToCart: () => {},
    removeFromCart: () => {},
    increaseQuantity: () => {},
    changeQuantity: () => {},
    toggleCheckProduct: () => {},
    decreaseQuantity: () => {},
    totalPrice: 0,
    savingAmount: 0,
    itemCount: 0,
});

// Create a custom hook to use the cart context
export const useCart = () => {
    return useContext(CartContext);
};

const CartProvider = ({ shippingCart, children }) => {
    const router = useRouter();
    const [cartItem, setCartItem] = useState([]);
    const [syncCart, setSyncCart] = useState(false);
    const [totalPrice, setTotalPrice] = useState(0);
    const [itemCount, setItemCount] = useState(0);
    const [savingAmount, setSavingAmount] = useState(0);
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [loadingProvider, setLoadingProvider] = useState(true);
    let token = Cookies.get('TOKEN_LOCAL_STORAGE');
    useEffect(() => {
        ShowConsoleServer(shippingCart, 'cart');
    }, [shippingCart]);
    useEffect(() => {
        if (!token) {
            store.dispatch({ type: 'GET_ITEMS_CART' });
            store.dispatch({
                type: 'GET_FAVORITE_PRODUCTS',
            });
        }
    }, [syncCart]);

    useEffect(() => {
        let token = JSON.parse(
            localStorage.getItem('TOKEN_LOCAL_STORAGE')
        )?.token;
        if (token) {
            setLoadingProvider(false);
        }
        const unsubscribe = store.subscribe(() => {
            const updatedToken = JSON.parse(
                localStorage.getItem('TOKEN_LOCAL_STORAGE')
            )?.token;
            if (updatedToken) {
                setLoadingProvider(false);
            }
        });
        return () => {
            unsubscribe();
        };
    }, []);

    const addToCart = async ({ id, quantity, choice, isModal, onClose }) => {
        // const existingProduct = cartItem.find(
        //     p => p.thumbnail === product.thumbnail &&
        //         p.name === product.name &&
        //         p.price === product.price &&
        //         p.offer_price === product.offer_price
        // );
        //
        // if (existingProduct) {
        //     existingProduct.qty++;
        //     setCartItem(prevCart =>
        //         prevCart.map(p => (p === existingProduct ? existingProduct : p))
        //     );
        // } else {
        //     setCartItem(prevCart => [
        //         ...prevCart,
        //         { ...product, qty: 1, checked: true },
        //     ]);
        // }
        setLoadingProvider(true);
        // Check Redeem
        const redeemProductIds =
            JSON.parse(localStorage.getItem('REDEEM_PRODUCTS_IDS')) || [];
        const isProductIdInRedeem = redeemProductIds.includes(id);
        const is_redeem = isProductIdInRedeem ? 1 : 0;

        const res = await AddToCartServer(id, quantity, choice, is_redeem);

        if (res) {
            setSyncCart(!syncCart);
        }
        setLoadingProvider(false);
        await ShowNotificationServer(res.type, res.data);
        await ShowConsoleServer(res.data, 'add to cart');
        isModal && (await onClose());
        router.refresh();
    };
    const removeFromCart = async ({ id }) => {
        // const newCart = cartItem.filter((product, i) => i !== index);
        // setCartItem(newCart);
        setLoadingProvider(true);
        const res = await DeleteFromCartServer(id);
        if (res) {
            setSyncCart(!syncCart);
        }
        await ShowNotificationServer(res.type, res.data);
        await ShowConsoleServer(res.data, 'remove from cart');
        const aa = await setTimeout(() => {
            setLoadingProvider(false);
        }, 3000);
        router.refresh();
    };

    const changeQuantity = async ({ id, quantity }) => {
        setLoadingProvider(true);
        const res = await ChangeQuantityServer(id, quantity);
        if (res) {
            setSyncCart(!syncCart);
        }
        await ShowNotificationServer(res.type, res.data);
        await ShowConsoleServer(res.data, 'update cart');
        const aa = await setTimeout(() => {
            setLoadingProvider(false);
        }, 3000);
        router.refresh();
    };
    const toggleCheckProduct = (index) => {
        const tempArr = [...cartItem];
        tempArr[index].checked = !tempArr[index].checked;
        setCartItem(tempArr);
    };

    useEffect(() => {
        if (typeof window !== 'undefined') {
            let tempArr = cartItem.length
                ? [...cartItem]
                : JSON.parse(localStorage.getItem('cartItems') || '[]');
            if (!cartItem.length && tempArr.length) {
                setCartItem(tempArr);
            }

            const totalPrc = tempArr.reduce(
                (total, product) =>
                    product.checked
                        ? total +
                          Number(
                              product.offer_price
                                  ? product.offer_price
                                  : product.price
                          ) *
                              product.qty
                        : total,
                0
            );

            const savingPrc = tempArr.reduce(
                (total, product) =>
                    product.checked
                        ? total +
                          (Number(product.price) * product.qty -
                              Number(
                                  product.offer_price
                                      ? product.offer_price
                                      : product.price
                              ) *
                                  product.qty)
                        : total,
                0
            );

            const tempTotalCount = tempArr.reduce(
                (acc, product) => acc + product.qty,
                0
            );
            const tempUncheckedCount = tempArr.reduce(
                (acc, product) => (!product.checked ? acc + product.qty : acc),
                0
            );
            setSavingAmount(savingPrc);
            setItemCount(tempTotalCount - tempUncheckedCount);
            setTotalPrice(totalPrc);

            localStorage.setItem('cartItems', JSON.stringify(cartItem));
        }
    }, [cartItem]);

    const increaseQuantity = (index) => {
        setSyncCart(!syncCart);
        const product = cartItem[index];
        if (product) {
            product.qty++;
            setCartItem((prevCart) =>
                prevCart.map((p, i) => (i === index ? product : p))
            );
        }
    };

    const decreaseQuantity = (index) => {
        setSyncCart(!syncCart);
        const product = cartItem[index];
        if (product && product.qty > 0) {
            product.qty--;
            setCartItem((prevCart) =>
                prevCart.map((p, i) => (i === index ? product : p))
            );
        }
    };
    return (
        <CartContext.Provider
            value={{
                cartItem,
                loadingProvider,
                addToCart,
                removeFromCart,
                totalPrice,
                increaseQuantity,
                changeQuantity,
                decreaseQuantity,
                isCartOpen,
                itemCount,
                setIsCartOpen,
                toggleCheckProduct,
                savingAmount,
            }}
        >
            {children}
            {/* <ToastContainer /> */}
        </CartContext.Provider>
    );
};

export default CartProvider;
