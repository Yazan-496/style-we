import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { HeartSVG } from 'components/svgs';
import { useDispatch, useSelector } from 'react-redux';
import { TransClient } from 'helpers/TransClient';
import {useRouter} from 'next/navigation';

const Sizes = ({
  product,
  setSelectedSize,
  selectedSize,
  setIsSizeRequired,
  showToast,
  isShow
}) => {
  const router = useRouter();
  const [check, setCheck] = useState(product?.is_favourite);
  function setFavorite() {
      dispatch({
          type: 'FAVORITE_PRODUCT',
          payload: { id: product?.id, isFavorite: check },
      });
      setCheck(!check);
  }
  const dispatch = useDispatch();
  const sync = useSelector(
    (state) => state?.ProductReducer?.sync
  );
  const WishListReducer = useSelector(
    (state) => state?.ProductReducer?.WishList
  );
  const handleSizeSelect = (size) => {
    if (size) {
      setSelectedSize(size);
    }
  };
  useEffect(() => {
    dispatch({
      type: 'GET_FAVORITE_PRODUCTS',
    });
  }, [sync]);

  useEffect(() => {
      if (product?.is_favourite || typeof product?.is_favourite === 'undefined') {
          setCheck(true);
      }
      router.refresh();
  }, []);
  useEffect(() => {
    if (product?.variation?.length > 0) {
      setIsSizeRequired(product?.variation.some((size) => size.qty > 0));
    }
  }, [product, setIsSizeRequired]);
  useEffect(() => {
    const updatedCheck = WishListReducer.some((item) => item.id === product?.id);
    setCheck(updatedCheck);
  }, [WishListReducer, product]);

  const { t, i18n } = useTranslation("translation");

  const allSizesSoldOut = product?.variation?.every((size) => size.qty === 0);

  return (
    <div
      id="components-product-options-quick-shop"
      className={`${
        showToast?.show ? "bg-red-200" : ""
      }  components-product-options`}
    >
      {product?.variation?.length > 0 && (
        <div dir={TransClient("user.dir")} className="components-product-options__wrap" id="option-mark-size">
          <div className="components-product-options__label">
            {t("user.sizes")} :
          </div>
          {allSizesSoldOut ? (
            <div dir={TransClient("user.dir")} className="flex justify-between items-center">
              <div className="text-red-500">{TransClient("user.all_sizes_are_sold_out")}</div>
              {isShow && (
                <div className="flex items-center justify-center m-5">
                  <HeartSVG
                    check={check}
                    onClick={setFavorite}
                    className={`cursor-pointer ${check ? 'text-red-500' : 'text-gray-400'}`}
                  />
                </div>
              )}
            </div>
          ) : (
            <div
              id="components-product-options__size-wrap"
              className="components-product-options__content swiper-container notranslate"
            >
              <div className="swiper-wrapper justify-center gap-4 flex-wrap">
                {product?.variation?.map((size, i) => {
                  return (
                    size?.qty > 0 && (
                      <div
                        key={i}
                        onClick={() => handleSizeSelect(size)}
                        className={`w-fit border border-gray-200 rounded cursor-pointer
                        components-product-options__square-item swiper-slide ${
                          selectedSize?.type === size?.type
                            ? " bg-[#31353C] text-white "
                            : " text-gray-600"
                        } 
                      `}
                        style={{ padding: "0px 7px" }}
                      >
                        {/* {size?.type}({size?.qty}) */}
                        {size?.type}
                      </div>
                    )
                  );
                })}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
export default Sizes;