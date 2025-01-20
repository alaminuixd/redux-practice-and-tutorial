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
const READ_CART = "READ_CART"; // New action for reading the cart

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

const readCart = () => ({
  type: READ_CART,
}); // Action to trigger a read operation
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
            ? { ...item, quantity: action.payload.quantity }
            : item
        ),
        total: state.cart.reduce(
          (sum, item) =>
            sum +
            (item.id === action.payload.id
              ? item.price * action.payload.quantity
              : item.price * item.quantity),
          0
        ),
      };

    case READ_CART:
      console.log("Current Cart State:", state);
      return state; // No state modification, just a read

    default:
      return state;
  }
}

// Create Store
const store = createStore(cartReducer);

// Subscribe to Store
store.subscribe(() => {
  //console.log("Updated State:", store.getState());
});

// Test Actions
store.dispatch(addToCart({ id: 1, name: "Laptop", price: 1000, quantity: 1 }));
store.dispatch(
  addToCart({ id: 2, name: "Headphones", price: 100, quantity: 2 })
);
store.dispatch(readCart()); // Explicitly reading the state
store.dispatch(removeFromCart(1)); // Remove Laptop
store.dispatch(updateQuantity(2, 3)); // Update Headphones quantity to 3
store.dispatch(readCart()); // Read the state again
console.log(`Final: ${store.getState()}`);

/* 
for morning:
const state = {
    cart: [
        {
            id: 1, 
            name: "Book", 
            price: 10, 
            quantity: 2
        },
        {
            id: 2, 
            name: "Pencil", 
            price: 3, 
            quantity: 5
        }
    ]
}
const addItem = (itemId, quantity) => {
    return {
        type: "UPDATE_QUANTITY",
        payload: {id: itemId, quantity}
    }
}

const action = addItem(2, 7);
if(action.type === "UPDATE_QUANTITY"){
    const updated = {
        ...state,
        cart: state.cart.map((item) => item.id === action.payload.id ? {...item, action.payload.quantity})
    }
}
*/

/* 
Current Cart State: {
  cart: [
    { id: 1, name: 'Laptop', price: 10
00, quantity: 1 },
    { id: 2, name: 'Headphones', price
: 100, quantity: 2 }
  ],
  total: 1200
}
Current Cart State: {
  cart: [ { id: 2, name: 'Headphones',
 price: 100, quantity: 3 } ],
  total: 300
} 
  */
