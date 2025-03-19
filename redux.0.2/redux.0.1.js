import { createStore } from "redux";

// initial state
const iniState = {
  products: [],
  total: 0,
};
// consts
const ADD_TO_CART = "ADD_TO_CART";
const REMOVE_FROM_CART = "REMOVE_FROM_CART";
const UPDATE_QUANTITY = "UPDATE_QUANTITY";

// acitons
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

const updateQuantity = (id, quantity) => {
  return {
    type: UPDATE_QUANTITY,
    payload: { id, quantity },
  };
};

// reducer
const cartReducer = (state = iniState, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      return {
        ...state,
        products: [...state.products, action.payload],
        total: state.total + action.payload.price * action.payload.quantity,
      };
    case REMOVE_FROM_CART:
      const itemToBeRemoved = state.products.find(
        (item) => item.id === action.payload.id
      );
      if (!itemToBeRemoved) return state;
      return {
        ...state,
        products: state.products.filter(
          (product) => product.id !== action.payload.id
        ),
        total: state.total - itemToBeRemoved.price * itemToBeRemoved.quantity,
      };
    case UPDATE_QUANTITY:
      return {
        ...state,
        products: state.products.map((item) =>
          item.id === action.payload.id
            ? {
                ...item,
                quantity: item.quantity + action.payload.quantity,
              }
            : item
        ),
        total: state.products.reduce((sum, item) => {
          return (
            sum +
            (item.id === action.payload.id
              ? item.price * (item.quantity + action.payload.quantity)
              : item.price * item.quantity)
          );
        }, 0),
      };
    default:
      return state;
  }
};

// create store
const store = createStore(cartReducer);
// subscribe
store.subscribe(() => {
  console.log(store.getState());
});

// dispatch action
store.dispatch(
  addToCart({ id: 1, name: "Toothpaste", price: 70, quantity: 2 })
);
store.dispatch(
  addToCart({ id: 2, name: "Toothbrush", price: 45, quantity: 2 })
);
// store.dispatch(removeFromCart(2));
store.dispatch(updateQuantity(2, 1));

console.log(store.getState());
