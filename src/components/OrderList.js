import React, { useEffect, useState } from "react";
import { getAllOrders } from "../utils/api";

const OrderList = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      const data = await getAllOrders();
      setOrders(data);
    };
    fetchOrders();
  }, []);

  return (
    <div>
      <h2>Orders</h2>
      <ul>
        {orders.map((order) => (
          <li key={order.id}>
            {order.details} - Status: {order.status}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default OrderList;
