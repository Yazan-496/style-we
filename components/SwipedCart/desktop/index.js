import React, { useEffect, useState } from 'react';
import ShowItemsInCart from '../../CardModal/desktop/ShowItemsInCart';
import Offer from '../../CardModal/desktop/ShowItemsInCart/Offer';
import { useRouter } from "next/navigation"
import { useCart } from "../../context/CartContext";
import { useTranslation } from 'react-i18next';
import LoadingComponent from 'components/LoadingComponent/desktop';
import Link from 'helpers/Link';
import { TransClient } from '../../../helpers/TransClient';
export default function SwipedCart({ open, close, shippingCart,showCoupon }) {
    // const { t, i18n } = useTranslation("translation");
    const { loadingProvider } = useCart()
    const handleClickOutsideBox = (event) => {
        if (typeof window !== 'undefined') {
            // 👇️ the element the user clicked
            const box = document?.getElementById('cart-side-bar');
            if (!box?.contains(event.target)) {
                document?.removeEventListener('click', handleClickOutsideBox);
                close();
            }
        }
    };
    // const shippingCart = useSelector((store) => store.CartReducer.shippingCart);
    // const cartLoading = useSelector((store) => store.CartReducer.cartLoading);
    // const dispatch = useDispatch();
    const [token, setToken] = useState(null);
    useEffect(() => {
        if (typeof window !== 'undefined') {
            setToken(JSON.parse(localStorage.getItem('TOKEN_LOCAL_STORAGE'))?.token);
        }
    }, []);
    useEffect(() => {
        open
            ? (document.body.style.overflow = 'hidden')
            : (document.body.style.overflow = 'unset');
    }, [open]);
    const router = useRouter();
    useEffect(() => {
        if (token) {
            router.refresh();
        }
    }, [token]);
    // useEffect(() => {
    //     if (shippingCart) {
    //         setItemsInCart(shippingCart?.cart);
    //     }
    // }, [shippingCart, dispatch]);
    // useEffect(() => {
    //     if (cartLoading) {
    //         setLoading(true);
    //     } else {
    //         setLoading(false);
    //     }
    // }, [cartLoading, dispatch]);
    if (open) {
        return (
            <div className='w-full fixed left-0 h-screen top-0 transition-all duration-300 z-60 bg-white/50 '>
                <div
                    id='cart-side-bar'
                    // onMouseLeave={() => {
                    //   document?.addEventListener("click", handleClickOutsideBox);
                    // }}
                    className={`
            w-full lg:w-[480px] md:w-[480px] overflow-hidden h-full fixed right-[-1px] top-0 z-[60] flex flex-col bg-[#f2f2f3] swiper-cart-animate
        `}
                >
                    <div dir={TransClient("user.dir")}
                        className={`${loadingProvider && shippingCart?.cart?.length > 0 ? 'brightness-75 pointer-events-none' : ' '}`}
                    >
                        {loadingProvider && shippingCart?.cart?.length > 0 ? <div className="absolute w-full h-full z-100 flex justify-center items-center"> <LoadingComponent /> </div> : ''}

                            {/* <div> */}
                                <div>
                                    <div
                                        className='flex justify-between items-center p-4 bg-white z-[4] border-b border-[rgba(0,0,0,0.08)]'>
                                        <div className='text-2xl leading-8 font-bold text-[#31353c]'>
                                            {TransClient('filter.cart')}
                                            {/* filter */}
                                        </div>
                                            <svg
                                                onClick={() => {
                                                    close();
                                                    // router.refresh()
                                                }}
                                                width='24'
                                                height='24'
                                                viewBox='0 0 24 24'
                                                fill='none'
                                                xmlns='http://www.w3.org/2000/svg'
                                                className='flex-grow-0 flex-shrink-0 w-6 h-6 cursor-pointer'
                                                preserveAspectRatio='xMidYMid meet'
                                            >
                                                <path
                                                    fill-rule='evenodd'
                                                    clip-rule='evenodd'
                                                    d='M19.0708 5.98931C19.3637 5.69642 19.3637 5.22155 19.0708 4.92865C18.7779 4.63576 18.303 4.63576 18.0101 4.92865L11.9997 10.939L5.98936 4.92866C5.69647 4.63577 5.22159 4.63577 4.9287 4.92866C4.63581 5.22156 4.63581 5.69643 4.9287 5.98932L10.9391 11.9997L4.92865 18.0101C4.63576 18.303 4.63576 18.7779 4.92865 19.0708C5.22155 19.3637 5.69642 19.3637 5.98931 19.0708L11.9997 13.0604L18.0102 19.0708C18.3031 19.3637 18.7779 19.3637 19.0708 19.0708C19.3637 18.7779 19.3637 18.303 19.0708 18.0101L13.0604 11.9997L19.0708 5.98931Z'
                                                    fill='#31353C'
                                                ></path>
                                            </svg>
                                    </div>
                                    <div
                                        className={`z-[20] fixed top-15 w-full bg-white border-b-[1px] `}
                                    >
                                        <Offer items={shippingCart} />
                                    </div>
                                </div>
                                <div className='h-[100vh] pt-10 flex justify-center swiper-cart-height bg-[white]'>
                                    {/*{true && <LoadingComponent />}*/}
                                    <div
                                        className={` flex flex-col justify-center items-center relative gap-6`}
                                    >

                                        {/*{shippingCart?.cart?.length > 0 && (*/}
                                            <>
                                                <ShowItemsInCart
                                                    onCLose={() => {
                                                        close();
                                                    }}
                                                    items={shippingCart?.cart}
                                                    shippingCart={shippingCart}
                                                    showCoupon={showCoupon}
                                                />
                                                <div className='after bg-[#f2f2f3]' style={{ height: 54 }} />
                                            </>
                                        {/*)}*/}
                                    </div>
                                </div>
                            {/* </div> */}
                        
                    </div>
                </div>
            </div>
        );
    } else {
        return <></>;
    }
}
