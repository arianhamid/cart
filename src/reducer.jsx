const reducer = (state, action) => {
  switch (action.type) {
    case "CLEARCART":
      return { ...state, cart: [] };
    case "REMOVEITEM":
      const newCartItems = state.cart.filter((item) => {
        return item.id !== action.payload;
      });
      return { ...state, cart: newCartItems };
    case "INCREMENT":
      const newCartIncrement = state.cart.map((item) => {
        if (item.id === action.payload) {
          return { ...item, amount: item.amount + 1 };
        }
        return item;
      });
      return { ...state, cart: newCartIncrement };
    case "DECREMENT":
      const newCartDecrement = state.cart
        .map((item) => {
          if (item.id === action.payload) {
            return { ...item, amount: item.amount - 1 };
          }
          return item;
        })
        .filter((item) => item.amount !== 0);
      return { ...state, cart: newCartDecrement };
      return { ...state, cart: [] };
  }
  return state;
};

export default reducer;
