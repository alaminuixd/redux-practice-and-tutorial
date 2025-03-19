const store = {
  cart: [],
  total: 0,
};

function addToCart(item) {
  return {
    ...store,
    cart: [...store.cart, item],
    total: store.total + item.price * item.quantity,
  };
}
addToCart({ id: 1, name: "Toothpaste", price: 70, quantity: 2 });
