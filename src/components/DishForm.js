import React, { useState, useEffect } from "react";
import { createDish, updateDish } from "../utils/api";

const DishForm = ({ dish, onSave }) => {
  const [name, setName] = useState(dish ? dish.name : "");
  const [price, setPrice] = useState(dish ? dish.price : "");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (dish) {
      await updateDish(dish.id, name, price);
    } else {
      await createDish(name, price);
    }
    onSave();
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Dish Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="number"
        placeholder="Price"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
      />
      <button type="submit">{dish ? "Update" : "Create"} Dish</button>
    </form>
  );
};

export default DishForm;
