const state = {
  cart: [
    { id: 1, name: "Laptop", price: 50, quantity: 2 },
    { id: 2, name: "Phone", price: 20, quantity: 1 },
    { id: 3, name: "Shirt", price: 5, quantity: 3 },
    { id: 4, name: "Pen Drive", price: 10, quantity: 1 },
  ],
  total: 135,
};

const stateUpdate1 = {
  ...state,
  cart: state.cart.map((eachObj) => {
    return eachObj.id === 3
      ? { ...eachObj, quantity: eachObj.quantity + 2 }
      : eachObj;
  }),
  total: state.cart.reduce((sum, item) => {
    return (
      sum +
      (item.id === 3
        ? item.price * (item.quantity + 2)
        : item.price * item.quantity)
    );
  }, 0),
  totalV2: state.cart.reduce((sum, item) => {
    return (
      sum +
      (item.id === 3
        ? item.price * (item.quantity + 2)
        : item.price * item.quantity)
    );
  }, 0),
};
console.log(stateUpdate1);
