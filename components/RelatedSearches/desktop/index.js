import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { useSelector } from "react-redux";
import { store } from "store";

const OwlCarousel = dynamic(import("react-owl-carousel"), {
  ssr: false,
});
const data = [
  { name: "White Dress Casual Summer", link: "/c/white-dress-casual-summer" },
  { name: "Cute Floral Sundressesn", link: "/c/cute-floral-sundresses" },
  { name: "Yellow Flowy Sundress", link: "/c/yellow-flowy-sundress" },
  { name: "Sleeveless Boho Midi Dress", link: "/c/sleeveless-boho-midi-dress" },
  { name: "Casual Summer Sundresses", link: "/c/casual-summer-sundresses" },
  {
    name: "Summer Loose Fitting Dresses",
    link: "/c/summer-loose-fitting-dresses",
  },
  { name: "Everyday Sundresses", link: "/c/everyday-sundresses" },
  { name: "Spring Dress With Pockets", link: "/c/spring-dress-with-pockets" },
  { name: "Midi Length Beach Dresses", link: "/c/midi-length-beach-dresses" },
  { name: "Polka Dot Midi Dress", link: "/c/polka-dot-midi-dress" },
  { name: "PWhite Sexy Sundress", link: "/c/white-sexy-sundress" },
  {
    name: "White Short Sleeve Sundress",
    link: "/c/white-short-sleeve-sundress",
  },
];
const navComponent = [
  ' <span class=" mt-[-55px] ml-[-50px]  flex items-center h-full w-[50px] pointer-events-auto">\n' +
    "          <svg\n" +
    '            stroke="#31353C"\n' +
    '            viewBox="0 0 32 32"\n' +
    '            fill="none"\n' +
    '            xmlns="http://www.w3.org/2000/svg"\n' +
    "            width={30}\n" +
    "            height={30}\n" +
    "          >\n" +
    '            <path d="m20 8-8 8 8 8" strokeWidth={2} />\n' +
    "          </svg>\n" +
    "        </span>",
  '<span class=" mt-[-20px] flex items-center h-full w-[50px] pointer-events-auto">\n' +
    "          <svg\n" +
    '            stroke="#31353C"\n' +
    '            viewBox="0 0 32 32"\n' +
    '            fill="none"\n' +
    '            xmlns="http://www.w3.org/2000/svg"\n' +
    "            width={30}\n" +
    "            height={30}\n" +
    '            class="rotate-180"\n' +
    "          >\n" +
    '            <path d="m20 8-8 8 8 8" strokeWidth={2} />\n' +
    "          </svg>\n" +
    "        </span>",
];
const RelatedSearches = (props) => {
  let loading = useSelector((store) => store.LanguageReducer.loading);
  const lang_code = store.getState().LanguageReducer.langCode;
  let [translations, setTranslations] = useState(
    store.getState().LanguageReducer.data[lang_code]
  );
  useEffect(() => {
    setTranslations(store.getState().LanguageReducer.data[lang_code]);
  }, [loading]);
  return (
    <div className="style_seoKeywordTags__bqOIR cm-layout-max mb-12 mx-auto">
      <div className="text-center mb-5">
        <span className="text-[20px] leading-[29px] font-bold text-black">
          {translations.main.related_search}
        </span>
      </div>
      <div className="relative">
        <OwlCarousel
          className="owl-controls swiper swiper-initialized swiper-horizontal swiper-pointer-events swiper-autoheight"
          items={6}
          autoWidth={true}
          nav={true}
          navElement="div"
          navClass={[
            "nav-button  flex items-center h-full w-[50px] pointer-events-auto",
            " nav-button absolute right-0 top-0 w-[101px] h-full flex items-center justify-end cursor-pointer pointer-events-none",
          ]}
          navText={navComponent}
        >
          {data.map((item, index) => (
            <div key={index} className="swiper-wrapper">
              <div className="swiper-slide swiper-slide-active">
                <a
                  className="block bg-[#F2F2F3] rounded-[100px] px-5 py-4 hover:bg-[#CED0D3] cursor-pointer"
                  title={item.name}
                  href={`${item.link}`}
                >
                  <span className="text-black text-base leading-5 font-[Helvetica]">
                    {item.name}
                  </span>
                </a>
              </div>
            </div>
          ))}
        </OwlCarousel>
      </div>
    </div>
  );
};

export default RelatedSearches;
