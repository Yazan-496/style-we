import React, { useEffect } from "react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "helpers/Link";

import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { MdOutlineDialerSip } from "react-icons/md";
import { BiSolidMessageDetail } from "react-icons/bi";
import { AiFillFacebook, AiFillInstagram, AiFillLinkedin } from "react-icons/ai";
const Footer = () => {
  const dispatch = useDispatch()
  const { t, i18n } = useTranslation("translation");
  const company = [
    {
      id: 1,
      name: t("footer.about_us"),
      selected: 0,
      href: "/information/about-us/",
    },
    {
      id: 2,
      selected: 1,
      name: t("footer.intellectual_property_rights"),
      href: "/information/about-us/intellectual-property-rights",
    },
    {
      id: 3,
      name: t("footer.return_policy"),
      selected: 3,
      href: "/information/return-policy/",
    },
    {
      id: 4,
      name: t("footer.terms"),
      selected: 0,
      href: "/information/terms/",
    },

    {
      id: 5,
      name: t("footer.sitemap"),
      selected: 4,
      href: "/information/site-map/",
    },
  ];
  const support = [
    {
      id: 6,
      name: t("footer.shipping_delivery"),
      selected: 0,
      href: "/information/shipping-delivery/",
    },
    {
      id: 7,
      name: t("footer.return_policy"),
      selected: 0,
      href: "/information/return-policy/",
    },
    {
      id: 8,
      name: t("footer.tracking_order"),
      selected: 3,
      href: "/information/traking-order/",
    },
    {
      id: 9,
      name: t("footer.payment_methods"),
      selected: 0,
      href: "/information/payment-methods/",
    },
    {
      id: 10,
      name: t("footer.pre_order_guidance"),
      selected: 0,
      href: "/information/pre-order-guidance/",
    },
    {
      id: 11,
      name: t("footer.about_wallet"),
      selected: 0,
      href: "/information/about-credit-wallet/",
    },
    {
      id: 12,
      name: t("footer.influencer_program"),
      selected: 0,
      href: "/information/influencer-program/",
    },
    {
      id: 13,
      name: t("footer.affiliate_program"),
      selected: 0,
      href: "/information/affiliate-program/",
    },
  ];
  const service = [
    {
      id: 14,
      name: t("footer.sms_terms"),
      selected: 0,
      href: "/information/sms-terms/",
    },
    {
      id: 15,
      name: t("footer.customer_reviews"),
      selected: 0,
      href: "/information/customer-reviews/",
    },
    {
      id: 16,
      name: t("footer.contact_us"),
      selected: 0,
      href: "/information/contact-us/",
    },
    {
      id: 17,
      name: t("footer.how_to_choose_your_size"),
      selected: 0,
      href: "/information/how-to-choose-your-size/",
    },
    {
      id: 18,
      name: t("footer.how_to_track_my_order"),
      selected: 0,
      href: "/information/how-to-track-my-order/",
    },
    { id: 16, name: t("footer.faqs"), selected: 0, href: "/information/faqs/" },
  ];
  const router = useRouter();
  const handleLinkClick = (e, path) => {
    setSelectedLink(path);
    router.push(path);
  };
  const [isCompany, setisCompany] = useState(false);
  const [isSupport, setisSupport] = useState(false);
  const [isService, setisService] = useState(false);

  const companytoggleDropdown = () => {
    setisCompany(!isCompany);
  };
  const supporttoggleDropdown = () => {
    setisSupport(!isSupport);
  };
  const servicetoggleDropdown = () => {
    setisService(!isService);
  };
  const [selectedLink, setSelectedLink] = useState(null);
  const footer = useSelector((state) => state?.mainReducer?.footer);
  useEffect(() => {
    if (!footer) {
      dispatch({ type: 'GET_FOOTER_PAGES' });
    }
  }, []);
  return (
    <footer className="layout-footer" id="custom-footer-background">
      <div className="layout-footer__info">
        <div></div>
        <div
          className="layout-footer__info-tree-top "
          data-statis='{"ec":"bottom_navigation_entrance","bottom_navigation_entrance_name":"COMPANY INFO","jl":"","level":1}'
        >
          <span className="text" onClick={companytoggleDropdown}>
            {t('footer.company_info')}
          </span>
          <i className="iconfont icon-icon_add" />

          {isCompany && (
            <ul>
              {footer?.setup_pages?.length > 0 &&
              footer?.setup_pages?.map((page, i) => {
                return (
                  <Link
                    key={i}
                    href={`/information/${page?.slug}` || '/'}
                  >
                    <div
                      style={{ cursor: 'pointer' }} className="layout-footer__info-tree-top-content-item">
                      {page.name}
                    </div>
                  </Link>
                );
              })}
            </ul>
          )}
        </div>
        <div
          className="layout-footer__info-tree-top "
          data-statis='{"ec":"bottom_navigation_entrance","bottom_navigation_entrance_name":"HELP & SUPPORT","jl":"","level":1}'
        >
          <span className="text" onClick={supporttoggleDropdown}>
            {t("footer.contact_us")}
          </span>
          <i className="iconfont icon-icon_add" />
          {isSupport && (
            <>
              <div className="pt-2 flex flex-col">
                  <span className="w-full text" onClick={supporttoggleDropdown}>
            {footer?.message_contact_us}
          </span>
                <div className="flex  flex-col gap-x-2">
                  <div className="cursor-pointer flex gap-x-2 items-center text-lg font-[700] ">
                    <MdOutlineDialerSip />
                    <a href={`tel:${footer?.company_phone}`}>
                      {footer?.company_phone}
                    </a>
                  </div>
                  <div className="cursor-pointer flex gap-x-2 items-center text-lg font-[700] ">
                    <BiSolidMessageDetail />
                    <a target="_blank" href={`mailto:${footer?.company_email}`}>
                      {footer?.company_email}
                    </a>
                  </div>
                </div>
              </div>
              <div className="flex p-2 gap-x-2">
                {footer?.social_media?.map((social, i) => {
                  return (
                    <div
                      className="cursor-pointer w-[55px] h-[55px] rounded-full"
                      key={i}
                    >
                      <Link href={social?.link}>
                        {social?.name === 'facebook' ? (
                          <AiFillFacebook size={50} />
                        ) : social?.name === 'instagram' ? (
                          <AiFillInstagram size={50} />
                        ) : social?.name === 'linkedin' ? (
                          <AiFillLinkedin size={50} />
                        ) : null}
                      </Link>
                    </div>
                  );
                })}
              </div>
            </>
          )}
        </div>
        <div
          className="layout-footer__info-tree-top "
          data-statis='{"ec":"bottom_navigation_entrance","bottom_navigation_entrance_name":"HELP & SUPPORT","jl":"","level":1}'
        >
          <span className="text" onClick={servicetoggleDropdown}>
                  {t("footer.download_app")}
          </span>
          <i className="iconfont icon-icon_add" />

          {isService &&
            <ul className="p-2 flex gap-x-2">
              <li>
                {footer?.download_apple_app?.status === '1' && (
                  <Link href={footer?.download_apple_app?.link}>
                    <div className="cursor-pointer p-1 w-[191px] h-[60px]">
                      <img
                        className="w-full h-full object-contain"
                        src={footer?.download_apple_app?.photo}
                        alt={footer?.download_apple_app?.photo}
                      />
                    </div>
                  </Link>
                )}
              </li>
              <li>
                {footer?.download_google_app?.status === '1' && (
                  <Link href={footer?.download_google_app?.link}>
                    <div className="cursor-pointer p-1 w-[191px] h-[60px]">
                      <img
                        className="w-full h-full object-contain"
                        src={footer?.download_google_app?.photo}
                        alt={footer?.download_google_app?.photo}
                      />
                    </div>
                  </Link>
                )}
              </li>
            </ul>
          }
        </div>
      </div>
      <div className="hidden layout-footer__payment-icons">
        <img
          className="footer lazyloaded"
          alt="Visa"
          title="Visa"
          src="/image/catalog/activity/s4AQRk7keQg1PL8z6basUcXfrWo3FTTPLoADK8zQ.jpg"
        />

        <img
          className="footer lazyloaded"
          alt="Mastercard"
          title="Mastercard"
          src="/image/catalog/activity/CFSmeEi9CnuQj0Nzawwx34UBJ0IauGezE0eMPbbE.jpg"
        />

        <img
          className="footer lazyloaded"
          alt="Maestro"
          title="Maestro"
          src="/image/catalog/activity/GY54JpUUeoNdwJthb4lwKhOmM0BGPArBRnMuqBBt.jpg"
        />

        <img
          className="footer lazyloaded"
          alt="American Express"
          title="American Express"
          src="/image/catalog/activity/r61jbmFv4GzJKO727HLVoERwMj2aaINIrVxPT8hK.jpg"
        />

        <img
          className="footer lazyloaded"
          alt="Diners Club"
          title="Diners Club"
          src="/image/catalog/activity/93RkKE4erOeFWUc5TY53fWwC7uqDfMnN9ctUbykO.jpg"
        />

        <img
          className="footer lazyloaded"
          alt="Discover"
          title="Discover"
          src="/image/catalog/activity/LYx30ZWHHSFHucQXFeKSs4gigEAQ5diX4WgKaijH.jpg"
        />

        <img
          className="footer lazyloaded"
          alt="JCB"
          title="JCB"
          src="/image/catalog/activity/piNgPFlwRlzU4JcvZMDlFnwzFIY0Q8PTxiYSpz4V.jpg"
        />

        <img
          className="footer lazyloaded"
          alt="Carte Bancaire"
          title="Carte Bancaire"
          src="/image/catalog/activity/gdLex5oTmknitDOXUOQvsCdjnvTll5scxGpx8wtJ.jpg"
        />

        <img
          className="footer lazyloaded"
          alt="Paypal"
          title="Paypal"
          src="/image/catalog/activity/EpzeDfnhOHEuSiwe5JGSMn7AOr4PACWfCOPvdpnK.jpg"
        />

        <img
          className="footer lazyloaded"
          alt="Afterpay"
          title="Afterpay"
          src="/image/catalog/activity/XoO9JOmQLQHfzpoyKih2tURVZdKEs70m7NHgdZI3.jpg"
        />

        <img
          className="footer lazyloaded"
          alt="Klarna"
          title="Klarna"
          src="/image/catalog/activity/CjIOTU4lgSOTAkB1Jz1CvCND3UuBgQjwgpa72o1S.jpg"
        />

        <img
          className="footer lazyloaded"
          alt="applepay"
          title="applepay"
          src="/image/catalog/activity/pwXd4iPx4g1632295698.jpg"
        />

        <img
          className="footer lazyloaded"
          alt="paywithgoogle"
          title="paywithgoogle"
          src="/image/catalog/activity/o7WntEy9UAhmILksY3i6e4TxAov2Ly06JhwNS5Rm.jpg"
        />

        <img
          className="footer lazyloaded"
          alt="Sofortbanking"
          title="Sofortbanking"
          src="/image/catalog/activity/KIqJG9rrNkRv9WRAskg0RBvx6bgvYrBnUnQFy1dA.jpg"
        />

        <img
          className="footer lazyloaded"
          alt="Ideal"
          title="Ideal"
          src="/image/catalog/activity/6L7bY270lVu3Zb9vskw8syBidYD2wSw6fAFxhzBK.jpg"
        />

        <img
          className="footer lazyloaded"
          alt="Bancontact"
          title="Bancontact"
          src="/image/catalog/activity/oZNipW5me9354Uv8FZJ0ugLaOUFAtvY8tUEEEiph.jpg"
        />

        <img
          className="footer lazyloaded"
          alt="Przelewy24"
          title="Przelewy24"
          src="/image/catalog/activity/zfKDmyJxOgirIoJovUj4qLfkfQT971n8KnmbDeHA.jpg"
        />

        <img
          className="footer lazyloaded"
          alt="blik"
          title="blik"
          src="/image/catalog/activity/xT6RMPbWhH2clTid3SNr4Yp6J1IwyV6wdojuoSmW.jpg"
        />

        <img
          className="footer lazyloaded"
          alt="eps"
          title="eps"
          src="/image/catalog/activity/0rmuHom5nBKMrb4ilNhgcSOLHIbWu1Y7MSuAYoFV.jpg"
        />
      </div>
      <p className="layout-footer__copyright">{footer?.company_copyright_text}</p>
    </footer>
  );
};

export default Footer;
