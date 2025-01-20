import { createStore } from "redux";
// const { createStore } = require("redux");
// defining constants
const INCREMENT = "INCREMENT";
const DECREMENT = "DECREMENT";
const ADD_USER = "ADD_USER";
// state+
const iniCountState = {
  count: 0,
};
const iniUserState = {
  users: [{ name: "Al Amin Khan" }],
};
//actions
const incrementCounter = () => {
  return {
    type: INCREMENT,
  };
};
const decrementCounter = () => {
  return {
    type: DECREMENT,
  };
};
const addUser = () => {
  return {
    type: ADD_USER,
    payload: { name: "Abrar Syed Khan" },
  };
};

// reducer for counter
const counterReducer = (state = iniCountState, action) => {
  switch (action.type) {
    case INCREMENT:
      return {
        ...state,
        count: state.count + 1,
      };
    //
    case DECREMENT:
      return {
        ...state,
        count: state.count - 1,
      };
    //
    default:
      state;
  }
  return state;
};

// create store
const store = createStore(counterReducer);
store.subscribe(() => {
  console.log(store.getState());
});

store.dispatch(incrementCounter());
store.dispatch(incrementCounter());
store.dispatch(incrementCounter());
store.dispatch(incrementCounter());
store.dispatch(incrementCounter());

console.log(iniCountState.count);
