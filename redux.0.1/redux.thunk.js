// async actions - api calling
// api url https://jsonplaceholder.typicode.com/todos
// middleware - redux-thunk
// axios api
import { createStore, applyMiddleware } from "redux";
import { thunk } from "redux-thunk";
import axios from "axios";
// initial state
const iniTodos = {
  todos: [],
  isLoading: true,
  isError: null,
};
// actions types
const GET_TODOS_REQ = "GET_TODOS_REQ";
const GET_TODOS_SUC = "GET_TODOS_SUC";
const GET_TODOS_FAI = "GET_TODOS_FAI";
const API_URL = "https://jsonplaceholder.typicode.com/todosTM";
// actions as factory functions
const getTodosReq = () => {
  return {
    type: GET_TODOS_REQ,
  };
};
const getTodosSuc = (todos) => {
  return {
    type: GET_TODOS_SUC,
    payload: todos,
  };
};
const getTodosFai = (error) => {
  return {
    type: GET_TODOS_FAI,
    payload: error,
  };
};

// reducer
const todosReducer = (state = iniTodos, action) => {
  switch (action.type) {
    case GET_TODOS_REQ:
      return {
        ...state,
        isLoading: true,
      };
    case GET_TODOS_SUC:
      return {
        ...state,
        isLoading: false,
        todos: action.payload,
      };
    case GET_TODOS_FAI:
      return {
        ...state,
        isLoading: false,
        isError: action.payload,
      };
    default:
      return state;
  }
};
// async ation to fetch data
const fetchData = () => {
  return (dispatch) => {
    dispatch(getTodosReq());
    axios
      .get(API_URL)
      .then((res) => {
        const todos = res.data;
        const titles = todos.map((todo) => todo.title);
        dispatch(getTodosSuc(titles));
      })
      .catch((error) => {
        const errorMessage = error.message;
        dispatch(getTodosFai(errorMessage));
      });
  };
};
// create store
const store = createStore(todosReducer, applyMiddleware(thunk));
// subscribe to the store
store.subscribe(() => {
  console.log(store.getState());
});
// dispatch actions to the store
store.dispatch(fetchData());
