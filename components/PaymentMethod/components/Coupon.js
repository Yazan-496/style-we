import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { TransClient } from "helpers/TransClient";
import { useRouter } from "next/navigation";
import { SvgLoader } from "components/svgs";

const Coupon = () => {
  const router = useRouter()
  const dispatch = useDispatch();
  const [coupon, setCoupon] = useState(null);
  const [open, setOpen] = useState(false);
  const [oldCoupons, setOldCoupons] = useState([]);
  const [loading, setLoading] = useState(false); 
  useEffect(() => {
    const storedCouponCodesJSON = localStorage.getItem("COUPON_CODES");
    const storedCouponCodes = storedCouponCodesJSON
      ? JSON.parse(storedCouponCodesJSON)
      : [];
    setOldCoupons(storedCouponCodes);
  }, []);

  const handleCouponSelect = (coupon) => {
    setCoupon(coupon);
    setOpen(!open);
  };
  const handleChange = (e) => {
    const { value } = e.target;
    setCoupon(value);
  };
  const applyCoupon = async () => {
    try {
        setLoading(true);
        dispatch({ type: "APPLY_COUPON", payload: coupon });
        await new Promise((resolve) => setTimeout(resolve, 5000));
        setLoading(false);
        router.refresh();
      } catch (error) {
        console.error("Error applying coupon:", error);
        setLoading(false);
      }
  };
  return (
    <div className="indexstyle-sc-60raj9-0 cqTUDm checkout-coupon-input b-white rounded">
      <div className="indexstyle-sc-172cmbz-0 kmQwZW bg-white">
        <div className="pay-title flex justify-center">
          <div className="pay-title-left">
            <p className="pay-name">
              {TransClient("user.apply")} {TransClient("user.coupon")}
            </p>
          </div>
          <div className="pay-title-right" />
        </div>
        <div className="p-4 pay-panpel-content">
          <div className="flex w-full indexstyle-i4qewv-0 ksrDqv coupon-content new-coupon-content">
              <div className="flex w-full slid-cart-coupon lg:gap-6 justify-center">
                  <div className="rounded mr-2 w-[230px] lg:w-full select-input-info-wrapper border flex justify-start items-center pl-3">
                      <div className="indexstyle-sc-19wu2cr-0 dcOGst h-full w-full">
                          <div className="select-input-wrapper h-full" title="">
                              <div className="relative select-wrapper h-full">
                                  <input
                                      name="coupon"
                                      value={coupon}
                                      onChange={handleChange}
                                      className="w-full input-wrapper h-full outline-none text-sm"
                                      placeholder={TransClient("user.enter_or_select_coupon_code")}
                                      defaultValue=""
                                  />
                                  {/* <div className="">
                                      <div
                                          onClick={() => setOpen(!open)}
                                          className="absolute top-1 md:top-3 lg:top-3 right-0 cursor-pointer icon-box"
                                      >
                                          <svg
                                              className="icon arrow-down-coupon"
                                              height={20}
                                              version="1.1"
                                              viewBox="0 0 1024 1024"
                                              width={20}
                                              xmlns="http://www.w3.org/2000/svg"
                                          >
                                              <path
                                                  d="M140.458667 358.997333L512 730.538667l371.541333-371.541334-60.416-60.330666L512 609.877333 200.874667 298.666667z"
                                                  fill="#9999a4"
                                              />
                                          </svg>
                                      </div>
                                      <div
                                          className={`${
                                              open ? "block" : "hidden "
                                          } flex justify-center select-info-wrapper`}
                                      >
                                          {oldCoupons.length > 0 ? (
                                              oldCoupons.map((coupon) => (
                                                  <li
                                                      className="w-full cursor-pointer text-center"
                                                      key={coupon}
                                                      onClick={() => handleCouponSelect(coupon)}
                                                  >
                                                      <div className="w-full p-2 no-code">
                                                          {coupon}
                                                      </div>
                                                  </li>
                                              ))
                                          ) : (
                                              <div className="p-2 no-code">
                                                  {TransClient("user.No_codes_available")}
                                              </div>
                                          )}
                                      </div>
                                  </div> */}
                              </div>
                          </div>
                      </div>
                  </div>
                  <button
                      disabled={!coupon}
                      onClick={() => applyCoupon()}
                      className={`${
                          coupon ? "bg-gray-800" : "bg-gray-200 cursor-default"
                      } items-center text-white flex justify-center text-lg lg:h-11 lg:w-44 px-5 rounded indexstyle-sc-147lzxr-0 cpfaAp`}
                  >
                      <div className="children-container">{loading ? <SvgLoader/> : TransClient("user.apply")}</div>
                  </button>
              </div>
          </div>
      </div>

      </div>
    </div>
  );
};
export default Coupon;
