// orders.js
const orders = [
  {
    id: 1,
    products: [
      { title: "product1", amount: 3, product_id: 1 },
      { title: "product2", amount: 4, product_id: 2 },
    ],
    total_price: 8,
    status: "Success",
    user_username: localStorage.getItem("username"),
  },
  {
    id: 2,
    products: [
      { title: "product3", amount: 2, product_id: 3 },
      { title: "product4", amount: 1, product_id: 4 },
    ],
    total_price: 15,
    status: "Pending",
    user_username: localStorage.getItem("username"),
  },
  {
    id: 3,
    products: [
      { title: "product5", amount: 5, product_id: 5 },
      { title: "product6", amount: 2, product_id: 6 },
    ],
    total_price: 12,
    status: "Rejected",
    user_username: localStorage.getItem("username"),
  },
];

export default orders;
