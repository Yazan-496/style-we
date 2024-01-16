const initialState = {
  sitting: null,
  mainPageData: null,
  flashSale: null,
  mainCategories: null,
  loading: false,
  cartProduct: null,
  error: null,
  footer: null,
  footerPage: null,
};
export const mainReducer = (state = initialState, action) => {
  switch (action.type) {
    case "GET_PAGE_CONTENT_REDUCER":
      return {
        ...state,
        footerPage: action?.payload?.footerPage,
      };
    case "GET_FOOTER_PAGES_REDUCER":
      return {
        ...state,
        footer: action?.payload?.footerRes,
      };
    case "START_LOADING":
      return {
        ...state,
        loading: true,
      };
    case "STOP_LOADING":
      return {
        ...state,
        loading: false,
      };
    case "GET_SECTIONS_REDUCERS":
      return {
        ...state,
        error: null,
      };
    case "FETCH_DATA_SUCCESS":
      return {
        ...state,
        mainPageData: action?.payload?.mainPage
          ? action?.payload?.mainPage?.data?.data
          : state.mainPageData,
        flashSale: action?.payload?.flashSale
          ? action?.payload?.flashSale?.data?.data
          : state.flashSale,
        mainCategories: action?.payload?.mainCategories
          ? action?.payload?.mainCategories?.data?.data
          : state.mainCategories,
      };
    case "FETCH_SITTING_SUCCESS":
      return {
        ...state,
        sitting: action?.payload?.sitting,
      };
    case "FETCH_DATA_ERROR":
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
    default:
      return state;
  }
};
