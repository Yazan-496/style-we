'use client';

import React, { useEffect } from 'react';
import { useParams } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import HTMLRenderer from 'helpers/HTMLRenderer';
import RightSideChat from 'components/common/RightSideChat';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from 'store';

const PageFooter = () => {
    const dispatch = useDispatch();
    const content = useSelector((state) => state?.mainReducer?.footerPage);
    const loading = useSelector((state) => state?.mainReducer?.loading);
    const param = useParams();
    const { page } = param;
    const mainCategories = useSelector(
        (state) => state.mainReducer.mainCategories
    );
    const mainPageData = useSelector((state) => state.mainReducer.mainPageData);
    useEffect(() => {
        dispatch({ type: 'GET_CONTENT_FOOTER', payload: { page } });
    }, [page]);
    return (
        <div className="relative w-full lg:min-w-[1024px]">
            <div className="pt-3 lg:pt-[150px]">
                <div className="flex items-center justify-center">
                    {!loading && <h1>{content?.title}</h1>}
                </div>

                <div className="p-10">
                    {content?.content && <HTMLRenderer htmlContent={content?.content} />}
                </div>
            </div>
            {/* <RightSideChat /> */}
        </div>
    );
};

const PageFooterWithRedux = () => (
    <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
            <PageFooter />
        </PersistGate>
    </Provider>
);

export default PageFooterWithRedux;
