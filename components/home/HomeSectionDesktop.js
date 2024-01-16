import React from 'react';
import Image from "next/image";
function handleGetUrl(item) {
    const base_url = process.env.NEXT_PUBLIC_BASE_URL
    let updatedUrl = item.url.replace(/https?:\/\/www\.clearance\.ae\/?/g, "/");
    if (updatedUrl.includes("www.clearance.ae")) {
    updatedUrl = item.url.replace("www.clearance.ae", "/");
    }
    if (item.resource_type === "brand") {
    updatedUrl = `/products/brands=${item.resource_id}`;
    }
    if (item.resource_type === "flash_deals") {
    updatedUrl = `/all-flash-deals`;
    }
    if (item.resource_type === "product") {
    updatedUrl = `/product/${item.resource_slug}`;
    }
    if (item.resource_type === "search") {
    updatedUrl = `/products/search_text=${item.search_keyword}`;
    }
    if (item.resource_type === "category") {
    updatedUrl = `/products/category=${item.resource_slug}`;
    }
    // updatedUrl = updatedUrl.replace("?","");
    return updatedUrl;
}

function HomeSectionDesktop({ homeSectionDesktopArr }) {
    return (
        <>
            {homeSectionDesktopArr.map((sectionContent, index) => (
                index === 0 ? (
                    <div key={sectionContent.id} className="hidden px-2 xl:flex xl:items-center xl:justify-between">
                        {sectionContent.hs_banner.map((content) => (
                            <a
                                key={content.id}
                                href={handleGetUrl(content)}
                                rel="noopener noreferrer"
                                className="xl:ml-0 xl:mr-0 xl:w-48 2xl:w-[234px] 3xl:w-[272px] flex flex-col items-center justify-start gap-y-4 uppercase w-full"
                            >
                                <div className="relative md:aspect-[40/53] w-full aspect-[40/53]">
                                    <Image
                                        fill
                                        className="absolute h-full w-full left-0 top-0 right-0 bottom-0 text-transparent object-contain"
                                        src={content.photo}
                                        alt={`Image for ${content.name}`}
                                    />
                                </div>
                            </a>
                        ))}
                    </div>
                ) : (
                    <div key={sectionContent.id} className="hidden w-full xl:flex flex-row justify-between mt-1 md:mt-4 xl:mt-5 gap-1 md:gap-2">
                        {sectionContent.hs_banner.map((content) => (
                            <a
                                key={content.id}
                                href={handleGetUrl(content)}
                                rel="noopener noreferrer"
                                className="w-[50%] relative pl-6 aspect-[7/8] overflow-hidden"
                            >
                                <div className="relative md:aspect-[40/53] w-full aspect-[40/53]">
                                    <Image
                                        fill
                                        className="absolute h-fit w-full left-0 top-0 right-0 bottom-0 text-transparent object-contain"
                                        src={content.photo}
                                        alt={`Image for ${content.name}`}
                                    />
                                </div>
                            </a>
                        ))}
                    </div>
                )
            ))}
        </>
    );
}

export default HomeSectionDesktop;