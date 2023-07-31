import React, { useState, useContext, useReducer, useEffect } from "react";
import cartItems from "./data";
import reducer from "./reducer";
// ATTENTION!!!!!!!!!!
// I SWITCHED TO PERMANENT DOMAIN
const url = "https://course-api.com/react-useReducer-cart-project";

const initialState = { loading: false, cart: cartItems, total: 0, amount: 0 };
const AppContext = React.createContext();
const CLEARCART = "CLEARCART";
const REMOVEITEM = "REMOVEITEM";
const INCREMENT = "INCREMENT";
const DECREMENT = "DECREMENT";

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const clearCart = () => {
    dispatch({ type: CLEARCART });
  };
  const removeItem = (id) => {
    dispatch({ type: REMOVEITEM, payload: id });
  };
  const increment = (id) => {
    dispatch({ type: INCREMENT, payload: id });
  };
  const decrement = (id) => {
    
    dispatch({ type: DECREMENT, payload: id });
  };
  return (
    <AppContext.Provider
      value={{
        ...state,
        clearCart,
        removeItem,
        increment,
        decrement,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

// make sure use
export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider };
