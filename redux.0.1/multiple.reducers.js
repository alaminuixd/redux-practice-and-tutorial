/* 
    using multiple reducers with the help of combineReducers
 */
import { combineReducers, createStore } from "redux";
// initial state for "products"
const iniStateProducts = {
  products: ["Sugar", "Oil"],
  prodNum: 2,
};
// initial state for "books"
const iniStateBooks = {
  books: ["My Freedom", "Jay Bela Obelay"],
  booksNum: 2,
};

// actions type "PRODUCTS"
const GET_PRODUCTS = "GET_PRODUCTS";
const ADD_PRODUCT = "ADD_PRODUCT";
const REMOVE_PRODUCT = "REMOVE_PRODUCT";
const UPDATE_PRODUCT = "UPDATE_PRODUCT";
// actions type "BOOKS"
const GET_BOOKS = "GET_BOOKS";
const ADD_BOOK = "ADD_BOOK";
const REMOVE_BOOK = "REMOVE_BOOK";
const UPDATE_BOOK = "UPDATE_BOOK";
// actions for "products"
const getProducts = () => {
  return {
    type: GET_PRODUCTS,
  };
};
const addProduct = (product) => {
  return {
    type: ADD_PRODUCT,
    payload: product,
  };
};
const removeProduct = (name) => {
  return {
    type: REMOVE_PRODUCT,
    payload: { name },
  };
};
const updateProduct = (item, newItem) => {
  return {
    type: UPDATE_PRODUCT,
    payload: { item, newItem },
  };
};

// actions for "books"
const getBooks = () => {
  return {
    type: GET_BOOKS,
  };
};
const addBook = (book) => {
  return {
    type: ADD_BOOK,
    payload: book,
  };
};
const removeBook = (name) => {
  return {
    type: REMOVE_BOOK,
    payload: { name },
  };
};
const updateBook = (item, newItem) => {
  return {
    type: UPDATE_BOOK,
    payload: { item, newItem },
  };
};

// product reducer
const productsReducer = (state = iniStateProducts, action) => {
  switch (action.type) {
    case GET_PRODUCTS:
      return {
        ...state,
      };
    case ADD_PRODUCT:
      return {
        ...state,
        products: [...state.products, action.payload],
        prodNum: state.prodNum + 1,
      };
    case REMOVE_PRODUCT:
      return {
        ...state,
        products: state.products.filter(
          (item) => item.toLowerCase() !== action.payload.name.toLowerCase()
        ),
        prodNum: state.prodNum - 1,
      };
    case UPDATE_PRODUCT:
      return {
        ...state,
        products: state.products.map((item) => {
          return item.toLowerCase() === action.payload.item.toLowerCase()
            ? action.payload.newItem
            : item;
        }),
      };
    default:
      return state;
  }
};
// book reducer
const booksReducer = (state = iniStateBooks, action) => {
  switch (action.type) {
    case GET_BOOKS:
      return {
        ...state,
      };
    case ADD_BOOK:
      return {
        ...state,
        books: [...state.books, action.payload],
        booksNum: state.booksNum + 1,
      };
    case REMOVE_BOOK:
      return {
        ...state,
        books: state.books.filter(
          (item) => item.toLowerCase() !== action.payload.name.toLowerCase()
        ),
        booksNum: state.booksNum - 1,
      };
    case UPDATE_BOOK:
      return {
        ...state,
        books: state.books.map((item) => {
          return item.toLowerCase() === action.payload.item.toLowerCase()
            ? action.payload.newItem
            : item;
        }),
      };
    default:
      return state;
  }
};

// store
const rootReducer = combineReducers({
  productsReducer,
  booksReducer,
});
const store = createStore(rootReducer);
//subscirbe
store.subscribe(() => {
  console.log(store.getState());
});
//dispatch products
store.dispatch(getProducts());
store.dispatch(addProduct("Rice"));
store.dispatch(removeProduct("Oil"));
store.dispatch(updateProduct("rice", "Puffed Rice"));
// dispatch books
store.dispatch(getBooks());
store.dispatch(addBook("Bristy Bilash"));
store.dispatch(removeBook("Jay Bela Obelay"));
store.dispatch(updateBook("My Freedom", "Mishir Ali"));
