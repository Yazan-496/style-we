import NextTopLoader from 'nextjs-toploader';
import Loading from "../app/(main)/loading"
import React from 'react';
const NextNProgressClient = () => {
    return (
        <NextTopLoader
            color="red"
            initialPosition={0.08}
            crawlSpeed={200}
            height={4}
            crawl={true}
            showSpinner={true}
            easing="ease"
            speed={200}
            shadow="0 0 10px #c58585,0 0 5px #c58585"
            template={`<div class="bar" role="bar"><div class="peg"></div></div> 
            <div class="spinner fixed z-100 h-full w-full flex items-center justify-center" role="spinner">
            
      <div class="opacity-50 bg-black/50 rounded-[8px] aspect-[1/1] w-[100px] h-[100px] flex items-center justify-center">
        <svg
          color="beige"
          width="50"
          height="50"
          viewBox="0 0 200 200"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="spinner-secondHalf">
              <stop offset="0%" stop-opacity="0" stop-color="currentColor" />
              <stop offset="100%" stop-opacity="0.5" stop-color="currentColor" />
            </linearGradient>
            <linearGradient id="spinner-firstHalf">
              <stop offset="0%" stop-opacity="1" stop-color="currentColor" />
              <stop offset="100%" stop-opacity="0.5" stop-color="currentColor" />
            </linearGradient>
          </defs>

          <g stroke-width="8">
            <path
              stroke="url(#spinner-secondHalf)"
              d="M 4 100 A 96 96 0 0 1 196 100"
            />
            <path
              stroke="url(#spinner-firstHalf)"
              d="M 196 100 A 96 96 0 0 1 4 100"
            />

            <path
              stroke="currentColor"
             stroke-linecap="round"
              d="M 4 100 A 96 96 0 0 1 4 98"
            />
          </g>

          <animateTransform
            from="0 0 0"
            to="360 0 0"
            attributeName="transform"
            type="rotate"
            repeatCount="indefinite"
            dur="1300ms"
          />
        </svg>
      </div>
            
</div>`}
            zIndex={1600}
        />
    );
}
export default NextNProgressClient;
