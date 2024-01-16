import { useEffect, useState } from 'react';
import Link from 'helpers/Link';
import styled from 'styled-components';
import { GiftSVG, PlanSVG } from '../../svgs';
import { HiShoppingBag } from 'react-icons/hi';
import { TfiShoppingCart } from 'react-icons/tfi';
import { useTranslation } from 'react-i18next';
import HTMLRenderer from '../../../helpers/HTMLRenderer';

const TopBanner = () => {
  const { t, i18n } = useTranslation('translation');
  const [customerInfo, setCustomerInfo] = useState(null);
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const info = JSON.parse(localStorage.getItem('CUSTOMER_INFO_STORAGE'));
      if (info?.customerInfo && info?.customerInfo?.advertise_top) {
        if (!customerInfo) {
          setCustomerInfo(info?.customerInfo?.advertise_top);
        }
      }
    } else {
    }
  }, []);
  return (
    customerInfo && (
      <div className="bg-black pt-2 flex items-center justify-center space-x-2 h-10">
        <div className="hidden flex items-center space-x-1 truncate">
          <GiftSVG width="15" height="15" />
          <span className="text-white text-xs">
            {t('header.free_gift')}
            <span className=" text-xs">{t('header.over')} $9</span>
          </span>
        </div>
        <div className="hidden text-white flex items-center space-x-1 truncate">
          <PlanSVG width="15" height="15" />
          <span className="text-white text-xs">
            {t('header.free_shipping')}
            <span className=" text-xs">{t('header.over')} $9</span>
          </span>
        </div>
        <div className="hidden flex items-center space-x-1 truncate">
          <span className="text-white text-xs">
            $5 {t('header.off_for_new')}{' '}
            <span
              className=" text-xs"
              style={{
                background: '#f4ff9ae6',
                color: 'black',
              }}
            >
              Code: NEW5
            </span>
          </span>
        </div>
        <div className="text-white">
          <HTMLRenderer overFlow={true} htmlContent={customerInfo} />
        </div>
      </div>
    )
  );
};

export default TopBanner;

const Span = styled.span`
  box-sizing: border-box;
  display: block;
  overflow: hidden;
  width: initial;
  height: initial;
  background: none;
  opacity: 1111111111;
  z-index: 1111111111;
  border: 0;
  margin: 0;
  padding: 0;
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
`;
const Image = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  box-sizing: border-box;
  padding: 0;
  border: none;
  margin: auto;
  display: block;
  opacity: 1111111111;
  z-index: 1111111111;
  width: 0;
  height: 0;
  min-width: 100%;
  max-width: 100%;
  min-height: 100%;
  max-height: 100%;
  object-fit: cover;
  object-position: top;
`;
