import { createStore } from "redux";
// state -> count: 0
// actions -> increment, decrement, reset
// reducer to handle the logics | this will incrment or decrement or reset
// store to store the states

// constents
const INCREMENT = "INCREMENT";
const DECREMENT = "DECREMENT";
const RESET = "RESET";
const INC_BY_VALUE = "INC_BY_VALUE";

// initial state
const iniState = {
  count: 0,
};

// actions
const increment = () => {
  return {
    type: INCREMENT,
  };
};
const decrement = () => {
  return {
    type: DECREMENT,
  };
};
const reset = () => {
  return {
    type: RESET,
  };
};
const incByValue = (value) => {
  return {
    type: INC_BY_VALUE,
    payload: value,
  };
};

// create reducer
const counterReducer = (state = iniState, action) => {
  switch (action.type) {
    case INCREMENT:
      return {
        ...state,
        count: state.count + 1,
      };
    case DECREMENT:
      return {
        ...state,
        count: state.count - 1,
      };
    case RESET:
      return {
        ...state,
        count: 0,
      };
    case INC_BY_VALUE:
      return {
        ...state,
        count: state.count + action.payload,
      };
    default:
      return state;
  }
};

const store = createStore(counterReducer);
store.subscribe(() => {
  console.log(store.getState());
});

// store.dispatch(increment());
// store.dispatch(increment());
// store.dispatch(increment());
// store.dispatch(decrement());
// store.dispatch(reset());
store.dispatch(incByValue(5));
store.dispatch(incByValue(15));
