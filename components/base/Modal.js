import React, { useEffect, useRef, useState } from "react";
import Button from "./Button";

const Modal = ({ title, children, closeCb, visible, modalClass }) => {
    const modalBody = useRef(null);

    useEffect(() => {
        function handleClickOutside(event) {
            if (modalBody.current && !modalBody.current.contains(event.target)) {
                closeCb();
            }
        }
        // Bind the event listener
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            // Unbind the event listener on clean up
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [modalBody, closeCb]);

    return (
        <section
            className={`w-screen h-screen inset-0 flex justify-center items-center transition bg-[#000000]/30 duration-300 delay-150 ${visible ? "opacity-100 z-50 fixed" : "hidden opacity-0"
                } `}
        >
            <div
                ref={modalBody}
                className={`overflow-y-auto rounded-md flex flex-col bg-white transition-all duration-300 delay-100 ${visible ? "opacity-100" : "opacity-0"
                    } ${modalClass} `}
            >
                <div className="w-full sticky bg-white z-10 top-0 flex flex-row justify-between px-4 items-center pt-3">
                    <div className="capitalize text-black-primary text-lg font-semibold leading-[22px] ">
                        {title}
                    </div>
                    <div className="">
                        <Button
                            icon="fas fa-times !text-xl lg:!text-2xl !text-center !text-black-primary"
                            btnClass="!w-7 !h-7 !rounded-full !flex !justify-center !items-center"
                            actionCb={closeCb}
                            variant="naked"
                            btnType="button"
                        />
                    </div>
                </div>
                {/* header ends */}
                {children}
            </div>
        </section>
    );
};

export default Modal;
