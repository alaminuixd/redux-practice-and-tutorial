import { createStore } from "redux";
// consts
const INCREMENT = "INCREMENT";
const INC_BY_VAL = "INC_BY_VAL";
// initial state
const count = 0;
// actions
const increment = () => {
  return {
    type: INCREMENT,
  };
};
const incByValue = (val) => {
  return {
    type: INC_BY_VAL,
    payload: { val, age: 23 },
  };
};
// reducer
const countReducer = (state = { count: 0 }, action) => {
  switch (action.type) {
    case INCREMENT:
      return { ...state, count: state.count + 1 };
    case INC_BY_VAL:
      return {
        ...state,
        count: state.count + action.payload.val,
      };
    default:
      return state;
  }
};

// create store
const store = createStore(countReducer);
store.subscribe(() => {
  console.log(store.getState());
});

// dispatch actions
store.dispatch(increment());
store.dispatch(increment());
store.dispatch(increment());
store.dispatch(incByValue(20));
