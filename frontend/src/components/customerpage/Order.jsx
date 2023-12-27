import React, { useEffect, useState } from "react";
import { getOrders } from "../../api/customer";

function Order({ username }) {
  // Will return the orders of a spesific user
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    getOrders(username).then((data) => {
      setOrders(data);
    });
  });

  return <div>{orders}</div>;
}

export default Order;
