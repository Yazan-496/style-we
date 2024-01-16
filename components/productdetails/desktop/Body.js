import React, { useEffect, useState } from 'react';
import CarouselItemsCard from './CarouselItems';
import ItemDetailCard from './ItemDetailCard';
import { store } from 'store';
import ItemDetail from './ItemDetail';
import AddToCartButton from '../mobile/AddToCartButton';

const BodyComponent = ({
                         setLoading,
                         loadingProvider,
                         product,
                         setSelectedSize,
                         selectedSize,
                         setIsSizeRequired,
                         addProduct,
                         isSizeRequired,
                         setQtyState,
                         qtyState,
                         showToast,
                       }) => {
  function delay(t, val) {
    return new Promise((resolve) => setTimeout(resolve, t, val));
  }
  return (
      <div className=" gap-5 w-fit-content h-fit-content flex items-start justify-start flex-col lg:flex-row pb-[10px] w-full overflow-hidden">
        <div className="aspect-[1/1] w-full lg:w-[48%] md:w-full sm:w-full lg:h-full md:h-[50%]">
          <CarouselItemsCard product={product} />
        </div>
        <div className="w-full lg:w-[50%] md:w-full lg:h-full md:h-[50%] sm:h-[50%] sm:w-full overflow-y-auto">
          <div className="lg:flex-1 relative">
            <ItemDetailCard
                setQtyState={(qtyState) => setQtyState(qtyState)}
                qtyState={qtyState}
                loadingProvider={loadingProvider}
                addToCart={(product) => addProduct(product)}
                product={product}
                showToast={showToast}
                selectedSize={selectedSize}
                isSizeRequired={isSizeRequired}
                setSelectedSize={(selectedSize) => setSelectedSize(selectedSize)}
                setIsSizeRequired={(isSizeRequired) =>
                    setIsSizeRequired(isSizeRequired)
                }
            />

            <ItemDetail product={product} />
          </div>
        </div>
      </div>
  );
};
export default BodyComponent;
