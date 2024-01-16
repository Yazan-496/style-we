import { tabs } from 'static';
import Image from 'helpers/image';
import React, { useState } from 'react';
import Button from 'components/base/Button';

const SizeSelectDropDown = () => {
    const [activeTab, setActiveTab] = useState(0);


    return (
        <div className='cartShadow bg-white w-52 absolute bottom-[130%] left-1/2 -translate-x-1/2 '>
            <div className='flex flex-col justify-start items-start gap-y-3 p-3 pb-2 border-b border-ash'>
                <div className='capitalize text-black-primary text-base font-bold'>
                    color:
                </div>
                <div className='h-7 w-7 flex justify-center items-center border border-black-primary rounded-full bg-white'>
                    <span className='h-[22px] w-[22px] rounded-full overflow-hidden relative'>
                        <Image
                            alt=''
                            fill
                            src={
                                'https://sstorage.clearance.ae/production/storage/product/2023-08-04-64ccaafb5233f.png'
                            }
                        />
                    </span>
                </div>
                <span className='text-base font-bold text-black-primary'>Size</span>
                <div className='flex justify-start flex-wrap gap-2'>
                    {tabs.map((tab, index) => (
                        <div
                                ex
                                e={`text-sm leading-4 border  p-1 rounded cursor-pointer ${index === activeTab
                                    ? 'bg-black-primary text-white border-black-primary'
                                    : 'bg-white text-black-primary border-ash'
                                }`}
                            onClick={() => setActiveTab(index)}
                        >
                            {tab}
                        </div>
                    ))}
                </div>
            </div>
            <div className='px-3 py-2'>
                <Button
                    btnText='submit'
                    btnType='submit'
                    btnClass='rounded-sm !py-1 !font-bold'
                 />
            </div>
        </div>
    );
};

export default SizeSelectDropDown;
