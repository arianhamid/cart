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

    case "GET_TOTALS":
      let { total, amount } = state.cart.reduce(
        (cartTotal, cartItem) => {
          const { price, amount } = cartItem;
          const itemTotal = price * amount;
          cartTotal.total += itemTotal;
          cartTotal.amount += amount;
          return cartTotal;
        },
        {
          total: 0,
          amount: 0,
        }
      );
      total = parseFloat(total.toFixed(2));
      return { ...state, total, amount };
    case "LOADING":
      return { ...state, loading: true };
    case "DISPLAY_ITEMS":
      return { ...state, cart: action.payload, loading: false };
  }
  return state;
};

export default reducer;
