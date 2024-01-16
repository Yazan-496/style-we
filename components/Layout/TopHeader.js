"use server";
// import { usePathname } from "next/navigation";
import React from "react";
import { cookies } from 'next/headers';
import Link from "helpers/Link";
import {env} from 'node:process';
import { IoLogoWhatsapp } from "react-icons/io";
import { TransServer } from "helpers/TransServer";

const ContactUs = async () => {
    const APISitting = "api/web_v10/web/home/startingSettings";
    const startingSittingApiCall = await fetch(
        process.env.NEXT_PUBLIC_BASE_URL_LIVE + APISitting,
        {
            next: {revalidate: 60},
        }
    );
    const startingSittingResponse = await startingSittingApiCall.json();
    const sitting = startingSittingResponse?.data['starting-setting'] || [];
    return (
        <Link target="_blank"
        href={`https://api.whatsapp.com/send?phone=${sitting && sitting['whatsApp-phone'] && sitting['whatsApp-phone']
        }&text=${sitting?.Default_whatsapp_message}`}>
            <IoLogoWhatsapp color={'green'} size={20} />
        </Link>
    )
}

const TopHeader = async () => {
    const Cookie = cookies();
    // const path = usePathname();
    const local = Cookie.get('lang')?.value;
    return (
        <div className="bg-[#181818]  py-1">
            <div className="z-10 container mx-auto flex flex-row items-center justify-center gap-2 lg:gap-x-4 uppercase text-xs lg:text-xl 2xl:text-2xl font-normal">
                <div className="flex flex-row gap-1.5 lg:gap-3 items-center justify-center flex-wrap">
                    <p className=" text-white">
                        <i className="fa-solid fa-gift text-base lg:text-2xl text-[#E6E3C4] mr-1.5 lg:mr-3"></i>
                        {local === "ae"
                            ? "التوصيل مجاني عند الطلب"
                            : "Free Delivery on orders"}
                    </p>
                    <p className="font-bold text-[#E3D8C5] mt-1">
                        {local === "ae" ? <>فوق 150 درهم</> : <>OVER AED 150</>}
                    </p>
                    <p className="font-bold text-[#E3D8C5] mt-1 bg-white text-black rounded p-1 flex justify-center flex-col items-center">
                        {TransServer("footer.contact_us")}
                        <ContactUs/>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default TopHeader;
