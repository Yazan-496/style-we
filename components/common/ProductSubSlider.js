'use client';
import { productSubSliderData } from 'static';
import Image from 'helpers/image';
import Link from 'helpers/Link';
import React from 'react';
import { useState } from 'react';
import ThirdLevelSlider from './ThirdLevelSlider';

const ProductSubSlider = ({ closeStateCb, subcategoryData, closeActionCb }) => {
    const [thirdLevelView, setThirdLevelView] = useState(false);
    const [showSubSlider, setShowSubSlider] = useState(true);
    const [thirdLevelData, setThirdLevelData] = useState([]);
    const [selectedSubCategoryName, setSelectedSubCategoryName] = useState("");
    // console.log(subcategoryData);
    return (
        <div className='w-full min-h-screen overflow-y-scroll flex flex-col justify-start items-center gap-y-4'>
            <div className='w-full flex justify-start border-b py-4'>
                <button
                    type='button'
                    onClick={closeStateCb}
                    className='px-4 font-normal text-xl'
                >
                    <i className='fas fa-chevron-left text-black-primary'></i>
                </button>
                <span className='font-semibold text-lg uppercase'>
                    {subcategoryData.title}
                </span>
            </div>
            <div className='w-full px-4 flex flex-col justify-start gap-y-4'>
                <div className='flex flex-col justify-start gap-y-2'>
                    {subcategoryData.categoryUrl && (
                        <div className='font-normal flex justify-between items-center text-xs text-gray capitalize'>
                            <span className='font-semibold'>Shop by category</span>
                            <Link onClick={closeActionCb} href={subcategoryData.categoryUrl}>
                                All <i className='fas fa-chevron-right '></i>
                            </Link>
                        </div>
                    )}
                    <div className='flex flex-row justify-start items-start flex-wrap pb-2'>
                        {subcategoryData.data.map((item, id) => (
                            <div key={id} className='w-full flex flex-row justify-between items-center  py-4 border-b last:border-0'>
                                <Link
                                    className='w-full flex flex-row justify-between items-center uppercase text-base text-black py-4 last:border-0'
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
                                {item?.childes?.length > 0 && (
                                    <button
                                        onClick={() => {
                                            setSelectedSubCategoryName(item?.name);
                                            setThirdLevelData(item.childes);
                                            setShowSubSlider(false);
                                            setThirdLevelView(true);
                                        }}
                                        type='button'
                                        className="flex justify-between items-center w-fit"
                                    >
                                        <i className='fa-solid fa-chevron-right text-xs pr-4'></i>
                                    </button>
                                )}
                            </div>
                        ))}
                    </div>
                    {thirdLevelView && (
                        <div
                            className={`slideIn absolute w-full origin-right bg-white transition-all duration-1000 z-50 top-0 ${thirdLevelView ? 'translate-x-0' : 'translate-x-full'
                                }`}
                        >
                        <ThirdLevelSlider
                            subCategoryName={selectedSubCategoryName}
                            data={thirdLevelData}
                            closeActionCb={()=>{
                                closeActionCb();
                                setThirdLevelView((!thirdLevelView))
                            }}
                        />
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ProductSubSlider;
