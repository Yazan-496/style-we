import Banner from 'components/Pages/HomePage/Banner';
import FlashSale from 'components/Pages/HomePage/FlashSale';
import HomeSection from 'components/home/HomeSection';
import HomeSectionDesktop from 'components/home/HomeSectionDesktop';
import VerticalImage from 'components/common/VerticalImage';
import LoadFeatureProducts from '../../components/Pages/HomePage/LoadFeatureProduct';
import { cookies } from 'next/headers';
const MainPageDesktop = async ({ lang = cookies().get('lang')?.value }) => {
    const bannerApiCall = await fetch(
        process.env.NEXT_PUBLIC_BASE_URL_LIVE +
            'api/web_v10/web/home/main-banner',
        {
            // cache: 'force-cache',
            next: { revalidate: 60 },
            headers: { lang },
        }
    );
    const bannerResponse = await bannerApiCall.json();
    const mainBannerArr = bannerResponse.data.main_banners || [];

    const footerBannerApiCall = await fetch(
        process.env.NEXT_PUBLIC_BASE_URL_LIVE +
            'api/web_v10/web/home/footer-banner',
        {
            next: { revalidate: 60 },
        }
    );
    const footerBannerResponse = await footerBannerApiCall.json();
    const footerBannerArr = footerBannerResponse.data.footer_banners || [];

    const flashDealsApiCall = await fetch(
        process.env.NEXT_PUBLIC_BASE_URL_LIVE +
            'api/web_v10/web/home/flashDeals',
        {
            next: { revalidate: 60 },
            headers: { lang },
        }
    );
    const flashDealsResponse = await flashDealsApiCall.json();
    const flashDealsArr = flashDealsResponse.data.flash_deals_products || [];

    const featureProductApiCall = await fetch(
        process.env.NEXT_PUBLIC_BASE_URL_LIVE +
            'api/web_v10/web/home/feature-product',
        {
            next: { revalidate: 60 },
        }
    );
    const featureProductResponse = await featureProductApiCall.json();
    const featureProductArr =
        featureProductResponse.data.featured_products || [];
    const HomeSectionApiCall = await fetch(
        process.env.NEXT_PUBLIC_BASE_URL_LIVE +
            'api/web_v10/web/home/home-sections?category_slug=web-home-section_333',
        {
            next: { revalidate: 60 },
        }
    );
    const HomeSectionResponse = await HomeSectionApiCall.json();
    const HomeSectionArr = HomeSectionResponse.data.sections || [];
    const HomeSectionDesktopApiCall = await fetch(
        process.env.NEXT_PUBLIC_BASE_URL_LIVE +
            'api/web_v10/web/home/home-sections?category_slug=web-home-section-desktop_334',
        {
            next: { revalidate: 60 },
        }
    );
    const HomeSectionDesktopResponse = await HomeSectionDesktopApiCall.json();
    const HomeSectionDesktopArr =
        HomeSectionDesktopResponse.data.sections || [];
    return (
        <>
            <Banner imgArr={mainBannerArr} />
            <HomeSection homeSectionArr={HomeSectionArr} />
            <HomeSectionDesktop homeSectionDesktopArr={HomeSectionDesktopArr} />
            <FlashSale flashSaleArr={flashDealsArr} />
            <div className="max-w-full container flex flex-wrap flex-row justify-center gap-5 ">
                {footerBannerArr.map((item) => (
                    <VerticalImage
                        key={item.id}
                        img={item.photo}
                        item={item}
                        className="w-full bg-ash xl:w-[614px] 2xl:w-[738px] 3xl:w-[880px] aspect-[851/479] object-contain"
                    />
                ))}
            </div>
            <LoadFeatureProducts initialItems={featureProductArr} />
        </>
    );
};

export default MainPageDesktop;
