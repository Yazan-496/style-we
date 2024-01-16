import React from 'react';
import LoadingComponent from "components/LoadingComponent/mobile";
import InitialDesktopHeader from 'components/Account/desktop/initialDesktopHeader';


const Loading = () => {
    return (
        <div className="relative bg-gray-50 brightness-80 overflow-hidden min-h-screen">
            <LoadingComponent />
        </div>
    )
};

export default Loading;
