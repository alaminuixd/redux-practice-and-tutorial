import { createStore } from "redux";
// consts
const ADD_USER = "ADD_USER";
// initial state
const iniState = { name: "", age: 0 };
// actions functions
const addUser = (name, age) => {
  return {
    type: ADD_USER,
    payload: { name, age },
  };
};
// reducer function
const userReducer = (currState = iniState, action) => {
  switch (action.type) {
    case ADD_USER:
      return {
        ...currState,
        name: action.payload.name,
        age: action.payload.age,
      };
    default:
      return currState;
  }
};

// create store
const store = createStore(userReducer);
// output result
store.subscribe(() => {
  console.log(store.getState());
});
// dispatch action
store.dispatch(addUser("Al Amin Khan", 36));
store.dispatch(addUser("Abrar Syed Khan", 5));
store.dispatch(addUser("Arshiya Amin Khan", 4));
