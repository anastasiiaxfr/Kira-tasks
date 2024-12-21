import React, { useState, useEffect } from "react";
import { createOrder, deleteOrder, confirmOrder, getAllOrders, getOrderById } from "../utils/api";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [order, setOrder] = useState({}); // Adjust depending on the structure of `order`

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const data = await getAllOrders();  // Fetch all orders
        setOrders(data);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };
    fetchOrders();
  }, []);

  const handleCreate = async () => {
    try {
      const newOrder = await createOrder(order);
      setOrders([...orders, newOrder]);
    } catch (error) {
      console.error("Error creating order:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteOrder(id);
      setOrders(orders.filter((order) => order.id !== id));
    } catch (error) {
      console.error("Error deleting order:", error);
    }
  };

  const handleConfirm = async (id) => {
    try {
      await confirmOrder(id);
      // Optionally update the orders state to reflect the confirmation
      setOrders(orders.map((order) => (order.id === id ? { ...order, confirmed: true } : order)));
    } catch (error) {
      console.error("Error confirming order:", error);
    }
  };

  return (
    <div>
      <h2>Orders</h2>
      <div>
        {/* Order creation form */}
        <button onClick={handleCreate}>Create Order</button>
      </div>
      <ul>
        {orders.map((order) => (
          <li key={order.id}>
            Order ID: {order.id} 
            {order.confirmed ? (
              <span> (Confirmed)</span>
            ) : (
              <button onClick={() => handleConfirm(order.id)}>Confirm</button>
            )}
            <button onClick={() => handleDelete(order.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Orders;
