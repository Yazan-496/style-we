'use client';

import Link from 'next/link';
import { useCallback, useEffect, useState } from 'react';
import Cookies from 'js-cookie';

const LinkComponent = ({
                           href,
                           children,
                           skipLocaleHandling,
                           className,
                           ...rest
                       }) => {
    // const handleClick = () => {
    //     Cookies.set('LOADING', true);
    //     setTimeout(() => {
    //         Cookies.set('LOADING', false);
    //     }, 5000);
    // };
    return (
        // <div onClick={() => handleClick()}>
            <Link className={className} href={href} {...rest} prefetch={false}
            >
                {children}
            </Link>
        // </div>
    );
};

export default LinkComponent;
