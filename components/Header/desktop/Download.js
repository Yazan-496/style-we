"use client";
import React, { useEffect, useState } from 'react';
import Bowser from "bowser";
import Cookies  from 'js-cookie';
import { TransClient } from 'helpers/TransClient';

function Download({dir , available_in , download}) {
    const isAsideHidden = Cookies.get('asideHidden')?.value;
    const [isIOS, setIsIOS] = useState(null)
    const [showAside, setShowAside] = useState(true)
    const [isAndroid, setIsAndroid] = useState(null)
    const hideAside = () => {
        document.getElementById("aside").style.display = "none";
        Cookies.set("asideHidden", "true");
    };
  useEffect(() => {
      const browser = typeof window !== "undefined" ?
          Bowser.getParser(window.navigator.userAgent) : Bowser.getParser("android");
      setIsIOS(browser.getOSName() === "iOS");
      setIsAndroid(browser.getOSName() === "Android");
  }, [])
    return (
        <div dir={dir}>
            { showAside && (
                <aside className=" py-3 flex lg:hidden md:hidden items-center justify-between">
                    <div className="flex items-center">
                        <button className="text-gray-700 focus:outline-none p-2 rounded" aria-label="Close" title="Close" onClick={() => setShowAside(false)}>
                            &#10005;
                        </button>
                        <a href={isIOS ? "https://apps.apple.com/us/app/clearance-ae/id1637100307" : isAndroid ? "https://play.google.com/store/apps/details?id=ae.clearance.app" : ""} className="mr-2">
                            <img src="https://play-lh.googleusercontent.com/6nyUQko9ecQ1Y7YtSL4xvhKKD_9gzPUndmGsdm3WOwksKyopod5TTq3G4eOmpwB0x7g=s48-rw" alt="Icon of our application" loading="lazy" className="w-full h-full" />
                        </a>
                        <a href={isIOS ? "https://apps.apple.com/us/app/clearance-ae/id1637100307" : isAndroid ? "https://play.google.com/store/apps/details?id=ae.clearance.app" : ""} className="flex flex-col">
                            <div className="text-lg font-bold">Clearance</div>
                            <div className="text-sm">{available_in} {isIOS ? "App Store" : isAndroid ? "Google Play" : "Google Play"}</div>
                        </a>
                    </div>
                    <div className="px-3">
                        <a href={isIOS ? "https://apps.apple.com/us/app/clearance-ae/id1637100307" : isAndroid ? "https://play.google.com/store/apps/details?id=ae.clearance.app" : ""} className="text-red-400 hover:underline">{download}</a>
                    </div>
                </aside>
            )}
        </div>

    );
}

export default Download;
