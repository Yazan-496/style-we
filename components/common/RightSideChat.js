"use client";
import React, { useEffect, useState } from 'react';
import { IoLogoWhatsapp } from "react-icons/io";
import { useSelector } from "react-redux";
import store from '../../store';

const RightSideChat = (props) => {
  const [showScroll, setShowScroll] = useState(false);

  const checkScrollTop = () => {
    if (typeof window !== "undefined") {
      // Client-side-only code
      if (!showScroll && window.pageYOffset > 400) {
        setShowScroll(true);
      } else if (showScroll && window.pageYOffset <= 400) {
        setShowScroll(false);
      }
    }
  };
  if (typeof window !== "undefined") {
    // Client-side-only code
    window.addEventListener("scroll", checkScrollTop);
  }
  const footer = useSelector((state) => state?.mainReducer?.footer);

  const [sitting, setSitting] = useState(null);
  const syncSitting = useSelector((state) => state.AuthReducer.syncSitting);
  useEffect(() => {
    let sit = JSON.parse(sessionStorage.getItem('SITTING'));
    if (sit?.sitting) {
      setSitting(sit?.sitting);
    } else {
      sit = JSON.parse(sessionStorage.getItem('SITTING'));
      sit?.sitting && setSitting(sit?.sitting);
    }
    const unsubscribe = store.subscribe(() => {
      const updatedSitting = JSON.parse(sessionStorage.getItem('SITTING'));
      if (updatedSitting?.sitting) {
        setSitting(updatedSitting?.sitting);
      }
    });
    return () => {
      unsubscribe();
    };
  }, [syncSitting]);
  useEffect(() => {
    // console.log(sitting, "sitting")
  }, [sitting])
  return (
    <>
      {/*<div className="z-[50] overflow-hidden fixed  left-[10%] bottom-[10%] cursor-pointer">*/}
      {/*    <span className="cursor-pointer flex items-center justify-center w-[50px] h-[50px] rounded-full bg-white">*/}
      {/*        <a*/}
      {/*          target="_blank"*/}
      {/*          href={`https://api.whatsapp.com/send?phone=${footer?.company_whatsApp_phone*/}
      {/*          }&text=${footer?.Default_whatsapp_message}`}*/}
      {/*        >  <IoLogoWhatsapp color={"green"} size={70} />*/}
      {/*        </a>*/}
      {/*      </span>*/}
      {/*</div>*/}
      <div className="hidden z-[50] overflow-hidden fixed right-0 bottom-[96px] cursor-pointer">
        <div className="w-[48px] h-[48px] flex items-center justify-center bg-black/70 hover:bg-black/60 active:bg-black/80">
          <a
            href={`https://api.whatsapp.com/send?phone=${footer?.company_whatsApp_phone
            }&text=${footer?.Default_whatsapp_message}`}
          >  <IoLogoWhatsapp color={"green"} size={40} />
          </a>
        </div>
        <div className="w-full h-[1px] bg-black/20" />
        <div className="w-[48px] h-[48px] flex items-center justify-center bg-black/70 hover:bg-black/60 active:bg-black/80">
          <svg
            viewBox="0 0 32 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            color="white"
          >
            <path
              d="M5.067 5.422c0-.196.159-.355.355-.355h21.156c.196 0 .355.159.355.355v17.156c0 .196-.159.355-.355.355H11.177c-.577 0-1.136.2-1.582.568l-3.947 3.248a.356.356 0 0 1-.581-.274V5.422Z"
              stroke="#fff"
              strokeWidth="2.133"
            />
            <circle cx="10.667" cy="14.22" fill="#fff" r="1.466" />
            <circle cx="16" cy="14.22" r="1.466" fill="#fff" />
            <circle cx="21.333" cy="14.22" fill="#fff" r="1.466" />
          </svg>
        </div>
      </div>
      {sitting?.smart_look && <div
          className={`z-[50] overflow-hidden rounded-3xl fixed right-0 bottom-[90px] cursor-pointer w-[48px] h-[48px] flex items-center justify-center bg-white hover:bg-white active:bg-white`}
      >
        <a
            target="_blank"
            href={`https://api.whatsapp.com/send?phone=${sitting && sitting['whatsApp-phone'] && sitting['whatsApp-phone']
            }&text=${sitting?.Default_whatsapp_message}`}
        > <IoLogoWhatsapp color={'green'} size={40} />
        </a>
      </div>}
      {showScroll ? (
        <div
          onClick={() => {
            if (typeof window !== "undefined") {
              window.scrollTo(0, 0);
            }
          }}
          className={`z-[50] overflow-hidden rounded-3xl fixed right-0 bottom-[40px] cursor-pointer w-[48px] h-[48px] flex items-center justify-center bg-white hover:bg-white active:bg-white`}
        >
          <svg
            className="icon-return-top-outline_svg__icon"
            viewBox="0 0 1024 1024"
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
          >
            <path
              d="M933.988 74.956H90.012a38.195 38.195 0 0 1-38.81-37.478C51.203 16.793 68.612 0 90.013 0h843.976c21.401 0 38.81 16.793 38.81 37.478 0 20.685-17.409 37.478-38.81 37.478M880.228 612.041a39.321 39.321 0 0 1-27.801-11.264L505.6 259.275 157.954 598.934a39.936 39.936 0 0 1-54.937.358 36.505 36.505 0 0 1-.46-52.94l375.446-366.846a39.629 39.629 0 0 1 27.648-11.161h.103c10.444 0 20.48 4.096 27.75 11.264l374.474 368.79a36.403 36.403 0 0 1-.614 52.941 39.219 39.219 0 0 1-27.136 10.752"
              fill="#111"
            />
            <path
              d="M505.702 1023.994a38.144 38.144 0 0 1-38.809-37.427V205.823c0-20.736 17.357-37.478 38.81-37.478 21.503 0 38.86 16.742 38.86 37.478v780.744c0 20.633-17.408 37.427-38.86 37.427"
              fill="#111"
            />
          </svg>{" "}
        </div>
      ) : null}
    </>
  );
};

export default RightSideChat;
