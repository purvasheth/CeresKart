export const products = [];
export const SET_PRODUCTS = "setProducts";
export const SORT_BY_PRICE = "sortByPrice";
export const INCLUDE_OUT_OF_STOCK = "includeOutOfStock";
export const ONLY_FAST_DELIVERY = "onlyFastDelivery";
export const CLEAR_FILTERS = "clearFilters";

export const productsReducer = (state, { type, value, products }) => {
  switch (type) {
    case SET_PRODUCTS:
      return {
        ...state,
        products: products || [],
      };
    case SORT_BY_PRICE:
      return { ...state, [SORT_BY_PRICE]: value };
    case INCLUDE_OUT_OF_STOCK:
      return {
        ...state,
        [INCLUDE_OUT_OF_STOCK]: !state[INCLUDE_OUT_OF_STOCK],
      };
    case ONLY_FAST_DELIVERY:
      return { ...state, [ONLY_FAST_DELIVERY]: !state[ONLY_FAST_DELIVERY] };
    default:
      return state;
    case CLEAR_FILTERS:
      return {
        ...state,
        [INCLUDE_OUT_OF_STOCK]: false,
        [ONLY_FAST_DELIVERY]: false,
        [SORT_BY_PRICE]: null,
      };
  }
};
