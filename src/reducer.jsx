const reducer = (state, action) => {
  switch (action.type) {
    case "CLEARCART":
      return { ...state, cart: [] };
    case "REMOVEITEM":
      const newCartItems = state.cart.filter((item) => {
        return item.id !== action.payload;
      });
      return { ...state, cart: newCartItems };
      return { ...state, cart: [] };
  }
  return state;
};

export default reducer;
