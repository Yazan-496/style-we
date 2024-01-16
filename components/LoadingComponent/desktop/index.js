import React from "react";

const LoadingComponent = ({ small }) => {
  return (
    <div
      className={`flex w-full ${
        small ? "" : "min-w-[300px] lg:min-w-[600px]  lg:min-h-[600px]"
      } h-full justify-center items-center`}
    >
      <svg
        className="loading_svg__lds-spinner"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="xMidYMid"
        width={100}
        height={100}
        style={{ background: "0px 0px" }}
      >
        <rect
          x={47}
          y={24}
          rx="9.4"
          ry="4.8"
          width={6}
          height={12}
          fill="#5c5c5c"
        >
          <animate
            attributeName="opacity"
            values="1;0"
            keyTimes="0;1"
            dur="1s"
            begin="-0.9166666666666666s"
            repeatCount="indefinite"
          />
        </rect>
        <rect
          x={47}
          y={24}
          rx="9.4"
          ry="4.8"
          width={6}
          height={12}
          fill="#5c5c5c"
          transform="rotate(30 50 50)"
        >
          <animate
            attributeName="opacity"
            values="1;0"
            keyTimes="0;1"
            dur="1s"
            begin="-0.8333333333333334s"
            repeatCount="indefinite"
          />
        </rect>
        <rect
          x={47}
          y={24}
          rx="9.4"
          ry="4.8"
          width={6}
          height={12}
          fill="#5c5c5c"
          transform="rotate(60 50 50)"
        >
          <animate
            attributeName="opacity"
            values="1;0"
            keyTimes="0;1"
            dur="1s"
            begin="-0.75s"
            repeatCount="indefinite"
          />
        </rect>
        <rect
          x={47}
          y={24}
          rx="9.4"
          ry="4.8"
          width={6}
          height={12}
          fill="#5c5c5c"
          transform="rotate(90 50 50)"
        >
          <animate
            attributeName="opacity"
            values="1;0"
            keyTimes="0;1"
            dur="1s"
            begin="-0.6666666666666666s"
            repeatCount="indefinite"
          />
        </rect>
        <rect
          x={47}
          y={24}
          rx="9.4"
          ry="4.8"
          width={6}
          height={12}
          fill="#5c5c5c"
          transform="rotate(120 50 50)"
        >
          <animate
            attributeName="opacity"
            values="1;0"
            keyTimes="0;1"
            dur="1s"
            begin="-0.5833333333333334s"
            repeatCount="indefinite"
          />
        </rect>
        <rect
          x={47}
          y={24}
          rx="9.4"
          ry="4.8"
          width={6}
          height={12}
          fill="#5c5c5c"
          transform="rotate(150 50 50)"
        >
          <animate
            attributeName="opacity"
            values="1;0"
            keyTimes="0;1"
            dur="1s"
            begin="-0.5s"
            repeatCount="indefinite"
          />
        </rect>
        <rect
          x={47}
          y={24}
          rx="9.4"
          ry="4.8"
          width={6}
          height={12}
          fill="#5c5c5c"
          transform="rotate(180 50 50)"
        >
          <animate
            attributeName="opacity"
            values="1;0"
            keyTimes="0;1"
            dur="1s"
            begin="-0.4166666666666667s"
            repeatCount="indefinite"
          />
        </rect>
        <rect
          x={47}
          y={24}
          rx="9.4"
          ry="4.8"
          width={6}
          height={12}
          fill="#5c5c5c"
          transform="rotate(210 50 50)"
        >
          <animate
            attributeName="opacity"
            values="1;0"
            keyTimes="0;1"
            dur="1s"
            begin="-0.3333333333333333s"
            repeatCount="indefinite"
          />
        </rect>
        <rect
          x={47}
          y={24}
          rx="9.4"
          ry="4.8"
          width={6}
          height={12}
          fill="#5c5c5c"
          transform="rotate(240 50 50)"
        >
          <animate
            attributeName="opacity"
            values="1;0"
            keyTimes="0;1"
            dur="1s"
            begin="-0.25s"
            repeatCount="indefinite"
          />
        </rect>
        <rect
          x={47}
          y={24}
          rx="9.4"
          ry="4.8"
          width={6}
          height={12}
          fill="#5c5c5c"
          transform="rotate(270 50 50)"
        >
          <animate
            attributeName="opacity"
            values="1;0"
            keyTimes="0;1"
            dur="1s"
            begin="-0.16666666666666666s"
            repeatCount="indefinite"
          />
        </rect>
        <rect
          x={47}
          y={24}
          rx="9.4"
          ry="4.8"
          width={6}
          height={12}
          fill="#5c5c5c"
          transform="rotate(300 50 50)"
        >
          <animate
            attributeName="opacity"
            values="1;0"
            keyTimes="0;1"
            dur="1s"
            begin="-0.08333333333333333s"
            repeatCount="indefinite"
          />
        </rect>
        <rect
          x={47}
          y={24}
          rx="9.4"
          ry="4.8"
          width={6}
          height={12}
          fill="#5c5c5c"
          transform="rotate(330 50 50)"
        >
          <animate
            attributeName="opacity"
            values="1;0"
            keyTimes="0;1"
            dur="1s"
            begin="0s"
            repeatCount="indefinite"
          />
        </rect>
      </svg>
    </div>
  );
};

export default LoadingComponent;