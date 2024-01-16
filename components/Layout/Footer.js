import React from 'react';
import FooterPart from '../common/FooterPart';
import { footerItems } from 'static';
import { TransServer } from 'helpers/TransServer';

const Footer = () => {
    return (
        <div
            dir={TransServer('user.dir')}
            className="z-10 bg-[#F2F2F3] w-full py-10 xl:px-5 px-3 3xl:px-0 relative bottom-0 left-0"
        >
            <div className="container max-w-full">
                <div className="flex flex-col max-w-full lg:flex-row flex-wrap justify-start gap-x-5">
                    {footerItems.map((item, i) => (
                        <FooterPart
                            key={i}
                            headingEn={item.headingEn}
                            headingAe={item.headingAe}
                            itemArr={item.itemArr}
                            socialArr={item.socialArr}
                            contactUsTextEn={item.contactUsTextEn}
                            contactUsTextAe={item.contactUsTextAe}
                            contactUsArr={item.contactUsArr}
                            hasBtn={item.hasBtn}
                            groupClass="lg:w-[32%]"
                            headingClass="font-bold"
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Footer;
