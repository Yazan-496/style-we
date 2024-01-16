'use client';
import { alertService } from 'components/Alert';
import Image from 'helpers/image';

function HomeSection({ homeSectionArr }) {
    function handleGetUrl(item) {
        let updatedUrl = item.url.replace(
            /https?:\/\/www\.clearance\.ae\/?/g,
            '/'
        );
        if (updatedUrl.includes('www.clearance.ae')) {
            updatedUrl = item.url.replace('www.clearance.ae', '/');
        }
        if (item.resource_type === 'brand') {
            updatedUrl = `/products/brands=${item.resource_id}`;
        }
        if (item.resource_type === 'flash_deals') {
            updatedUrl = `/all-flash-deals`;
        }
        if (item.resource_type === 'product') {
            updatedUrl = `/product/${item.resource_slug}`;
        }
        if (item.resource_type === 'search') {
            updatedUrl = `/products/search_text=${item.search_keyword}`;
        }
        if (item.resource_type === 'category') {
            updatedUrl = `/products/category=${item.resource_slug}`;
        }
        return updatedUrl;
    }

    return (
        <>
            <button
                className="btn btn-success m-1"
                onClick={() =>
                    alertService.success('Success!!', {
                        id: 1,
                        autoClose: 10000,
                    })
                }
            >
                Success
            </button>
            {homeSectionArr.map((sectionContent, index) => (
                <div
                    key={sectionContent.id}
                    className={`block xl:hidden w-full flex justify-between pt-1 ${
                        index === 2 ? 'mt-1' : 'mt-0'
                    }`}
                >
                    {sectionContent.hs_banner.map((content) => (
                        <a
                            key={content.id}
                            href={handleGetUrl(content)}
                            rel="noopener noreferrer"
                            className="bg-gray-100 xl:ml-0 xl:mr-0 xl:w-48 2xl:w-[234px] 3xl:w-[272px] flex flex-col items-center justify-start gap-y-4 uppercase w-1/2"
                        >
                            <div className=" relative aspect-[30/53] md:aspect-[40/53] w-full lg:aspect-[16/20]">
                                <Image
                                    loading={'eager'}
                                    fill
                                    className="object-fit"
                                    src={content.photo}
                                    alt={`Image for ${content.name}`}
                                />
                            </div>
                        </a>
                    ))}
                </div>
            ))}
        </>
    );
}

export default HomeSection;
