'use client';
import Image from 'helpers/image';
import Link from 'helpers/Link';
import React from 'react';
import { useState } from 'react';
import { usePathname } from 'next/navigation';
import Cookie from 'js-cookie';

const FooterPart = ({
    itemArr,
    headingEn,
    headingAe,
    headingClass,
    socialArr,
    contactUsTextEn,
    contactUsTextAe,
    contactUsArr,
    hasBtn,
    groupClass = '',
}) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const path = usePathname();
    let local = process.env.NEXT_PUBLIC_LANG;
    if (typeof window !== 'undefined') {
        local = Cookie.get('lang');
    }

    return (
        <div className={groupClass}>
            <div className='lg:hidden w-full border-b '>
                <button
                    type='button'
                    onClick={() => setIsExpanded(!isExpanded)}
                    className={`w-full flex flex-row justify-between items-center uppercase text-base text-black py-4 ${headingClass}`}
                >
                    <span>{local === 'en' ? headingEn : headingAe}</span>
                    <i className='fas fa-plus text-sm'></i>
                </button>
                <div className='pl-4 flex flex-col justify-start gap-y-1'>
                    {isExpanded &&
                        itemArr?.map((item, id) => (
                            <Link
                                key={id}
                                href={item.url}
                                className='py-2 text-sm text-gray'
                            >
                                {local === 'en' ? item.titleEn : item.titleAe}
                            </Link>
                        ))}
                    {isExpanded && contactUsTextEn && (
                        <p className='text-sm font-bold text-black uppercase '>
                            {local === 'en' ? contactUsTextEn : contactUsTextAe}
                        </p>
                    )}
                    {isExpanded && contactUsArr && (
                        <div className='flex flex-col text-black text-sm gap-y-1'>
                            {isExpanded &&
                                contactUsArr?.map((item, id) => (
                                    <Link key={id} href={item.url} className='text-xs'>
                                        <i className={`${item.icon} mr-1.5`}></i>
                                        {local === 'en' ? item.titleEn : item.titleAe}
                                    </Link>
                                ))}
                        </div>
                    )}
                    {isExpanded && socialArr && (
                        <div className='flex gap-x-4 p-2'>
                            {socialArr?.map((item, id) => (
                                <Link
                                    key={id}
                                    href={item.url}
                                    className='text-2xl'
                                >
                                    <i className={`${item.icon}`}></i>
                                </Link>
                            ))}
                        </div>
                    )}
                    {isExpanded && hasBtn && (
                        <div className='flex flex-col justify-center items-start gap-3 '>
                            <Link
                                href='https://apps.apple.com/us/app/clearance-ae/id1637100307'
                                className='rounded overflow-hidden'
                            >
                                <div className='!w-[152px] !h-[50px] bg-black-primary relative'>
                                    <Image
                                        fill
                                        src='https://www.clearance.ae/assets/front-end/png/apple_app.png'
                                        alt=''
                                    />
                                </div>
                            </Link>
                            <Link
                                href='https://play.google.com/store/apps/details?id=ae.clearance.app'
                                className='rounded overflow-hidden'
                            >
                                <div className='!w-[152px] !h-[50px] bg-black-primary relative'>
                                    <Image
                                        fill
                                        src='https://www.clearance.ae/assets/front-end/png/google_app.png'
                                        alt=''
                                    />
                                </div>
                            </Link>
                        </div>
                    )}
                </div>
            </div>
            <h3
                className={`hidden lg:block lg:text-base 2xl:text-lg font-bold text-black uppercase mb-5 ${headingClass}`}
            >
                {local === 'en' ? headingEn : headingAe}
            </h3>
            <div className='hidden lg:flex flex-col justify-start gap-y-3'>
                {itemArr?.map((item, id) => (
                    <Link
                        key={id}
                        href={item.url}
                        className='text-[13px] 2xl:text-sm text-black font-normal leading-5'
                    >
                        {local === 'en' ? item.titleEn : item.titleAe}
                    </Link>
                ))}
                {contactUsTextEn && (
                    <p className='lg:text-base font-bold text-black uppercase '>
                        {local === 'en' ? contactUsTextEn : contactUsTextAe}
                    </p>
                )}
                {contactUsArr && (
                    <div className='flex flex-col text-black text-sm gap-y-1'>
                        {contactUsArr?.map((item, id) => (
                            <Link key={id} href={item.url}>
                                <div>
                                <i className={`${item.icon} mr-1.5`}></i>
                                {local === 'en' ? item.titleEn : item.titleAe}
                                </div>
                            </Link>
                        ))}
                    </div>
                )}
                {socialArr && (
                    <div className='flex gap-x-4 p-2'>
                        {socialArr?.map((item, id) => (
                            <Link
                                key={id}
                                href={item.url}
                                className='text-4xl'
                            >
                                <i className={`${item.icon}`}></i>
                            </Link>
                        ))}
                    </div>
                )}
                {hasBtn && (
                    <div className='flex flex-col justify-center items-start gap-3 '>
                        <Link
                            href='https://apps.apple.com/us/app/clearance-ae/id1637100307'
                            className='rounded overflow-hidden'
                        >
                            <div className='!w-[152px] !h-[50px] bg-black-primary relative'>
                                <Image
                                    fill
                                    src='https://www.clearance.ae/assets/front-end/png/apple_app.png'
                                    alt=''
                                />
                            </div>
                        </Link>
                        <Link
                            href='https://play.google.com/store/apps/details?id=ae.clearance.app'
                            className='rounded overflow-hidden'
                        >
                            <div className='!w-[152px] !h-[50px] bg-black-primary relative'>
                                <Image
                                    fill
                                    src='https://www.clearance.ae/assets/front-end/png/google_app.png'
                                    alt=''
                                />
                            </div>
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
};

export default FooterPart;
