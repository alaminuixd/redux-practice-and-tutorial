import { combineReducers, createStore } from "redux";
// const declarations
const ADD_PRODUCT = "ADD_PRODUCT";
const ADD_CART = "ADD_CART";
// initial state
const iniProducts = {
  products: [],
  productsNum: 0,
};
const iniCart = {
  cart: [],
  itemNum: 0,
};

// action functions
const addProduct = (name) => {
  return {
    type: ADD_PRODUCT,
    payload: { name },
  };
};
const addCart = (name) => {
  return {
    type: ADD_CART,
    payload: { name },
  };
};
// reducer function
const productReducer = (currState = iniProducts, action) => {
  switch (action.type) {
    case ADD_PRODUCT:
      const updatedProduct = [...currState.products, action.payload.name];
      return {
        ...currState,
        products: updatedProduct,
        productsNum: updatedProduct.length,
      };
    default:
      return currState;
  }
};
const cartReducer = (currState = iniCart, action) => {
  switch (action.type) {
    case ADD_CART:
      const updatedCart = [...currState.cart, action.payload.name];
      return {
        ...currState,
        cart: updatedCart,
        itemNum: updatedCart.length,
      };
    default:
      return currState;
  }
};
// combine reducers
const rootReducer = combineReducers({ productReducer, cartReducer });
// create store
const store = createStore(rootReducer);
// print store
store.subscribe(() => {
  //console.log(store.getState());
});
// dispatch action
store.dispatch(addProduct("Pen"));
store.dispatch(addProduct("Book"));
store.dispatch(addCart("Shampoo"));
store.dispatch(addCart("biscuit"));
console.log(store.getState());
