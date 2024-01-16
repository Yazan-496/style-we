"use client"

import React, {useEffect, useState} from "react";
import {toast} from "react-toastify";


export const ShowNotificationServer = async (type, response ) => {
    let message = await response?.message

    const ToastTransition = ({ closeToast, children, ...props }) => {
        const [Opacity, setOpacity] = useState(true);
        const [hidden, setHidden] = useState(false);

        useEffect(() => {
            const timer = setTimeout(() => {
                setOpacity(false);
                toast.dismiss();
            }, 3000);

            return () => clearTimeout(timer);
        }, [closeToast, children]);
        useEffect(() => {
            const timer = setTimeout(() => {
                setHidden(true);
                toast.dismiss();
            }, 3000);

            return () => clearTimeout(timer);
        }, [Opacity]);
        return (
            <div className="custom-toast">
                {children}
                <style jsx>{`
        .custom-toast {
          position: relative;
          display: ${hidden ? "none" : "flex"};
          align-items: center;
          justify-content: flex-start;
          text-align: center;
          color: #fff;
          flex-wrap: wrap;
          padding: 10px;
          border-radius: 4px;
          opacity: ${Opacity ? 0.8 : 0};
          transition: opacity 300ms;
          //width: max-content;
          width: fit-content;
        }
      `}</style>
            </div>
        );
    };

    const Style = {
        position: "fixed",
        zIndex: "111111111111",
        top: "50%",
        left: "50%",
        backgroundColor: "#000",
        color: "#fff",
        padding: "10px",
        borderRadius: "4px",
        opacity: "0.8",
        display: "flex",
        flexWrap: "wrap",
        alignItems: "center",
        justifyContent: "flex-start",
        transform: "translate(-50%, 0%)",
        textAlign: "center",
        // width: 'max-content',
        width: "fit-content",
    };
    const toastProps = {
        type,
        className: "toast",
        toastStyle: Style,
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: false,
        newestOnTop: false,
        rtl: false,
        transition: ToastTransition,
        pauseOnHover: false,
        draggable: false,
        progress: false,
    };

    toast(message, { ...toastProps, style: Style });

};
export const ShowConsoleServer = async (data, text ) => {
    // console.log(process.env.NEXT_PUBLIC_SERVER_SIDE_CONSOLE, 'NEXT_PUBLIC_SERVER_SIDE_CONSOLE')
    if (process.env.NEXT_PUBLIC_SERVER_SIDE_CONSOLE === 'true'){
        console.log(`${text} : `, data)
    }
};

