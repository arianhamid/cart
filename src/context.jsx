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
const GET_TOTALS = "GET_TOTALS";

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const fetchData = async () => {
    dispatch({ type: "LOADING" });
    const data = await fetch(url);
    const cart = await data.json();
    dispatch({ type: "DISPLAY_ITEMS", payload: cart });
  };
  useEffect(() => {
    fetchData();
  }, []);

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

  useEffect(() => {
    dispatch({ type: GET_TOTALS });
  }, [state.cart]);
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
