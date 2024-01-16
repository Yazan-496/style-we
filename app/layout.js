import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'styles/all.min.css';
import 'styles/globals.css';
import { SpeedInsights } from '@vercel/speed-insights/next';
import CartProvider from 'components/context/CartContext';
import TopHeader from 'components/Layout/TopHeader';
import MobileHeader from 'components/Layout/MobileHeader';
import MiddleHeader from 'components/Layout/MiddleHeader';
import BottomHeader from 'components/Layout/BottomHeader';
import Footer from 'components/Layout/Footer';
import { FetchCart } from 'helpers/actions/fetchServer';
import { cookies } from 'next/headers';
import NextNProgressClient from '../helpers/NextNProgressClient';
import BodyScripts from '../components/bodyScript';
import Download from 'components/Header/desktop/Download';
import { TransServer } from 'helpers/TransServer';
import { headers } from 'next/headers';
import Toast from 'components/Alert/Toast/Toast';

const inter = {
    subsets: ['latin'],
};

const defaultDescription = `<p><strong>${process.env.NEXT_PUBLIC_BASE_TITLE} is the ecommerce version  and the online operational name of Master out`;
const defaultTitle = `Welcome To ${process.env.NEXT_PUBLIC_BASE_TITLE}`;
export const metadata = {
    title: defaultTitle,
    description: defaultDescription,
    icons: {
        icon: '/favicon.ico',
    },
    verification: {
        google: `${process.env.NEXT_PUBLIC_GOOGLE_TAG_MANAGER_ID}`,
        other: {
            'facebook-domain-verification': `${process.env.NEXT_PUBLIC_FACEBOOK_ID}`,
            'tiktok-pixel': `${process.env.NEXT_PUBLIC_TIKTOK_ID}`,
            'smart-look': `${process.env.NEXT_PUBLIC_SMART_LOOK}`,
            'microsoft-clarity': `${process.env.NEXT_PUBLIC_MICROSOFT_CLARITY}`,
        },
    },
};
export default async function RootLayout({ children, params }) {
    const Cookie = cookies();
    let token = Cookie.get('TOKEN_LOCAL_STORAGE');
    let local = Cookie.get('lang')?.value || 'en';
    const pathname = headers().get('x-next-pathname');
    const categoryApiCall = await fetch(
        process.env.NEXT_PUBLIC_BASE_URL_LIVE +
            'api/web_v10/web/home/categories',
        {
            next: { revalidate: 60 },
            headers: { lang: local },
        }
    );
    const categoryResponse = await categoryApiCall.json();
    const categoryArr = categoryResponse.data.categories || [];

    const { shippingCart } =
        pathname === '/' ? [] : token ? await FetchCart() : [];
    return (
        <html lang={local}>
            <body className={inter.className}>
                <Toast />
                <CartProvider shippingCart={shippingCart}>
                    <Download
                        dir={TransServer('user.dir')}
                        available_in={TransServer('user.available_in')}
                        download={TransServer('user.download')}
                    />
                    <TopHeader />
                    <MobileHeader
                        shippingCart={shippingCart}
                        navArr={categoryArr}
                    />
                    <MiddleHeader shippingCart={shippingCart} />
                    <BottomHeader bottomHeaderArr={categoryArr} />

                    <NextNProgressClient />
                    <main className="relative min-h-[95vh] overflow-x-hidden lg:px-5">
                        {/*<div className="absolute">*/}
                        <SpeedInsights />
                        {children}
                        {/*</div>*/}
                    </main>
                    <Footer />
                    <div id="modal-root"></div>
                </CartProvider>
                <BodyScripts />
            </body>
        </html>
    );
}
