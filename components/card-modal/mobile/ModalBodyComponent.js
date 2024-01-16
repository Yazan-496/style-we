import React, { useEffect } from 'react';
import CarouselItemsCard from './CarouselItems';
import { store } from 'store';
import ItemDetailCard from './ItemDetailCard';
import CartModal from '../../Body/mobile/CartModal';
import CountFlashSale from '../../Body/desktop/CountFlashSale';
import { SvgLoader } from '../../svgs';

const ModalBodyComponent = ({
  setLoading,
  onClose,
  loading,
  product,
  addToCart,
  isSizeRequired,
  setQtyState,
  qtyState,
  setSelectedSize,
  selectedSize,
  setIsSizeRequired,

  showToast,
}) => {
  function delay(t, val) {
    return new Promise((resolve) => setTimeout(resolve, t, val));
  }

  const handleAddToCart = () => {
    setLoading(true);
    addToCart(product);
  };
  return (
    <div className="flex flex-col px-2 pb-[10px]  w-full overflow-auto">
      <div className="justify-between w-full gap-6">
        <CarouselItemsCard product={product} />

        <div className="flex-1 pr-6 max-h-[496px] overflow-y-auto relative">
          <ItemDetailCard
            setQtyState={(qtyState) => setQtyState(qtyState)}
            qtyState={qtyState}
            isSizeRequired={isSizeRequired}
            product={product}
            showToast={showToast}
            selectedSize={selectedSize}
            setSelectedSize={(selectedSize) => setSelectedSize(selectedSize)}
            setIsSizeRequired={(isSizeRequired) =>
              setIsSizeRequired(isSizeRequired)
            }
          />
        </div>
      </div>
    </div>
  );
};
export default ModalBodyComponent;
