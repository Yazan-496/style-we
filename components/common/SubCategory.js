import Link from 'helpers/Link';
import React, { useState } from 'react';

const SubCategory = ({
    itemArr,
    heading,
    headingClass,
    groupClass = '',
    slug,
    categorySlug,
}) => {
    let url = slug.split('_');
    url = url[0];
    const [isExpanded, setIsExpanded] = useState(false);
    return (
        <div className={groupClass}>
            <div className='lg:hidden w-full border-b '>
                <button
                    type='button'
                    onClick={() => setIsExpanded(!isExpanded)}
                    className={`w-full flex flex-row justify-between items-center uppercase text-base text-black py-4 ${headingClass}`}
                >
                    <Link
                        href={
                            `/products/category=${categorySlug?.name}-${slug}&page=1` ||
                            ''
                        }
                    >
                        <span>{heading}</span>
                    </Link>
                    <i className='fas fa-plus text-sm'></i>
                </button>
                <div className='pl-4 flex flex-col justify-start gap-y-1'>
                    {isExpanded &&
                        itemArr?.map((item, id) => (
                            <Link
                                key={id}
                                href={
                                    `/products/category=${categorySlug?.name}-${url}&page=1` ||
                                    '/'
                                }
                                className='py-2 text-sm text-gray'
                            >
                                {item.name}
                            </Link>
                        ))}
                </div>
            </div>
            {/* mobile & tab only */}
            <Link
                href={
                    `/products/category=${categorySlug?.name}-${slug}&page=1` ||
                    ''
                }
            >
                <h3
                    className={`hidden lg:block lg:text-base 2xl:text-lg font-bold text-black uppercase mb-5 ${headingClass}`}
                >
                    {heading}
                </h3>
            </Link>
            <div className='hidden lg:flex flex-col justify-start gap-y-3'>
                {itemArr?.map((item, id) => (
                    <Link
                        key={id}
                        href={
                            `/products/category=${categorySlug?.name}-${url}-${item.slug}&page=1` ||
                            ''
                        }
                        className='text-[13px] 2xl:text-sm text-black font-normal leading-5'
                    >
                        {item.name}
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default SubCategory;
