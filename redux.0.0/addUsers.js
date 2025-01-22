import { createStore } from "redux";
// consts
const ADD_USER = "ADD_USER";
const ADD_BOOKS = "ADD_BOOKS";
// initial state
const iniState = {
  users: [],
  booksName: [],
  members: [],
};
// action functions
const addUser = (name, password) => {
  return {
    type: ADD_USER,
    payload: { name, password },
  };
};
const addBooks = (bookname) => {
  return {
    type: ADD_BOOKS,
    payload: { bookname },
  };
};
// reducer functions
const userReducer = (state = iniState, action) => {
  switch (action.type) {
    case ADD_USER:
      return {
        ...state,
        users: [
          ...state.users,
          { name: action.payload.name, password: action.payload.password },
        ],
      };
    case ADD_BOOKS:
      return {
        ...state,
        booksName: [...state.booksName, action.payload.bookname],
      };
    default:
      return state;
  }
};
// create store
const store = createStore(userReducer);
// output result
store.subscribe(() => {
  //console.log(store.getState());
});
// dispatch action
store.dispatch(addUser("Al Amin Khan", "@#t!m2354"));
store.dispatch(addUser("Abrar Syed Khan", "255t!m2@354"));
store.dispatch(addBooks("Jay Bela Obelay"));
store.dispatch(addBooks("Ami Mejor Dalim Bolsi"));

console.log(store.getState());
