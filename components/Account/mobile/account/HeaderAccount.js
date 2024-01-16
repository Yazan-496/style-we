import React, { useEffect, useState } from 'react';
import Link from 'helpers/Link';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from 'next/navigation';
import store from '../../../../store';

const HeaderAccount = ({ onOpen }) => {
  const [token, setToken] = useState(null);
  const [guest, setGuest] = useState(false);
  const [userData, setUserData] = useState(null);
  const syncInfo = useSelector((state) => state.AuthReducer.syncInfo);

  useEffect(() => {
    const tok = JSON.parse(
      localStorage.getItem('TOKEN_LOCAL_STORAGE')
    );
    const customer = JSON.parse(
      localStorage.getItem('CUSTOMER_INFO_STORAGE')
    )?.customerInfo?.customer_info;
    setGuest(!(customer?.is_email_verified || customer?.is_phone_verified));
    setToken(tok?.token)
    setUserData(tok?.userData)
    const unsubscribe = store.subscribe(() => {
      const updatedInfo = JSON.parse(
        localStorage.getItem('CUSTOMER_INFO_STORAGE')
      )?.customerInfo?.customer_info;
      if (
        updatedInfo &&
        customer?.is_email_verified !== 'undefined' &&
        customer?.is_phone_verified !== 'undefined'
      ) {
        setGuest(!(customer?.is_email_verified || customer?.is_phone_verified));      }
    });

    return () => {
      unsubscribe();
    };
  }, [syncInfo]);
  const dispatch = useDispatch();
  const router = useRouter();
 useEffect(() => {
 }, [guest])
  function handleLogout() {
    dispatch({ type: 'LOGOUT' });
    //
    if (typeof window !== 'undefined') {
      if (window.location?.pathname === '/account/login') {
        window.location.reload();
      } else {
        router.refresh();
        router.push('/account/login');
      }
    }
  }

  const { t, i18n } = useTranslation('translation');
  return (
    <>
      <div id="root" className="page-identity-user-info">
        <div className="account">
          <div className="account__setting__item--wrapper">
            <div className="account__setting__item">
              <Link href="/">
                <img
                  aria-hidden="true"
                  src="data:image/svg+xml,%3csvg t='1627545563226' class='icon' viewBox='0 0 1024 1024' version='1.1' xmlns='http://www.w3.org/2000/svg' p-id='5591' width='200' height='200'%3e%3cpath d='M781.653333 71.281778a50.289778 50.289778 0 0 0-70.599111 0L300.316444 477.866667a48.014222 48.014222 0 0 0 0 69.006222l410.737778 405.845333c19.512889 19.057778 51.143111 19.057778 70.656 0a48.014222 48.014222 0 0 0 0-69.063111L408.177778 512l373.532444-372.451556a47.786667 47.786667 0 0 0 0-68.266666z' fill='%23111111' p-id='5592'%3e%3c/path%3e%3c/svg%3e"
                  alt="back"
                  className="account__header__left"
                />
              </Link>
              <img
                src="data:image/svg+xml,%3csvg t='1627477270527' class='icon' viewBox='0 0 1024 1024' version='1.1' xmlns='http://www.w3.org/2000/svg' p-id='6041' width='200' height='200'%3e%3cpath d='M278.3232 773.2736c13.7216 0 27.392 3.584 39.424 10.752l45.6704 26.88c22.4256 13.2096 36.352 37.1712 36.352 62.6176v77.1072c0 13.5168 11.3664 24.4736 25.2928 24.4736h168.448a24.9344 24.9344 0 0 0 25.344-24.4736v-75.5712c0-26.8288 15.1552-51.5072 39.4752-64.3584l46.9504-24.7808a78.1824 78.1824 0 0 1 74.24 0.8192l69.12 38.6048a26.0608 26.0608 0 0 0 34.56-8.96l84.224-141.2096a23.7056 23.7056 0 0 0 2.5088-18.5856 24.3712 24.3712 0 0 0-11.776-14.848l-67.6352-37.7856a73.1136 73.1136 0 0 1-37.9904-65.1776l1.3312-51.712c0.6656-25.4464 15.1552-49.1008 37.888-61.7984l69.12-38.5536a24.576 24.576 0 0 0 11.776-14.8992 23.7056 23.7056 0 0 0-2.56-18.5856L885.76 212.0704a25.7024 25.7024 0 0 0-34.56-8.96l-67.6864 37.7344a77.7728 77.7728 0 0 1-77.312-0.8704l-45.7216-26.88a73.216 73.216 0 0 1-36.352-62.6176V73.3184a24.9344 24.9344 0 0 0-25.2416-24.4224H430.3872a24.8832 24.8832 0 0 0-25.2928 24.4224v75.6224a73.216 73.216 0 0 1-39.424 64.3584l-46.9504 24.7808a78.336 78.336 0 0 1-74.24-0.8192L175.4112 198.656a25.8048 25.8048 0 0 0-34.6112 8.96L56.5248 348.7232a24.1664 24.1664 0 0 0 9.3184 33.4848l67.6864 37.7856c24.0128 13.4656 38.5024 38.5024 37.888 65.2288l-1.3312 51.712a73.5744 73.5744 0 0 1-37.8368 61.7984l-69.12 38.5536a24.064 24.064 0 0 0-9.216 33.4336l84.2752 141.2096c6.912 11.6224 22.528 15.6672 34.56 8.96l67.6352-37.7856c11.776-6.656 24.8832-9.8304 37.9392-9.8304M593.5616 1024H425.0624c-41.8304 0-75.8272-32.8704-75.8272-73.3696v-77.1072a24.4224 24.4224 0 0 0-12.1344-20.9408l-45.568-26.88a26.4704 26.4704 0 0 0-25.9584-0.256l-67.584 37.7344c-36.1472 20.3776-82.688 8.192-103.5776-26.8288L10.1376 695.1424a72.0384 72.0384 0 0 1 27.7504-100.1472l69.0688-38.6048a24.5248 24.5248 0 0 0 12.6464-20.6336l1.28-51.6608a24.2688 24.2688 0 0 0-12.6976-21.76l-67.584-37.888a72.192 72.192 0 0 1-27.8528-100.1472l84.3264-141.1072c20.9408-35.1232 67.2768-47.104 103.5776-26.88l69.0176 38.6048c7.68 4.1984 17.0496 4.5568 24.832 0.256l46.8992-24.7296a24.576 24.576 0 0 0 13.1584-21.504V73.3184C354.56 32.8704 388.608 0 430.3872 0h168.5504c41.8304 0 75.776 32.8704 75.776 73.3184v77.1584c0 8.4992 4.608 16.4864 12.1856 20.9408l45.568 26.8288a26.112 26.112 0 0 0 25.9072 0.3072l67.584-37.7344c36.1472-20.2752 82.7392-8.192 103.5776 26.8288l84.2752 141.1584c10.1888 16.896 12.8512 36.7616 7.5776 55.6544-5.1712 18.944-17.8176 34.7648-35.328 44.544l-69.0176 38.5536a24.576 24.576 0 0 0-12.6464 20.6848l-1.3312 51.6608a24.576 24.576 0 0 0 12.6976 21.76l67.6352 37.7344c17.5616 9.8304 30.1056 25.6 35.328 44.544 5.2736 18.944 2.56 38.7072-7.5776 55.6544l-84.224 141.2096c-20.9408 35.072-67.584 47.0528-103.5776 26.8288l-69.0688-38.5536a25.856 25.856 0 0 0-24.832-0.256l-46.848 24.7296a24.4736 24.4736 0 0 0-13.2096 21.504v75.5712c0 40.448-33.9968 73.3696-75.8272 73.3696' fill='%23111111' p-id='6042'%3e%3c/path%3e%3cpath d='M516.3008 372.8384c-79.4624 0-144.128 62.464-144.128 139.3664s64.6656 139.4176 144.128 139.4176 144.128-62.5152 144.128-139.4176c0-76.9024-64.6656-139.3664-144.128-139.3664m0 327.68c-107.3152 0-194.6624-84.48-194.6624-188.3136s87.3472-188.2624 194.6624-188.2624 194.6624 84.48 194.6624 188.2624c0 103.8336-87.3472 188.2624-194.6624 188.2624' fill='%23111111' p-id='6043'%3e%3c/path%3e%3c/svg%3e"
                alt="Processing"
                className="account__service__icon hidden"
                aria-hidden="true"
              />
            </div>
            <div className="unlogined--status">
              {token && !guest ? (
                <>
                  <h1 className="p-5 w-full flex items-center justify-center">
                    {t('user.welcome')} {userData?.f_name || userData?.name}{' '}
                  </h1>
                  <button
                    onClick={handleLogout}
                    className="p-5 flex justify-center items-center overflow-hidden rounded disabled:opacity-20 disabled:cursor-not-allowed hover:opacity-80 active:opacity-90 active:shadow-[inset_0px_0px_8px_rgba(0,0,0,0.25)] group cm-btn-primary flex-grow h-10 w-full text-base gap-1 px-3 py-2"
                  >
                    <Link href="/account/login">
                      {/*<a>*/}
                      <div className="text-white inline-block truncate opacity-1 group-active:opacity-90">
                        {t('user.logout')}
                      </div>
                      {/*</a>*/}
                    </Link>
                  </button>
                </>
              ) : (
                <button onClick={() => onOpen(true)}>
                  <div className="account__unlogin">
                    <div
                      className="userInfo__unlogin"
                      aria-hidden="true"
                      data-statis-click='{"ec":"acount_signin_register"}'
                      data-collect-click='{"event_id":"acount_signin_register"}'
                    >
                      {t('header.user.signin')}/{t('header.user.register')}
                    </div>
                  </div>
                </button>
              )}
              <div className="account-box "></div>
              <div className="coupon-account hidden">
                <div className="content">
                  <p>{t('header.user.register_to_get_5')}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default HeaderAccount;
