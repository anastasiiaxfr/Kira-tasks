import React, { useState, useEffect } from "react";
import { createDish, updateDish, deleteDish, getAllDishes, getDishById } from "../utils/api";

const Dishes = () => {
  const [dishes, setDishes] = useState([]);
  const [dish, setDish] = useState({ name: "", price: "" });


  return (
    <div>
      <h2>Dishes</h2>
      
    </div>
  );
};

export default Dishes;
