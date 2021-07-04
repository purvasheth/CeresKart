import { createContext, useContext, useReducer } from "react";
import {
  productsReducer,
  products,
  ONLY_FAST_DELIVERY,
  INCLUDE_OUT_OF_STOCK,
} from "./products-reducer";

const ProductsContext = createContext({});

export const ProductsProvider = ({ children }) => {
  const [state, dispatch] = useReducer(productsReducer, {
    products,
    [INCLUDE_OUT_OF_STOCK]: false,
    [ONLY_FAST_DELIVERY]: false,
  });
  return (
    <ProductsContext.Provider
      value={{
        productsState: state,
        productsDispatch: dispatch,
      }}
    >
      {children}
    </ProductsContext.Provider>
  );
};

export const useProducts = () => useContext(ProductsContext);
