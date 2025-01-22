import { createStore } from "redux";

// initial state
const iniCart = {
  cart: [],
  total: 0,
};
// action types
const ADD_TO_CART = "ADD_TO_CART";
const REMOVE_FROM_CART = "REMOVE_FROM_CART";
// actions
const addToCart = (item) => {
  return {
    type: ADD_TO_CART,
    payload: item, //* { id: 1, name: "Pencil", price: 10, quantity: 1 }
  };
};
const deleteFromCart = (itemID) => {
  return {
    type: REMOVE_FROM_CART,
    payload: { id: itemID },
  };
};
// reducer
const cartReducer = (state = iniCart, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      return {
        ...state,
        cart: [...state.cart, action.payload],
        total: state.total + action.payload.price * action.payload.quantity,
      };
    case REMOVE_FROM_CART:
      const itemToDelete = state.cart.find(
        (item) => item.id === action.payload.id
      );
      if (!itemToDelete) return state;
      return {
        ...state,
        cart: state.cart.filter((item) => item.id !== action.payload.id),
        total: state.total - itemToDelete.price * itemToDelete.quantity,
      };
    default:
      return state;
  }
};
// create store
const store = createStore(cartReducer);
// subscribe store
store.subscribe(() => {
  console.log(store.getState());
});
// test actions by dispatching the action function
store.dispatch(addToCart({ id: 1, name: "Pencil", price: 5, quantity: 1 }));
store.dispatch(addToCart({ id: 2, name: "Book", price: 25, quantity: 2 }));
store.dispatch(addToCart({ id: 3, name: "Eraser", price: 2, quantity: 2 }));

store.dispatch(deleteFromCart(3));
