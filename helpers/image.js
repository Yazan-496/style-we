'use client'

import Image from 'next/image';
import React from 'react';

const ImageComponent = ({ children, className, loader, ...rest }) => {
    return (
        <>
            <Image
                unoptimized={process.env.NEXT_PUBLIC_OPTIMIZE_IMAGES === "false" ? true : false}
                className={` transition-opacity ${loader ? 'opacity-0' : 'opacity-1' }  duration-[2s] ${className}`}
                onLoadingComplete={(image) =>
                    loader && image.classList.remove('opacity-0')
                }
                {...rest}
            >
                {children}
            </Image>
        </>
    );
};

export default ImageComponent;
