'use client';
import { persistor, store } from 'store';
import { useEffect, useState, useRef } from 'react';
import i18n from 'i18n';
import { useRouter } from 'next/navigation';
import 'react-toastify/dist/ReactToastify.css';
import { I18nextProvider } from 'react-i18next';
import { Provider } from 'react-redux';
// import { ToastContainer } from 'react-toastify';

import { PersistGate } from 'redux-persist/integration/react';
import Register from './_register';
import TokenComponent from './token';

export const usePrevious = (value) => {
    const ref = useRef();
    useEffect(() => {
        ref.current = value;
    });
    return ref.current;
};

export default function App({ children }) {
    const router = useRouter();
    const [showRegister, setShowRegister] = useState(false);
    useEffect(() => {
        const language = i18n.language;
        const savedLanguage = localStorage.getItem('language');
        if (language && language !== savedLanguage) {
            localStorage.setItem('language', language);
            i18n.changeLanguage(language);
            router.refresh();
        }
    }, [router]);
    useEffect(() => {
        // Use a setTimeout to wait for 5 seconds before showing <Register />
        const timer = setTimeout(() => {
            setShowRegister(true);
        }, 10000);

        // Clear the timer when the component unmounts
        return () => {
            clearTimeout(timer);
        };
    }, []);
    return (
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <TokenComponent />
                {showRegister && <Register />}
                <I18nextProvider i18n={i18n}>
                    {/* <Nav /> */}
                    {children}

                    {/* <ToastContainer
                        position="bottom-right"
                        bodyStyle={{ width: 'max-content' }}
                        style={{ width: 'max-content', minWidth: '350px' }}
                    /> */}
                </I18nextProvider>
            </PersistGate>
        </Provider>
    );
}
