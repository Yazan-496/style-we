import React from 'react';

const Checkbox = ({ identifier, label, isChecked, stateData, groupClass = '', onChangeCb }) => {
    return (
        <label
            htmlFor={identifier}
            className={`flex flex-row justify-center items-center gap-2.5 cursor-pointer ${groupClass}`}
        >
            <input
                checked={isChecked}
                name={identifier}
                type='checkbox'
                value={stateData}
                id={identifier}
                onChange={(e) => {
                    onChangeCb(e.target.checked);
                }}
                className='hidden peer'
            />
            <span className='peer-checked:bg-black-primary bg-white w-4 h-4 relative border border-black-primary rounded peer-checked:border-black-primary '>
                <span className='absolute w-2 top-1/2 -translate-y-1/2 left-1 -rotate-45 h-0.5 bg-white rounded-tl-none rounded-full ' />
                <span className='absolute w-1 top-[52%] -translate-y-1/2 left-0.5 rotate-45 h-0.5 bg-white rounded-br-none rounded-full' />
            </span>
            <p className='font-normal text-sm text-black-primary '>{label}</p>
        </label>
    );
};

export default Checkbox;
