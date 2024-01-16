import React, { useState } from 'react';
import Link from 'helpers/Link';

function ThirdLevelSlider({ data, closeActionCb, setShowSubSlider, subCategoryName }) {
    const [view, setView] = useState(true);
    const handleCategoryClick = () => {
        closeActionCb(); 
        setView(false);
    };
    if (!view) return null;

    return (
        <div className='w-full min-h-screen overflow-y-scroll flex flex-col justify-start items-center gap-y-4'>
            <div className='w-full flex justify-start border-b py-4'>
                <button
                    type='button'
                    onClick={handleCategoryClick}
                    className='px-4 font-normal text-xl'
                >
                    <i className='fas fa-chevron-left text-black-primary'></i>
                </button>
                <span className='font-semibold text-lg uppercase'>
                    {subCategoryName}
                </span>
            </div>
            {data.map((item, id) => (
                <Link
                    className='w-full flex flex-row justify-between items-center uppercase text-base text-black py-4 border-b last:border-0'
                    href={`/products/category=${item?.slug}`}
                    key={id}>
                    <button
                        onClick={closeActionCb}
                        type='button'
                        className="flex justify-between items-center w-full"
                    >
                        <span>{item?.name}</span>
                    </button>
                </Link>
            ))}
        </div>
    );
}

export default ThirdLevelSlider;
