"use client";
import React, { useEffect, useRef, useState } from "react";
import OneTimer from "./endsInOneTimer";
import { useTranslation } from "react-i18next";

export default function EndsIn({ translations, time }) {
  const Ref = useRef(null);

  // The state for our timer
  const [timer, setTimer] = useState("00:00:00:00");
  const getTimeRemaining = (e) => {
    const total = Date.parse(e) - Date.parse(new Date());
    const seconds = Math.floor((total / 1000) % 60);
    const minutes = Math.floor((total / 1000 / 60) % 60);
    const hours = Math.floor((total / 1000 / 60 / 60) % 24);
    const days = Math.floor(total / 1000 / 60 / 60 / 24);
    return {
      total,
      days,
      hours,
      minutes,
      seconds,
    };
  };
  const startTimer = (e) => {
    let { total, days, hours, minutes, seconds } = getTimeRemaining(e);
    if (total >= 0) {
      // update the timer
      // check if less than 10 then we need to
      // add '0' at the beginning of the variable
      setTimer(
        (days > 9 ? days : "0" + days) +
          ":" +
          (hours > 9 ? hours : "0" + hours) +
          ":" +
          (minutes > 9 ? minutes : "0" + minutes) +
          ":" +
          (seconds > 9 ? seconds : "0" + seconds)
      );
    }
  };
  const clearTimer = (e) => {
    // If you adjust it you should also need to
    // adjust the Endtime formula we are about
    // to code next
    setTimer("00:00:00:00");

    // If you try to remove this line the
    // updating of timer Variable will be
    // after 1000ms or 1sec
    if (Ref.current) clearInterval(Ref.current);
    Ref.current = setInterval(() => {
      // startTimer(e);
      startTimer(time);
    }, 1000);
  };
  const getDeadTime = () => {
    let deadline = new Date();

    // This is where you need to adjust if
    // you entend to add more time
    deadline.setSeconds(deadline.getSeconds() + time);
    return deadline;
  };

  // We can use useEffect so that when the component
  // mount the timer will start as soon as possible

  // We put empty array to act as componentDid
  // mount only
  useEffect(() => {
    clearTimer(getDeadTime());
  }, []);

  const { t, i18n } = useTranslation("translation");
  return (
    <div className="flex items-center justify-center">
      <p className="asdewqeq">
        <span className="flex items-center gap-1.5">
          <span className="text-2xl font-bold mr-[6px] text-[#31353c]">
            {t("main.ends_in")}
          </span>
          <span className="inline-flex gap-1.5">
            <OneTimer number={parseInt(timer[0])} end={9} />
            <OneTimer number={parseInt(timer[1])} end={9} />
          </span>
          <span className="text-3xl font-bold text-[#31353c]">:</span>
          <span className="inline-flex gap-1.5">
            <OneTimer number={parseInt(timer[3])} end={2} />
            <OneTimer number={parseInt(timer[4])} end={9} />
          </span>
          <span className="text-3xl font-bold text-[#31353c]">:</span>
          <span className="inline-flex gap-1.5">
            <OneTimer number={parseInt(timer[6])} end={5} />
            <OneTimer number={parseInt(timer[7])} end={9} />
          </span>
          <span className="text-3xl font-bold text-[#31353c]">:</span>
          <span className="inline-flex gap-1.5">
            <OneTimer number={parseInt(timer[9])} end={5} />
            <OneTimer number={parseInt(timer[10])} end={9} />
          </span>
        </span>
      </p>
      <svg
        stroke="#31353C"
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        className="scale-x-[-1] ml-3"
      >
        <path d="m20 8-8 8 8 8" strokeWidth="2"></path>
      </svg>
    </div>
  );
}
