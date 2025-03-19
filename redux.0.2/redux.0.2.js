import { createStore } from "redux";

// Initial state
const initialState = {
  cartItems: [],
  total: 0,
};

// Action types
const ADD_TO_CART = "ADD_TO_CART";
const REMOVE_FROM_CART = "REMOVE_FROM_CART";
const UPDATE_QUANTITY = "UPDATE_QUANTITY";

// Action creators
const addToCart = (item) => ({
  type: ADD_TO_CART,
  payload: item,
});

const removeFromCart = (id) => ({
  type: REMOVE_FROM_CART,
  payload: { id },
});

const updateQuantity = (id, quantity) => ({
  type: UPDATE_QUANTITY,
  payload: { id, quantity },
});

// Reducer
const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      return {
        ...state,
        cartItems: [...state.cartItems, action.payload],
        total: state.total + action.payload.price * action.payload.quantity,
      };

    case REMOVE_FROM_CART:
      const itemToRemove = state.cartItems.find(
        (item) => item.id === action.payload.id
      );
      if (!itemToRemove) return state; // Fix: Return current state if item not found

      const updatedCartItems = state.cartItems.filter(
        (product) => product.id !== action.payload.id
      );

      return {
        ...state,
        cartItems: updatedCartItems,
        total: state.total - itemToRemove.price * itemToRemove.quantity,
      };

    case UPDATE_QUANTITY:
      const newCartItems = state.cartItems.map((item) =>
        item.id === action.payload.id
          ? { ...item, quantity: item.quantity + action.payload.quantity }
          : item
      );

      return {
        ...state,
        cartItems: newCartItems,
        total: newCartItems.reduce(
          (sum, item) => sum + item.price * item.quantity,
          0
        ),
      };

    default:
      return state;
  }
};

// Create store
const store = createStore(cartReducer);

// Subscribe to store
store.subscribe(() => {
  console.log(store.getState());
});

// Dispatch actions
store.dispatch(
  addToCart({ id: 1, name: "Toothpaste", price: 70, quantity: 2 })
);
store.dispatch(
  addToCart({ id: 2, name: "Toothbrush", price: 45, quantity: 2 })
);
// store.dispatch(removeFromCart(2));
store.dispatch(updateQuantity(2, 1));

console.log(store.getState());
