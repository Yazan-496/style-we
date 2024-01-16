import FlipClockCountdown from "@leenguyen/react-flip-clock-countdown";
import "@leenguyen/react-flip-clock-countdown/dist/index.css";
import React, { useEffect, useState } from "react";

export const TimeCountdown = (props) => {
    const date = props.date;
    const [blockCss, setBlockCss] = useState({
        width: 18,
        height: 28,
        fontSize: 20,
    });
    const [separatorCSS, setSeparatorCSS] = useState({
        color: "black",
        size: "4px",
    });

    const mobileStyle = {
        width: 18,
        height: 28,
        fontSize: 20,
    };
    const tabStyle = {
        width: 24,
        height: 34,
        fontSize: 23,
    };
    const laptopStyle = {
        width: 32,
        height: 40,
        fontSize: 27,
    };
    const desktopStyle = {
        width: 40,
        height: 60,
        fontSize: 30,
    };
    const mobileSeparatorStyle = {
        color: "black",
        size: "4px",
    };
    const laptopSeparatorStyle = {
        color: "black",
        size: "5px",
    };

    const desktopSeparatorStyle = {
        color: "black",
        size: "6px",
    };

    const handleWindowResize = () => {
        if (typeof window === 'undefined') return;
        if (window?.innerWidth <= 640) {
            setBlockCss(mobileStyle);
            setSeparatorCSS(mobileSeparatorStyle);
        } else if (window?.innerWidth <= 768) {
            setBlockCss(tabStyle);
            setSeparatorCSS(laptopSeparatorStyle);
        } else if (window?.innerWidth <= 1536) {
            setSeparatorCSS(desktopSeparatorStyle);
            setBlockCss(laptopStyle);
        } else {
            setSeparatorCSS(desktopSeparatorStyle);
            setBlockCss(desktopStyle);
        }
    };

    useEffect(() => {
        handleWindowResize();
        window.addEventListener("resize", handleWindowResize);
        return () => window.removeEventListener("resize", handleWindowResize);
    }, []);

    return (
        <FlipClockCountdown
            to={date}
            showLabels={true}
            labels={["DAYS", "HOURS", "MINUTES", "SECONDS"]}
            labelStyle={{ fontSize: 7, fontWeight: 500, textTransform: "uppercase" }}
            digitBlockStyle={blockCss}
            separatorStyle={separatorCSS}
            duration={0.5}
        />
    );
};
