import { createStore } from "redux";

// initial state
const iniState = {
  cart: [],
  total: 0,
};
// actions type
const ADD_TO_CART = "ADD_TO_CART";
const REMOVE_FROM_CART = "REMOVE_FROM_CART";
const UPDATE_QUANTITY = "UPDATE_QUANTITY";
const INC_QUANTITY = "INC_QUANTITY";
const DEC_QUANTITY = "DEC_QUANTITY";
const READ_CART = "READ_CART";

// actions
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
  // store.dispatch(updateQuantity(3, 3));
  return {
    type: UPDATE_QUANTITY,
    payload: { id, quantity },
  };
};
const incQuantity = (id, quantity) => {
  return {
    type: INC_QUANTITY,
    payload: { id, quantity },
  };
};
const decQuantity = (id, quantity) => {
  return {
    type: DEC_QUANTITY,
    payload: { id, quantity },
  };
};
// reducer
const cartReducer = (state = iniState, action) => {
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
        cart: state.cart.filter((item) => item.id !== itemToRemove.id),
        total: state.total - itemToRemove.price * itemToRemove.quantity,
      };
    /* case UPDATE_QUANTITY:
      return {
        ...state,
        cart: state.cart.map((item) => {
          return item.id === action.payload.id
            ? { ...item, quantity: item.quantity + action.payload.quantity }
            : item;
        }),
        total: state.cart.reduce((sum, currItem) => {
          return (
            sum +
            currItem.price *
              (currItem.id === action.payload.id
                ? currItem.quantity + action.payload.quantity
                : currItem.quantity)
          );
        }, 0),
      }; */
    case UPDATE_QUANTITY:
      return {
        ...state,
        cart: state.cart.map((item) => {
          return item.id === action.payload.id
            ? { ...item, quantity: item.quantity + action.payload.quantity }
            : item;
        }),
        total: state.cart.reduce((sum, currItem) => {
          const totalQuantity =
            currItem.id === action.payload.id
              ? currItem.quantity + action.payload.quantity
              : currItem.quantity;
          return sum + currItem.price * totalQuantity;
        }, 0),
      };
    default:
      return state;
  }
};
// create store
const store = createStore(cartReducer);
// subscribe store
store.subscribe(() => {
  //console.log(store.getState());
});
// print store
// add item
store.dispatch(addToCart({ id: 1, name: "Laptop", price: 1499, quantity: 2 }));
store.dispatch(addToCart({ id: 2, name: "Phone", price: 1199, quantity: 1 }));
store.dispatch(addToCart({ id: 3, name: "Pen Drive", price: 29, quantity: 1 }));
store.dispatch(
  addToCart({ id: 4, name: "Head Phone", price: 99, quantity: 1 })
);
//remove item
// store.dispatch(removeFromCart(2));
// update item
store.dispatch(updateQuantity(3, 3));

// print
console.log(store.getState());

/* 
2998 + 1199 + 116 + 99
*/
