import React from "react";

const Button = ({
    btnText,
    icon,
    suffixIcon,
    prefixIcon,
    disabled,
    btnClass = "",
    actionCb,
    btnType = "button",
    variant = "primary",
}) => {
    return (
        <button
            disabled={disabled}
            type={btnType}
            onClick={actionCb}
            className={`font-normal hover:opacity-100 cursor-pointer bg:bg-[#616368] flex justify-center items-center baseBtnClass ${icon ? "px-0 py-0" : ""
                } ${suffixIcon ? "flex gap-x-2" : "" } ${prefixIcon ? "flex gap-x-2" : "" 
                } ${btnText ? "text-sm text-center py-2 px-7" : "" } ${variant === "primary"
                    ? "bg-black-primary text-white"
                    : variant === "outlined"
                        ? "bg-white text-black-primary border border-black-primary"
                        : variant === "naked"
                            ? "text-black-primary bg-white"
                            : variant === "link"
                                ? "text-black-primary bg-white underline"
                                : ""
                } ${disabled ? "opacity-50" : "" } ${btnClass }`}
        >
            {prefixIcon && <i className={`text-sm  ${prefixIcon}`}></i>}
            {icon && <i className={`text-sm ${icon}`}></i>}
            {btnText}
            {suffixIcon && <i className={`text-sm ${suffixIcon}`}></i>}
        </button>
    );
};

export default Button;
