"use client"
import styles from 'styles/Home.module.css';
import Link from 'helpers/Link';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { store } from 'store';
import {
  AiFillLinkedin,
  AiFillInstagram,
  AiFillFacebook,
} from 'react-icons/ai';
import { MdOutlineDialerSip } from 'react-icons/md';
import { useTranslation } from 'react-i18next';
import { BiSolidMessageDetail } from 'react-icons/bi';
import { IoLogoWhatsapp } from "react-icons/io";

const Footer = (props) => {
  const { t, i18n } = useTranslation('translation');
  const dispatch = useDispatch();
  const footer = useSelector((state) => state?.mainReducer?.footer);
  useEffect(() => {
    if (!footer) {
      dispatch({ type: 'GET_FOOTER_PAGES' });
    }
  }, []);
  return (
    <div className="w-full flex flex-col justify-center cm-footer py-0 lg:py-10">
      <div className="w-full flex justify-center cm-footer py-0 lg:py-10">
        <div className="cm-layout-max flex  w-full">
          <div className="flex flex-row justify-between w-full gap-6">
            <div className="flex px-10 lg:px-0 flex-col lg:flex-row flex-1 justify-center  overflow-hidden ">
              <div className="w-full overflow-hidden flex flex-col relative gap-y-5">
                <h2
                  className="text-[#222] cm-footer-text-1 truncate"
                  title="COMPANY INFO"
                >
                  {t('footer.company_info')}
                </h2>
                <ul>
                  {footer?.setup_pages?.length > 0 &&
                    footer?.setup_pages?.map((page, i) => {
                      return (
                        <li key={i} style={{ cursor: 'pointer' }}>
                          <Link href={`/information/${page?.slug}` || '/'}>
                            <div className="layout-footer__info-tree-top-content-item">
                              {page.name}
                            </div>
                          </Link>
                        </li>
                      );
                    })}
                </ul>
              </div>

              <div className="w-full overflow-hidden flex flex-row py-1 lg:py-0 lg:flex-col relative pb-5 lg:pb-0 gap-y-5">
                <h2
                  className="text-[#222] cm-footer-text-1 truncate"> {t("footer.contact_us")}</h2>

                <div className="flex pl-10 lg:pl-0 flex-row lg:flex-col">
                  <h2
                  className="text-[#222] cm-footer-text-1 w-full truncate">{footer?.message_contact_us}</h2>
                  <div className="flex  flex-col gap-x-2">
                    <div className="cursor-pointer flex gap-x-2 items-center text-lg font-[700] ">
                      <MdOutlineDialerSip />
                      <a href={`tel:${footer?.company_phone}`}>
                        {footer?.company_phone}
                      </a>
                    </div>
                    <div className="cursor-pointer flex gap-x-2 items-center text-lg font-[700] ">
                      <BiSolidMessageDetail />
                      <a
                        target="_blank" href={`mailto:${footer?.company_email}`}>{footer?.company_email}</a>
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
              </div>
              <div className="w-full overflow-hidden flex flex-col relative gap-y-5">
                <h2
                  className="text-[#222] cm-footer-text-1 truncate"
                  title="DOWNLOAD OUR APP"
                >
                  {t("footer.download_app")}
                </h2>
                <ul className="p-2">
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
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
