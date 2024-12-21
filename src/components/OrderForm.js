import React, { useState } from "react";
import { createOrder } from "../utils/api";

const OrderForm = ({ onSave }) => {
  const [orderDetails, setOrderDetails] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    await createOrder({ details: orderDetails });
    onSave();
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Order Details"
        value={orderDetails}
        onChange={(e) => setOrderDetails(e.target.value)}
      />
      <button type="submit">Create Order</button>
    </form>
  );
};

export default OrderForm;
