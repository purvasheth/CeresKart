import { createContext, useContext, useReducer } from "react";
import { data, dataReducer } from "./data-reducer";

const DataContext = createContext({});

export const DataProvider = ({ children }) => {
  const [{ cartItems, wishlist }, dispatch] = useReducer(dataReducer, data);
  return (
    <DataContext.Provider
      value={{
        cartItems,
        wishlist,
        dataDispatch: dispatch
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => useContext(DataContext);
