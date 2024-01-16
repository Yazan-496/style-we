const initialState = {
  flashSale: null,
  totalFlashSale: 0,
  flashSaleProducts: [],
  flashSaleLoading: false,
  offset: 1,
};
export function FlashSaleReducer(state = initialState, action) {
  switch (action.type) {
    case "SUCCESS_GET_FLASH_SALE":
      const newFlashSaleProducts = action?.payload?.flash_deals_products || [];

      return {
        ...state,
        flashSaleProducts: [
          ...state.flashSaleProducts,
          ...newFlashSaleProducts,
        ],
        flashSale: action?.payload,
        totalFlashSale: action?.payload?.total,
      };
    case "INCREASE_OFFSET_FLASH_SALE_REDUCER":
      if (state.totalFlashSale > state.flashSaleProducts?.length) {
        return {
          ...state,
          offset: state?.offset + 1,
        };
      } else {
        return {
          ...state,
          offset: state?.offset,
        };
      }
    case "DECREASE_OFFSET_FLASH_SALE_REDUCER":
      return {
        ...state,
        offset:
          state.totalFlashSale < state.flashSaleProducts?.length
            ? state?.offset - 1
            : state?.offset,
      };
    case "START_LOADING_FLASH_SALE":
      return {
        ...state,
        flashSaleLoading: true,
      };
    case "STOP_LOADING_FLASH_SALE":
      return {
        ...state,
        flashSaleLoading: false,
      };
    case "FETCH_DATA_ERROR":
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return {
        ...state,
      };
  }
}
