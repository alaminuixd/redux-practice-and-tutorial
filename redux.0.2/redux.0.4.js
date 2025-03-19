import { createStore } from "redux";

// action types
const ADD_TO_CART = "ADD_TO_CART";
const REMOVE_FROM_CART = "REMOVE_FROM_CART";
const UPDATE_CART = "UPDATE_CART";

// initial state
const iniState = {
  cart: [],
  total: 0,
};

// create actions
const addToCart = (item) => {
  return {
    type: ADD_TO_CART,
    payload: item,
  };
};
const removeFromCart = (id) => {
  return {
    type: REMOVE_FROM_CART,
    payload: { id },
  };
};
// addToCart({ id: 1, name: "Toothpaste", price: 70, quantity: 2 })
// create reducer
const cartReducer = (state = iniState, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      return {
        ...state,
        cart: [...state.cart, action.payload],
        total: state.total * action.payload.price,
      };
    case REMOVE_FROM_CART:
      const itemToRemove = state.cart.find((item) => item.id);
    default:
      return state;
  }
};
// create store
const store = createStore(cartReducer);

//subscribe to store
store.subscribe(() => {
  console.log(store.getState());
});

// dispatch action
store.dispatch(addToCart({ id: 1, name: "Tomato", price: 20, quantity: 1 }));
console.log(store.getState());
