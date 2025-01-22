// Import Redux library
import { createStore } from "redux";

// Initial State
const initialState = {
  cart: [],
  total: 0,
};

// Action Types
const ADD_TO_CART = "ADD_TO_CART";
const REMOVE_FROM_CART = "REMOVE_FROM_CART";
const UPDATE_QUANTITY = "UPDATE_QUANTITY";

// Actions
const addToCart = (item) => ({
  type: ADD_TO_CART,
  payload: item,
});

const removeFromCart = (itemId) => ({
  type: REMOVE_FROM_CART,
  payload: { id: itemId },
});

const updateQuantity = (itemId, quantity) => ({
  type: UPDATE_QUANTITY,
  payload: { id: itemId, quantity },
});

// Reducer
function cartReducer(state = initialState, action) {
  switch (action.type) {
    case ADD_TO_CART:
      return {
        ...state,
        cart: [...state.cart, action.payload],
        total: state.total + action.payload.price * action.payload.quantity,
      };

    case REMOVE_FROM_CART:
      const itemToRemove = state.cart.find(
        (item) => item.id === action.payload.id
      );
      if (!itemToRemove) return state;
      return {
        ...state,
        cart: state.cart.filter((item) => item.id !== action.payload.id),
        total: state.total - itemToRemove.price * itemToRemove.quantity,
      };

    case UPDATE_QUANTITY:
      return {
        ...state,
        cart: state.cart.map((item) =>
          item.id === action.payload.id
            ? { ...item, quantity: item.quantity + action.payload.quantity }
            : item
        ),
        total: state.cart.reduce(
          (sum, item) =>
            sum +
            (item.id === action.payload.id
              ? item.price * (item.quantity + action.payload.quantity)
              : item.price * item.quantity),
          0
        ),
      };

    default:
      return state;
  }
}

// Create Store
const store = createStore(cartReducer);

// Subscribe to Store
store.subscribe(() => {
  console.log("Updated State:", store.getState());
});

// Test Actions
store.dispatch(addToCart({ id: 1, name: "Laptop", price: 1000, quantity: 1 }));
store.dispatch(
  addToCart({ id: 2, name: "Headphones", price: 100, quantity: 2 })
);
store.dispatch(removeFromCart(1)); // Remove Laptop
store.dispatch(updateQuantity(2, 3)); // Update Headphones quantity to 3
console.log("Final State:", store.getState());
