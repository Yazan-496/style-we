const initialState = {
  Product: null,
  category: null,
  Products: [],
  ItemsProducts: [],
  productLoading: false,
  paginationLoading: false,
  pagination: false,
  error: null,
  sync: null,
  syncSessionStorage: false,
  offset: 1,
  totalProducts: 0,
  data_from: null,
  sort_by: null,
  search_value: null,
  searchResult: [],
  WishList: [],
  searchLoading: false,
  page: 1,
  AddOrRemoveHeart: [],
  seoProduct: { title: null, description: null },
  Update_Filters: { Sizes: [], Prices: [], Brands: [], Category: [] },
};
const removeDuplicates = (arr, key) => {
  const uniqueValues = new Map();
  for (const item of arr) {
    uniqueValues.set(item[key], item);
  }
  return Array.from(uniqueValues.values());
};
export function ProductReducer(state = initialState, action) {
  switch (action.type) {
    case "CLEAR_SEARCH":
      return {
        ...state,
        searchResult: [],
      };
    case "HANDLE_PAGINATION":
      return {
        ...state,
        pagination: !state.pagination,
      };
    case "SUCCESS_GET_SEARCH_PRODUCTS":
      return {
        ...state,
        searchResult: action?.payload?.SearchResult?.data?.recent_search,
      };
    case "SEO_PRODUCT":
      return {
        ...state,
        seoProduct: {
          title: action?.payload?.title,
          description: action?.payload?.description,
        },
      };
    case "SUCCESS_GET_PRODUCTS":
      const newProducts = action?.payload?.Products?.data?.products || [];
      const uniqueProducts = newProducts.filter(
        (newProduct) =>
          !state.ItemsProducts.some((item) => item.id === newProduct.id)
      );

      return {
        ...state,
        Products: action?.payload?.Products?.data,
        totalProducts: action?.payload?.Products?.data?.total_size,
        ItemsProducts: [...state.ItemsProducts, ...uniqueProducts],
      };
    case "RESET_GET_PRODUCTS":
      return {
        ...state,
        Products: [],
        ItemsProducts: [],
        totalProducts: 0,
        page: 1,
        offset: 1,
      };
    case "RESET_JUST_GET_PRODUCTS":
      return {
        ...state,
        ItemsProducts: [],
        page: 1,
        offset: 1,
      };
    case "Add_Filters":
      return {
        ...state,
        Update_Filters: {
          ...state.Update_Filters,
          Sizes: removeDuplicates(
            state.Update_Filters.Sizes.concat(action?.payload?.Sizes || []),
            "key"
          ),
          Prices: removeDuplicates(
            state.Update_Filters.Prices.concat(action?.payload?.Prices || []),
            "key"
          ),
          Brands: removeDuplicates(
            state.Update_Filters.Brands.concat(action?.payload?.Brands || []),
            "key"
          ),
          Category: removeDuplicates(
            state.Update_Filters.Category.concat(
              action?.payload?.Category || []
            ),
            "key"
          ),
        },
      };
    case "Delete_Filters":
      const updatedSizes = state.Update_Filters.Sizes.filter(
        (filter) => filter.key !== action?.payload?.attribute.key
      );
      const updatedPrices = state.Update_Filters.Prices.filter(
        (filter) => filter.key !== action?.payload?.attribute.key
      );
      const updatedBrands = state.Update_Filters.Brands.filter(
        (filter) => filter.key !== action?.payload?.attribute.key
      );
      const updatedCategory = state.Update_Filters.Category.filter(
        (filter) => filter.key !== action?.payload?.attribute.key
      );

      return {
        ...state,
        Update_Filters: {
          ...state.Update_Filters,
          Sizes: updatedSizes,
          Prices: updatedPrices,
          Brands: updatedBrands,
          Category: updatedCategory,
        },
      };
    case "Add_Filter":
      const { attribute, item } = action.payload;

      return {
        ...state,
        Update_Filters: {
          ...state.Update_Filters,
          [item]: [...state.Update_Filters[item], attribute],
        },
      };
    case "RESET_FILTERS":
      return {
        ...state,
        Update_Filters: { Sizes: [], Prices: [], Brands: [], Category: [] },
        data_from: null,
        sort_by: null,
      };
    case "CATEGORY_REDUCER":
      return {
        ...state,
      category: action.payload.category ? action.payload.category : null,
      };
    case "RESET_CATEGORY":
      return {
        ...state,
        category: null,
      };
    case "RESET_BRANDS":
      return {
        ...state,
        brands: null,
      };
    case "SET_SEARCH_REDUCER":
      return {
        ...state,
        search_value: action.payload,
      };
    case "SET_SORT_BY_REDUCER":
      return {
        ...state,
        sort_by: action.payload,
      };
    case "SET_FILTER_REDUCER":
      return {
        ...state,
        data_from: action.payload,
      };
    case "INCREASE_OFFSET_REDUCER":
      if (state.totalProducts > state.ItemsProducts?.length) {
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
    case "DECREASE_OFFSET_REDUCER":
      return {
        ...state,
        offset: state?.offset - 1,
      };
    case "SUCCESS_ADD_HEART":
      return {
        ...state,
        AddOrRemoveHeart: [...state?.AddOrRemoveHeart, action.payload?.id],
      };
    case "SUCCESS_REMOVE_HEART":
      return {
        ...state,
        AddOrRemoveHeart: state.AddOrRemoveHeart.filter(
          (item) => item.id !== action.payload?.id
        ),
      };
    case "SYNC_PRODUCTS":
      return {
        ...state,
        sync: !state.sync,
      };
    case "SYNC_SESSION_STORAGE":
      return {
        ...state,
        syncSessionStorage: !state.syncSessionStorage,
      };
    case "START_LOADING_SEARCH":
      return {
        ...state,
        searchLoading: true,
      };
    case "STOP_LOADING_SEARCH":
      return {
        ...state,
        searchLoading: false,
      };
    case "START_LOADING_PRODUCT":
      return {
        ...state,
        productLoading: true,
      };
    case "STOP_LOADING_PRODUCT":
      return {
        ...state,
        productLoading: false,
      };
    case "START_LOADING_PRODUCT_PAGINATION":
      return {
        ...state,
        paginationLoading: true,
      };
    case "STOP_LOADING_PRODUCT_PAGINATION":
      return {
        ...state,
        paginationLoading: false,
      };
    case "PRODUCT_DETAILS_REDUCERS":
      return {
        ...state,
        Product: action?.payload?.Product,
        error: null,
      };
    case "FETCH_DATA_ERROR":
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case "WISH_LIST_REDUCER":
      return {
        ...state,
        WishList: action.payload.WishList,
      };
    default:
      return {
        ...state,
      };
  }
}
